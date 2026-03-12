'use strict';

const { getItem, updateItem, putItem } = require('../lib/dynamodb');
const { getUserFromEvent } = require('../lib/auth');
const { validateTransition } = require('../lib/statusMachine');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

/**
 * POST /forms/{formId}/transition
 * Transitions a form's status according to the state machine.
 * Also writes an audit HISTORY record.
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

    const body = JSON.parse(event.body || '{}');
    const { action } = body;

    if (!action) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Missing "action" in request body' }),
      };
    }

    // Fetch the current form
    const form = await getItem(`FORM#${formId}`, 'METADATA');
    if (!form) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Form not found' }),
      };
    }

    // Validate the transition
    const result = validateTransition(form.status, action, user.role);
    if (!result.valid) {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: result.error }),
      };
    }

    const previousStatus = form.status;
    const newStatus = result.nextStatus;
    const now = new Date().toISOString();

    // Update form status and GSI keys
    const updateExpression = 'SET #status = :status, #updatedAt = :updatedAt, #updatedBy = :updatedBy, ' +
      '#gsi1sk = :gsi1sk, #gsi2pk = :gsi2pk, #gsi2sk = :gsi2sk';

    const exprAttrNames = {
      '#status': 'status',
      '#updatedAt': 'updatedAt',
      '#updatedBy': 'updatedBy',
      '#gsi1sk': 'GSI1SK',
      '#gsi2pk': 'GSI2PK',
      '#gsi2sk': 'GSI2SK',
    };

    const exprAttrValues = {
      ':status': newStatus,
      ':updatedAt': now,
      ':updatedBy': user.username,
      ':gsi1sk': `STATUS#${newStatus}#${now}`,
      ':gsi2pk': `STATUS#${newStatus}`,
      ':gsi2sk': `FORM#${formId}`,
    };

    await updateItem(
      `FORM#${formId}`,
      'METADATA',
      updateExpression,
      exprAttrNames,
      exprAttrValues
    );

    // Write audit history record
    const historyItem = {
      PK: `FORM#${formId}`,
      SK: `HISTORY#${now}`,
      fromStatus: previousStatus,
      toStatus: newStatus,
      action,
      changedBy: user.username,
      changedAt: now,
    };

    await putItem(historyItem);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        formId,
        status: newStatus,
        previousStatus,
      }),
    };
  } catch (error) {
    console.error('TransitionStatus error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
