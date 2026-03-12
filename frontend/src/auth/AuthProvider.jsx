import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import config from '../config';

export const AuthContext = createContext(null);

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err || !session?.isValid()) {
          setLoading(false);
          return;
        }
        cognitoUser.getUserAttributes((attrErr, attributes) => {
          if (attrErr) {
            setLoading(false);
            return;
          }
          const attrs = {};
          attributes.forEach((a) => {
            attrs[a.Name] = a.Value;
          });
          setUser({
            username: cognitoUser.getUsername(),
            email: attrs.email || '',
            role: attrs['custom:role'] || 'requester',
            token: session.getIdToken().getJwtToken(),
          });
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback((username, password) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
              return;
            }
            const attrs = {};
            attributes.forEach((a) => {
              attrs[a.Name] = a.Value;
            });
            const userData = {
              username: cognitoUser.getUsername(),
              email: attrs.email || '',
              role: attrs['custom:role'] || 'requester',
              token: session.getIdToken().getJwtToken(),
            };
            setUser(userData);
            resolve(userData);
          });
        },
        onFailure: (err) => reject(err),
        newPasswordRequired: (userAttributes) => {
          // For first-time login with temp password
          delete userAttributes.email_verified;
          delete userAttributes.email;
          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: (session) => {
              cognitoUser.getUserAttributes((err2, attributes) => {
                const attrs = {};
                if (attributes) {
                  attributes.forEach((a) => {
                    attrs[a.Name] = a.Value;
                  });
                }
                const userData = {
                  username: cognitoUser.getUsername(),
                  email: attrs.email || '',
                  role: attrs['custom:role'] || 'requester',
                  token: session.getIdToken().getJwtToken(),
                };
                setUser(userData);
                resolve(userData);
              });
            },
            onFailure: (err2) => reject(err2),
          });
        },
      });
    });
  }, []);

  const logout = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setUser(null);
  }, []);

  const getToken = useCallback(() => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (!cognitoUser) {
        reject(new Error('No user'));
        return;
      }
      cognitoUser.getSession((err, session) => {
        if (err || !session?.isValid()) {
          setUser(null);
          reject(err || new Error('Session expired'));
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}
