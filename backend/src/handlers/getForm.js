'use strict';

const { getItem } = require('../lib/dynamodb');
const { getUserFromEvent } = require('../lib/auth');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

/**
 * GET /forms/{formId}
 * Retrieves a single form by its ID.
 * Authorization:
 *   - Requesters can only view their own forms
 *   - Reviewers can view forms with status SUBMITTED or UNDER_REVIEW
 *   - Approvers can view forms with status UNDER_REVIEW, APPROVED, CONDITIONAL, REJECTED, or DEFERRED
 */
exports.handler = async (event) => {
  try {
    const user = getUserFromEvent(event);
    const formId = event.pathParameters && event.pathParameters.formId;

    if (!formId) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Missing formId path parameter' }),
      };
    }

    const form = await getItem(`FORM#${formId}`, 'METADATA');

    if (!form) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Form not found' }),
      };
    }

    // Authorization: check that the user is allowed to view this form
    if (user.role === 'requester') {
      // Requesters can only see forms they created
      if (form.createdBy !== user.username) {
        return {
          statusCode: 403,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Access denied: you can only view your own forms' }),
        };
      }
    } else if (user.role === 'reviewer') {
      // Reviewers see SUBMITTED and UNDER_REVIEW forms
      const allowedStatuses = ['SUBMITTED', 'UNDER_REVIEW'];
      if (!allowedStatuses.includes(form.status)) {
        return {
          statusCode: 403,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Access denied: reviewers can only view submitted or under-review forms' }),
        };
      }
    } else if (user.role === 'approver') {
      // Approvers see UNDER_REVIEW and terminal-status forms
      const allowedStatuses = ['UNDER_REVIEW', 'APPROVED', 'CONDITIONAL', 'REJECTED', 'DEFERRED'];
      if (!allowedStatuses.includes(form.status)) {
        return {
          statusCode: 403,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Access denied: approvers can only view forms under review or already decided' }),
        };
      }
    } else {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: `Unknown role "${user.role}"` }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(form),
    };
  } catch (error) {
    console.error('GetForm error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
