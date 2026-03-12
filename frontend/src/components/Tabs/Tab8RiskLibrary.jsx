import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import TextAreaField from '../FormFields/TextAreaField';

const RISK_CATEGORIES = [
  {
    id: 'model_operational',
    name: '1. Model & Operational Risk',
    cssClass: 'cat-model',
    count: 14,
    risks: [
      { id: 'hallucinations', label: 'Generative AI Hallucinations' },
      { id: 'biasImpact', label: 'Bias Impact' },
      { id: 'useCaseAppropriateness', label: 'Appropriateness of Use Cases' },
      { id: 'newFeatures', label: 'Addition / Enablement of New Features' },
      { id: 'customChatbots', label: 'Custom Chatbots Management' },
      { id: 'staleData', label: 'Outdated / Stale Training Data' },
      { id: 'changeManagement', label: 'Change Management Process' },
      { id: 'automatedDecision', label: 'Automated Decision-Making' },
      { id: 'toneDrift', label: 'Tone Drift' },
      { id: 'badCode', label: 'Bad Code Output' },
      { id: 'modelSecurity', label: 'Model Security' },
      { id: 'dataIntegrity', label: 'Data Integrity' },
      { id: 'platformStability', label: 'Platform Stability' },
      { id: 'overallRiskProfile', label: 'Overall Risk Profile Assessment' },
    ],
  },
  {
    id: 'security_data',
    name: '2. Security & Data Risk',
    cssClass: 'cat-security',
    count: 11,
    risks: [
      { id: 'dataSecurity', label: 'Data Security' },
      { id: 'dataRetention', label: 'Data Retention' },
      { id: 'sensitiveDataDisclosure', label: 'Sensitive Data Disclosure' },
      { id: 'trainOnData', label: 'Use of Data to Train AI Models' },
      { id: 'authAccess', label: 'Authentication & Access Controls' },
      { id: 'externalAPIs', label: 'Use of Public / External APIs' },
      { id: 'dataSegregation', label: 'Data Segregation' },
      { id: 'securityControls', label: 'Security Controls' },
      { id: 'defaultEnabled', label: 'AI Features Enabled by Default' },
      { id: 'browserDep', label: 'Browser Dependency' },
      { id: 'cyberFraud', label: 'Cyber Fraud Risk' },
    ],
  },
  {
    id: 'strategic_reputational',
    name: '3. Strategic & Reputational Risk',
    cssClass: 'cat-strategic',
    count: 5,
    risks: [
      { id: 'clientPushback', label: 'Client Pushback' },
      { id: 'skillAtrophy', label: 'Skill Atrophy & Reviewer Complacency' },
      { id: 'takedownRequests', label: 'Takedown Requests' },
      { id: 'thirdPartyOutput', label: 'Use of Outputs by Third Parties' },
      { id: 'brandingRisk', label: 'Branding Risk' },
    ],
  },
  {
    id: 'ethical_societal',
    name: '4. Ethical & Societal Risk',
    cssClass: 'cat-ethical',
    count: 2,
    risks: [
      { id: 'privacyInfringement', label: 'Privacy Infringement' },
      { id: 'properUseMaterials', label: 'Proper Use of Research & Vendor Materials' },
    ],
  },
  {
    id: 'legal_regulatory',
    name: '5. Legal & Regulatory Risk',
    cssClass: 'cat-legal',
    count: 6,
    risks: [
      { id: 'ipOwnershipRisk', label: 'IP — Ownership of Content' },
      { id: 'ipThirdParty', label: 'IP — Third Party Claims' },
      { id: 'contractualLimits', label: 'Contractual Use Limitations' },
      { id: 'noWarranties', label: 'No Guarantees or Warranties' },
      { id: 'indemnification', label: 'Indemnification' },
      { id: 'regCompliance', label: 'Regulatory & Compliance' },
    ],
  },
];

const SEVERITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];

export default function Tab8RiskLibrary({ readOnly }) {
  const { riskLibrary, updateRisk, formData, updateField } = useForm();
  const [collapsed, setCollapsed] = useState({});

  const toggleCategory = (catId) => {
    setCollapsed((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const selectedCount = Object.values(riskLibrary).filter((r) => r?.checked).length;

  return (
    <div>
      <div className="panel-header panel-header-teal">
        <h2>Risk Assessment Library <span className="reviewer-badge">Reviewer Only</span></h2>
        <div className="panel-subtitle">Select applicable risks and assign severity</div>
      </div>
      <div className="panel-body">
        <div className="reviewer-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Check each risk that applies to this request and assign a severity level.</span>
        </div>

        {RISK_CATEGORIES.map((cat) => (
          <div key={cat.id} className="risk-category">
            <div className={`risk-cat-header ${cat.cssClass} ${collapsed[cat.id] ? 'collapsed' : ''}`} onClick={() => toggleCategory(cat.id)}>
              <h3>
                <span>{cat.name}</span>
                <span className="risk-count">{cat.count} risks</span>
              </h3>
              <span className="chevron" style={{ transform: collapsed[cat.id] ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s' }}>
                &#9660;
              </span>
            </div>
            <div className={`risk-cat-body ${collapsed[cat.id] ? 'collapsed' : ''}`}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', padding: '4px 0 8px', display: 'grid', gridTemplateColumns: '1fr 180px', gap: 10, fontWeight: 600, borderBottom: '1px solid #e2e8f0' }}>
                <span>Risk</span><span>Severity</span>
              </div>
              {cat.risks.map((risk) => {
                const riskData = riskLibrary[risk.id] || {};
                return (
                  <div key={risk.id} className="risk-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={!!riskData.checked}
                        onChange={(e) => updateRisk(risk.id, { checked: e.target.checked })}
                        disabled={readOnly}
                      />
                      <span>{risk.label}</span>
                    </label>
                    <select
                      value={riskData.severity || ''}
                      onChange={(e) => updateRisk(risk.id, { severity: e.target.value })}
                      disabled={readOnly}
                    >
                      <option value="">-- Select --</option>
                      {SEVERITY_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="risk-summary-box" style={{ marginTop: 20 }}>
          <h4>Selected Risks Summary</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong>{selectedCount}</strong> of 38 risks selected for this request
          </p>
        </div>

        <TextAreaField
          label="Additional risks not listed above"
          name="additionalRisks"
          value={formData.additionalRisks}
          onChange={(name, value) => updateField('formData', name, value)}
          readOnly={readOnly}
          placeholder="Describe any additional risks specific to this request..."
          rows={3}
        />
      </div>
    </div>
  );
}
