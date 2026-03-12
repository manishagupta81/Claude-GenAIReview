'use strict';

/**
 * Required fields per tab (tab index).
 * Only tabs with required fields are listed.
 */
const REQUIRED_FIELDS = {
  0: [
    'projectName',
    'businessUnit',
    'businessSponsor',
    'executiveSponsor',
    'businessOwner',
    'technicalOwner',
    'submissionDate',
  ],
  9: [
    'residualRisk',
    'attestName',
    'attestTitle',
    'attestSignature',
    'attestDate',
  ],
};

/**
 * Maps each role to the data sections they own.
 */
const TAB_ROLE_MAP = {
  requester: ['formData'],
  reviewer: ['riskLibrary', 'reviewerAssessment'],
  approver: ['approverDecision'],
};

module.exports = { REQUIRED_FIELDS, TAB_ROLE_MAP };
