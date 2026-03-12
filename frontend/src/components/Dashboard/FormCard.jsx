import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function FormCard({ form }) {
  const navigate = useNavigate();

  return (
    <div className="form-card" onClick={() => navigate(`/form/${form.formId}`)}>
      <div className="form-card-left">
        <h3>{form.projectName || 'Untitled Form'}</h3>
        <p>
          {form.businessUnit || 'No business unit'} &middot; Created by{' '}
          {form.createdBy}
        </p>
      </div>
      <div className="form-card-right">
        <StatusBadge status={form.status} />
        <span className="form-card-date">
          {form.createdAt
            ? new Date(form.createdAt).toLocaleDateString()
            : ''}
        </span>
      </div>
    </div>
  );
}
