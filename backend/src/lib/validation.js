'use strict';

/**
 * Role-based field-write validation.
 *
 * Controls which sections each role can update based on the
 * current form status.
 *
 * @param {string} role                - User role (requester | reviewer | approver)
 * @param {string} status              - Current form status
 * @param {string} sectionBeingUpdated - The data section being written
 * @returns {{ allowed: boolean, error?: string }}
 */
function validateFieldAccess(role, status, sectionBeingUpdated) {
  // Requester can update formData only when status is DRAFT
  if (role === 'requester') {
    if (sectionBeingUpdated === 'formData') {
      if (status === 'DRAFT') {
        return { allowed: true };
      }
      return {
        allowed: false,
        error: 'Requester can only update form data when the form is in DRAFT status',
      };
    }
    return {
      allowed: false,
      error: `Requester is not allowed to update "${sectionBeingUpdated}"`,
    };
  }

  // Reviewer can update riskLibrary and reviewerAssessment when SUBMITTED or UNDER_REVIEW
  if (role === 'reviewer') {
    if (sectionBeingUpdated === 'riskLibrary' || sectionBeingUpdated === 'reviewerAssessment') {
      if (status === 'SUBMITTED' || status === 'UNDER_REVIEW') {
        return { allowed: true };
      }
      return {
        allowed: false,
        error: `Reviewer can only update "${sectionBeingUpdated}" when the form is SUBMITTED or UNDER_REVIEW`,
      };
    }
    return {
      allowed: false,
      error: `Reviewer is not allowed to update "${sectionBeingUpdated}"`,
    };
  }

  // Approver can update approverDecision when UNDER_REVIEW
  if (role === 'approver') {
    if (sectionBeingUpdated === 'approverDecision') {
      if (status === 'UNDER_REVIEW') {
        return { allowed: true };
      }
      return {
        allowed: false,
        error: 'Approver can only update approver decision when the form is UNDER_REVIEW',
      };
    }
    return {
      allowed: false,
      error: `Approver is not allowed to update "${sectionBeingUpdated}"`,
    };
  }

  return {
    allowed: false,
    error: `Unknown role "${role}"`,
  };
}

module.exports = { validateFieldAccess };
