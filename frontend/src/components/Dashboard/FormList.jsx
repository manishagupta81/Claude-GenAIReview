import React from 'react';
import FormCard from './FormCard';

export default function FormList({ forms, loading }) {
  if (loading) {
    return (
      <div className="empty-state">
        <div className="spinner" />
        <p>Loading forms...</p>
      </div>
    );
  }

  if (!forms || forms.length === 0) {
    return (
      <div className="empty-state">
        <h3>No forms yet</h3>
        <p>Create a new review form to get started.</p>
      </div>
    );
  }

  return (
    <div>
      {forms.map((form) => (
        <FormCard key={form.formId} form={form} />
      ))}
    </div>
  );
}
