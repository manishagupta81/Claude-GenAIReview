'use strict';

/**
 * Extract user information from the Cognito JWT claims
 * provided by API Gateway's Cognito Authorizer.
 *
 * @param {object} event - API Gateway Lambda proxy event
 * @returns {{ username: string, role: string, email: string }}
 */
function getUserFromEvent(event) {
  const claims = event.requestContext &&
    event.requestContext.authorizer &&
    event.requestContext.authorizer.claims;

  if (!claims) {
    throw new Error('Unauthorized: No claims found in request context');
  }

  const username = claims['cognito:username'] || claims.sub;
  const role = claims['custom:role'] || '';
  const email = claims.email || '';

  return { username, role, email };
}

module.exports = { getUserFromEvent };
