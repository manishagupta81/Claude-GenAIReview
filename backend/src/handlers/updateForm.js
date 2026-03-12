'use strict';

const { getItem, updateItem } = require('../lib/dynamodb');
const { getUserFromEvent } = require('../lib/auth');
const { validateFieldAccess } = require('../lib/validation');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

const UPDATABLE_SECTIONS = ['formData', 'riskLibrary', 'reviewerAssessment', 'approverDecision'];

/**
 * PUT /forms/{formId}
 * Updates allowed sections of a form based on the user's role and the form's status.
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

    // Fetch current form to check status
    const form = await getItem(`FORM#${formId}`, 'METADATA');
    if (!form) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Form not found' }),
      };
    }

    // Build update expression dynamically for allowed sections
    const updateParts = [];
    const exprAttrNames = {};
    const exprAttrValues = {};
    const errors = [];

    for (const section of UPDATABLE_SECTIONS) {
      if (body[section] !== undefined) {
        const access = validateFieldAccess(user.role, form.status, section);
        if (!access.allowed) {
          errors.push(access.error);
          continue;
        }
        updateParts.push(`#${section} = :${section}`);
        exprAttrNames[`#${section}`] = section;
        exprAttrValues[`:${section}`] = body[section];
      }
    }

    if (errors.length > 0 && updateParts.length === 0) {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Access denied', details: errors }),
      };
    }

    // Always update timestamps
    const now = new Date().toISOString();
    updateParts.push('#updatedAt = :updatedAt');
    exprAttrNames['#updatedAt'] = 'updatedAt';
    exprAttrValues[':updatedAt'] = now;

    updateParts.push('#updatedBy = :updatedBy');
    exprAttrNames['#updatedBy'] = 'updatedBy';
    exprAttrValues[':updatedBy'] = user.username;

    // Update denormalized fields from formData if present
    if (body.formData) {
      if (body.formData.projectName !== undefined) {
        updateParts.push('#projectName = :projectName');
        exprAttrNames['#projectName'] = 'projectName';
        exprAttrValues[':projectName'] = body.formData.projectName;
      }
      if (body.formData.businessUnit !== undefined) {
        updateParts.push('#businessUnit = :businessUnit');
        exprAttrNames['#businessUnit'] = 'businessUnit';
        exprAttrValues[':businessUnit'] = body.formData.businessUnit;
      }
      if (body.formData.solutionType !== undefined) {
        updateParts.push('#solutionType = :solutionType');
        exprAttrNames['#solutionType'] = 'solutionType';
        exprAttrValues[':solutionType'] = body.formData.solutionType;
      }
    }

    const updateExpression = 'SET ' + updateParts.join(', ');

    await updateItem(
      `FORM#${formId}`,
      'METADATA',
      updateExpression,
      exprAttrNames,
      exprAttrValues
    );

    const response = { formId, updatedAt: now };
    if (errors.length > 0) {
      response.warnings = errors;
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('UpdateForm error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
