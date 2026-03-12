/**
 * Tab configuration for the GenAI Review Form.
 *
 * visibility: which roles can see this tab
 * editable: which roles can edit fields in this tab (in allowed statuses)
 * section: which data section in DynamoDB this tab reads/writes
 */
const TAB_CONFIG = [
  {
    index: 0,
    label: 'Snapshot',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 1,
    label: 'Use Case',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 2,
    label: 'Classification',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 3,
    label: 'Option A',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'green',
  },
  {
    index: 4,
    label: 'Option B',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'amber',
  },
  {
    index: 5,
    label: 'IP',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 6,
    label: 'Workforce',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 7,
    label: 'Regulatory',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'blue',
  },
  {
    index: 8,
    label: 'Risk Library',
    section: 'riskLibrary',
    visibility: ['reviewer', 'approver'],
    editable: ['reviewer'],
    color: 'teal',
  },
  {
    index: 9,
    label: 'Risk Declaration',
    section: 'formData',
    visibility: ['requester', 'reviewer', 'approver'],
    editable: ['requester'],
    color: 'red',
  },
  {
    index: 10,
    label: 'Assessment',
    section: 'reviewerAssessment',
    visibility: ['reviewer', 'approver'],
    editable: ['reviewer'],
    color: 'teal',
  },
  {
    index: 11,
    label: 'Decision',
    section: 'approverDecision',
    visibility: ['approver'],
    editable: ['approver'],
    color: 'purple',
  },
];

/**
 * Get tabs visible to a given role.
 */
export function getVisibleTabs(role) {
  return TAB_CONFIG.filter((tab) => tab.visibility.includes(role));
}

/**
 * Check if a role can edit a specific tab.
 */
export function canEditTab(role, tabIndex, status) {
  const tab = TAB_CONFIG[tabIndex];
  if (!tab) return false;
  if (!tab.editable.includes(role)) return false;

  // Role-status editing rules
  if (role === 'requester') return status === 'DRAFT';
  if (role === 'reviewer') return ['SUBMITTED', 'UNDER_REVIEW'].includes(status);
  if (role === 'approver') return status === 'UNDER_REVIEW';
  return false;
}

export default TAB_CONFIG;
