import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import SelectField from '../FormFields/SelectField';
import DateField from '../FormFields/DateField';

const SEVERITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];

const RATING_CATEGORIES = [
  { name: 'rvwRating_model', label: '1. Model & Operational Risk', color: '#1e40af' },
  { name: 'rvwRating_security', label: '2. Security & Data Risk', color: '#92400e' },
  { name: 'rvwRating_strategic', label: '3. Strategic & Reputational Risk', color: '#9d174d' },
  { name: 'rvwRating_ethical', label: '4. Ethical & Societal Risk', color: '#5b21b6' },
  { name: 'rvwRating_legal', label: '5. Legal & Regulatory Risk', color: '#991b1b' },
];

export default function Tab11Decision({ readOnly }) {
  const { approverDecision, updateField, transitionStatus, status, saving } = useForm();
  const onChange = (name, value) => updateField('approverDecision', name, value);

  const handleAction = async (action) => {
    const labels = {
      approve: 'approve',
      conditionalApprove: 'conditionally approve',
      reject: 'reject',
      defer: 'defer',
    };
    if (!window.confirm(`Are you sure you want to ${labels[action]} this form?`)) return;
    try {
      await transitionStatus(action);
      alert(`Form ${labels[action]}d successfully!`);
    } catch (err) {
      alert('Action failed: ' + err.message);
    }
  };

  return (
    <div>
      <div className="panel-header" style={{ borderBottomColor: '#7e22ce' }}>
        <h2>Review Decision <span className="reviewer-badge" style={{ background: '#7e22ce' }}>Approver Only</span></h2>
        <div className="panel-subtitle">Final risk ratings, recommendation, and sign-off</div>
      </div>
      <div className="panel-body" style={{ background: '#faf5ff' }}>
        <div className="reviewer-banner" style={{ background: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This section is for the <strong>Approving Authority only</strong>. Provide risk ratings and the final decision.</span>
        </div>

        {/* Risk Ratings */}
        <div className="subsection-title">Risk Rating by Macro Category</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', padding: '4px 0 8px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: 10, fontWeight: 600, borderBottom: '1px solid #e2e8f0' }}>
          <span>Category</span><span>Risk Rating</span>
        </div>
        {RATING_CATEGORIES.map((cat) => (
          <div key={cat.name} className="rating-grid">
            <span style={{ fontWeight: 600, color: cat.color }}>{cat.label}</span>
            <select
              value={approverDecision[cat.name] || ''}
              onChange={(e) => onChange(cat.name, e.target.value)}
              disabled={readOnly}
            >
              <option value="">-- Select --</option>
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="subsection" style={{ marginTop: 24 }}>
          <div className="subsection-title">Overall Assessment</div>
          <SelectField
            label="Final Assessed Risk Tier"
            name="finalRiskTier"
            value={approverDecision.finalRiskTier}
            onChange={onChange}
            readOnly={readOnly}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'high', label: 'High' },
              { value: 'critical', label: 'Critical' },
            ]}
          />
          <TextAreaField label="Justification for risk tier" name="riskTierJustification" value={approverDecision.riskTierJustification} onChange={onChange} readOnly={readOnly} rows={3} />
          <TextAreaField label="Conditions or restrictions (if any)" name="conditions" value={approverDecision.conditions} onChange={onChange} readOnly={readOnly} rows={3} />
          <TextAreaField label="Required actions before next review" name="requiredActions" value={approverDecision.requiredActions} onChange={onChange} readOnly={readOnly} rows={3} />
          <DateField label="Next review date" name="nextReviewDate" value={approverDecision.nextReviewDate} onChange={onChange} readOnly={readOnly} />
        </div>

        <div className="subsection">
          <div className="subsection-title">Approver Sign-Off</div>
          <div className="row">
            <TextField label="Approver Name" name="approverName" value={approverDecision.approverName} onChange={onChange} readOnly={readOnly} />
            <TextField label="Approver Title" name="approverTitle" value={approverDecision.approverTitle} onChange={onChange} readOnly={readOnly} />
          </div>
          <div className="row">
            <TextField label="Signature" name="approverSignature" value={approverDecision.approverSignature} onChange={onChange} readOnly={readOnly} placeholder="Type full name as signature" />
            <DateField label="Date" name="approverDate" value={approverDecision.approverDate} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        {status === 'UNDER_REVIEW' && !readOnly && (
          <div className="subsection">
            <div className="subsection-title">Decision</div>
            <div className="workflow-actions">
              <button className="btn-action btn-action-approve" onClick={() => handleAction('approve')} disabled={saving}>
                Approve
              </button>
              <button className="btn-action btn-action-conditional" onClick={() => handleAction('conditionalApprove')} disabled={saving}>
                Conditional Approval
              </button>
              <button className="btn-action btn-action-reject" onClick={() => handleAction('reject')} disabled={saving}>
                Reject
              </button>
              <button className="btn-action btn-action-defer" onClick={() => handleAction('defer')} disabled={saving}>
                Defer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
