'use strict';

const { queryGSI1, queryGSI2 } = require('../lib/dynamodb');
const { getUserFromEvent } = require('../lib/auth');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

/**
 * Pluck only the summary fields needed for list views.
 */
function toSummary(item) {
  return {
    formId: item.formId,
    projectName: item.projectName,
    businessUnit: item.businessUnit,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.createdBy,
  };
}

/**
 * GET /forms
 * Lists forms relevant to the current user's role.
 *
 * - Requester: sees their own forms (GSI1 by USER#username)
 * - Reviewer:  sees SUBMITTED and UNDER_REVIEW forms (GSI2)
 * - Approver:  sees UNDER_REVIEW forms (GSI2)
 */
exports.handler = async (event) => {
  try {
    const user = getUserFromEvent(event);
    const qs = event.queryStringParameters || {};
    const limit = qs.limit ? parseInt(qs.limit, 10) : 25;
    const nextToken = qs.nextToken || null;

    let forms = [];
    let responseNextToken = null;

    if (user.role === 'requester') {
      // Query GSI1 for all forms belonging to this user
      const items = await queryGSI1(`USER#${user.username}`);
      forms = items.map(toSummary);
    } else if (user.role === 'reviewer') {
      // Query GSI2 for SUBMITTED forms
      const submitted = await queryGSI2('STATUS#SUBMITTED', limit, nextToken);
      // Query GSI2 for UNDER_REVIEW forms
      const underReview = await queryGSI2('STATUS#UNDER_REVIEW', limit, nextToken);

      forms = [
        ...submitted.items.map(toSummary),
        ...underReview.items.map(toSummary),
      ];
      responseNextToken = submitted.nextToken || underReview.nextToken;
    } else if (user.role === 'approver') {
      // Query GSI2 for UNDER_REVIEW forms
      const result = await queryGSI2('STATUS#UNDER_REVIEW', limit, nextToken);
      forms = result.items.map(toSummary);
      responseNextToken = result.nextToken;
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
      body: JSON.stringify({ forms, nextToken: responseNextToken }),
    };
  } catch (error) {
    console.error('ListForms error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
