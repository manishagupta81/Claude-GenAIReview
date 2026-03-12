import React from 'react';

export default function SelectField({ label, name, value, onChange, options, required, readOnly, placeholder = '-- Select --' }) {
  return (
    <div className="field-group">
      {label && (
        <label>
          {label}
          {required && <span className="req"> *</span>}
        </label>
      )}
      <select
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        disabled={readOnly}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
