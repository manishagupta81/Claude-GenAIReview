import React from 'react';

export default function RadioGroup({ label, name, value, onChange, options, required, readOnly, inline = false }) {
  return (
    <div className="field-group">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      <div className={inline ? 'inline-radio' : 'radio-group'}>
        {options.map((opt) => (
          <label key={opt.value} className="radio-item">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              disabled={readOnly}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
