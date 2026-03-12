'use strict';

/**
 * Workflow state-transition map.
 * Each status maps to allowed actions, the resulting next status,
 * and the roles that are permitted to trigger that action.
 */
const TRANSITIONS = {
  DRAFT: {
    submit: { nextStatus: 'SUBMITTED', allowedRoles: ['requester'] },
  },
  SUBMITTED: {
    startReview: { nextStatus: 'UNDER_REVIEW', allowedRoles: ['reviewer'] },
  },
  UNDER_REVIEW: {
    approve: { nextStatus: 'APPROVED', allowedRoles: ['approver'] },
    conditionalApprove: { nextStatus: 'CONDITIONAL', allowedRoles: ['approver'] },
    reject: { nextStatus: 'REJECTED', allowedRoles: ['approver'] },
    defer: { nextStatus: 'DEFERRED', allowedRoles: ['approver'] },
  },
  DEFERRED: {
    returnToDraft: { nextStatus: 'DRAFT', allowedRoles: ['requester'] },
  },
};

/**
 * Validate whether a status transition is allowed.
 *
 * @param {string} currentStatus - The current status of the form.
 * @param {string} action        - The transition action to perform.
 * @param {string} userRole      - The role of the user attempting the transition.
 * @returns {{ valid: boolean, nextStatus?: string, error?: string }}
 */
function validateTransition(currentStatus, action, userRole) {
  const statusTransitions = TRANSITIONS[currentStatus];

  if (!statusTransitions) {
    return {
      valid: false,
      error: `No transitions available from status "${currentStatus}"`,
    };
  }

  const transition = statusTransitions[action];

  if (!transition) {
    return {
      valid: false,
      error: `Action "${action}" is not valid for status "${currentStatus}"`,
    };
  }

  if (!transition.allowedRoles.includes(userRole)) {
    return {
      valid: false,
      error: `Role "${userRole}" is not allowed to perform "${action}" on status "${currentStatus}"`,
    };
  }

  return {
    valid: true,
    nextStatus: transition.nextStatus,
  };
}

module.exports = { TRANSITIONS, validateTransition };
