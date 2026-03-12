import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import DateField from '../FormFields/DateField';

export default function Tab9RiskDeclaration({ readOnly }) {
  const { formData, updateField, transitionStatus, status, saving } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit this form for review?')) return;
    try {
      await transitionStatus('submit');
      alert('Form submitted successfully!');
    } catch (err) {
      alert('Submit failed: ' + err.message);
    }
  };

  return (
    <div>
      <div className="panel-header panel-header-red">
        <h2>Section 6 &mdash; Business Risk Declaration</h2>
        <div className="panel-subtitle">Self-Assessment</div>
      </div>
      <div className="panel-body">
        <RadioGroup
          label="Residual Risk Level (Business Assessment)"
          name="residualRisk"
          value={formData.residualRisk}
          onChange={onChange}
          required
          readOnly={readOnly}
          inline
          options={[
            { value: 'low', label: 'Low' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'elevated', label: 'Elevated' },
            { value: 'high', label: 'High' },
          ]}
        />

        <TextAreaField label="Key Risks (summarize from Risk Library selection)" name="keyRisks" value={formData.keyRisks} onChange={onChange} readOnly={readOnly} rows={3} />
        <TextAreaField label="Mitigations" name="mitigations" value={formData.mitigations} onChange={onChange} readOnly={readOnly} rows={3} />

        <div className="attestation-box" style={{ background: '#fef2f2', borderColor: '#dc2626' }}>
          <p>Business Owner Attestation</p>
          <p style={{ fontWeight: 400, fontSize: '0.8rem', marginBottom: 12 }}>
            I confirm this submission accurately reflects scope, controls, and data usage.
          </p>
          <div className="row">
            <TextField label="Name" name="attestName" value={formData.attestName} onChange={onChange} required readOnly={readOnly} />
            <TextField label="Title" name="attestTitle" value={formData.attestTitle} onChange={onChange} required readOnly={readOnly} />
          </div>
          <div className="row">
            <TextField label="Signature" name="attestSignature" value={formData.attestSignature} onChange={onChange} required readOnly={readOnly} placeholder="Type full name as signature" />
            <DateField label="Date" name="attestDate" value={formData.attestDate} onChange={onChange} required readOnly={readOnly} />
          </div>
        </div>

        {status === 'DRAFT' && !readOnly && (
          <div className="submit-area" style={{ marginTop: 24, border: 'none', padding: '24px 0 0', background: 'transparent' }}>
            <p>Review all tabs before submitting. Required fields are marked with <span style={{ color: 'var(--danger)', fontWeight: 700 }}>*</span></p>
            <button className="btn-submit" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Submitting...' : 'Submit Review Form'}
            </button>
          </div>
        )}

        {status === 'DEFERRED' && !readOnly && (
          <div className="submit-area" style={{ marginTop: 24, border: 'none', padding: '24px 0 0', background: 'transparent' }}>
            <p>This form was deferred. You can return it to draft status to make changes.</p>
            <button
              className="btn-action btn-action-submit"
              onClick={async () => {
                try {
                  await transitionStatus('returnToDraft');
                  alert('Form returned to draft.');
                } catch (err) {
                  alert('Failed: ' + err.message);
                }
              }}
              disabled={saving}
            >
              Return to Draft
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
