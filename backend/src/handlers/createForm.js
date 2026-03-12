'use strict';

const { v4: uuidv4 } = require('uuid');
const { putItem } = require('../lib/dynamodb');
const { getUserFromEvent } = require('../lib/auth');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

/**
 * POST /forms
 * Creates a new GenAI Review form in DRAFT status.
 */
exports.handler = async (event) => {
  try {
    const user = getUserFromEvent(event);

    if (user.role !== 'requester') {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Only users with the "requester" role can create forms' }),
      };
    }

    const formId = uuidv4();
    const now = new Date().toISOString();

    const item = {
      PK: `FORM#${formId}`,
      SK: 'METADATA',
      GSI1PK: `USER#${user.username}`,
      GSI1SK: `STATUS#DRAFT#${now}`,
      GSI2PK: 'STATUS#DRAFT',
      GSI2SK: `FORM#${formId}`,
      formId,
      status: 'DRAFT',
      createdBy: user.username,
      createdAt: now,
      updatedAt: now,
      updatedBy: user.username,
      projectName: '',
      businessUnit: '',
      solutionType: '',
      formData: {},
      riskLibrary: {},
      reviewerAssessment: {},
      approverDecision: {},
    };

    await putItem(item);

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        formId,
        status: 'DRAFT',
        createdAt: now,
      }),
    };
  } catch (error) {
    console.error('CreateForm error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
