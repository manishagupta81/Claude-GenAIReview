'use strict';

const { getItem } = require('../lib/dynamodb');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

/**
 * GET /forms/{formId}
 * Retrieves a single form by its ID.
 */
exports.handler = async (event) => {
  try {
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
