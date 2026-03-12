const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  },
};

export default config;
