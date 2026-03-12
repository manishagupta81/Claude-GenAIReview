import React from 'react';

const STATUS_LABELS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  CONDITIONAL: 'Conditional',
  REJECTED: 'Rejected',
  DEFERRED: 'Deferred',
};

export default function StatusBadge({ status }) {
  const cls = `status-badge status-${status?.toLowerCase()}`;
  return <span className={cls}>{STATUS_LABELS[status] || status}</span>;
}
