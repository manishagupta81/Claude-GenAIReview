import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';
import DateField from '../FormFields/DateField';

export default function Tab10Assessment({ readOnly }) {
  const { reviewerAssessment, updateField, transitionStatus, status, saving } = useForm();
  const onChange = (name, value) => updateField('reviewerAssessment', name, value);
  const [collapsed, setCollapsed] = useState({});

  const toggleCat = (id) => setCollapsed((p) => ({ ...p, [id]: !p[id] }));

  const handleStartReview = async () => {
    try {
      await transitionStatus('startReview');
      alert('Review started!');
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  return (
    <div>
      <div className="panel-header panel-header-teal">
        <h2>Reviewer Assessment <span className="reviewer-badge">Reviewer Only</span></h2>
        <div className="panel-subtitle">Deep-dive assessment of the submitted request</div>
      </div>
      <div className="panel-body panel-body-teal">
        <div className="reviewer-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This section is for the <strong>Review Group only</strong>. Assess the requester's submission (Tabs 0-9) and document findings below.</span>
        </div>

        {status === 'SUBMITTED' && !readOnly && (
          <div style={{ marginBottom: 20 }}>
            <button className="btn-action btn-action-start-review" onClick={handleStartReview} disabled={saving}>
              {saving ? 'Starting...' : 'Start Review'}
            </button>
          </div>
        )}

        <div className="row" style={{ marginBottom: 16 }}>
          <TextField label="Reviewer Name(s)" name="rvwNames" value={reviewerAssessment.rvwNames} onChange={onChange} readOnly={readOnly} />
          <DateField label="Review Date" name="rvwDate" value={reviewerAssessment.rvwDate} onChange={onChange} readOnly={readOnly} />
        </div>

        {/* Category 1 */}
        <div className="review-cat-section">
          <div className={`review-cat-header cat-model`} onClick={() => toggleCat('c1')}>
            <h3>1. Model &amp; Operational Risk Assessment</h3>
            <span style={{ transform: collapsed.c1 ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s', display: 'inline-block' }}>&#9660;</span>
          </div>
          <div className={`review-cat-body ${collapsed.c1 ? 'collapsed' : ''}`}>
            <TextAreaField label="Is the use case appropriate for GenAI? Justify." name="rvw1_useCase" value={reviewerAssessment.rvw1_useCase} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Hallucination risk level and adequacy of controls" name="rvw1_hallucination" value={reviewerAssessment.rvw1_hallucination} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Bias assessment findings" name="rvw1_bias" value={reviewerAssessment.rvw1_bias} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Tone drift / output quality monitoring assessment" name="rvw1_toneDrift" value={reviewerAssessment.rvw1_toneDrift} onChange={onChange} readOnly={readOnly} />
            <RadioGroup name="rvw1_changeMgmt" label="Has a formal change management process been defined?" value={reviewerAssessment.rvw1_changeMgmt} onChange={onChange} readOnly={readOnly} inline
              options={[
                { value: 'adequate', label: 'Adequate' },
                { value: 'partial', label: 'Partial — needs improvement' },
                { value: 'missing', label: 'Missing' },
              ]}
            />
            <TextAreaField label="Platform stability / BCP assessment" name="rvw1_bcp" value={reviewerAssessment.rvw1_bcp} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Data integrity checks assessment" name="rvw1_dataIntegrity" value={reviewerAssessment.rvw1_dataIntegrity} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Overall risk profile justification (reviewer view)" name="rvw1_riskProfile" value={reviewerAssessment.rvw1_riskProfile} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Reviewer notes & gaps identified" name="rvw1_notes" value={reviewerAssessment.rvw1_notes} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        {/* Category 2 */}
        <div className="review-cat-section">
          <div className="review-cat-header cat-security" onClick={() => toggleCat('c2')}>
            <h3>2. Security &amp; Data Risk Assessment</h3>
            <span style={{ transform: collapsed.c2 ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s', display: 'inline-block' }}>&#9660;</span>
          </div>
          <div className={`review-cat-body ${collapsed.c2 ? 'collapsed' : ''}`}>
            <TextAreaField label="Data security controls adequacy" name="rvw2_dataSecurity" value={reviewerAssessment.rvw2_dataSecurity} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Data retention policy review" name="rvw2_retention" value={reviewerAssessment.rvw2_retention} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Sensitive data disclosure risk assessment" name="rvw2_sensitiveData" value={reviewerAssessment.rvw2_sensitiveData} onChange={onChange} readOnly={readOnly} />
            <RadioGroup name="rvw2_trainOnData" label="Is data used to train vendor AI models?" value={reviewerAssessment.rvw2_trainOnData} onChange={onChange} readOnly={readOnly} inline
              options={[
                { value: 'confirmed_no', label: 'Confirmed No' },
                { value: 'yes_risk', label: 'Yes — risk flagged' },
                { value: 'unclear', label: 'Unclear — needs clarification' },
              ]}
            />
            <TextAreaField label="Authentication & access controls assessment" name="rvw2_authAccess" value={reviewerAssessment.rvw2_authAccess} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="External API / browser dependency risks" name="rvw2_externalAPIs" value={reviewerAssessment.rvw2_externalAPIs} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Cyber fraud risk assessment" name="rvw2_cyberFraud" value={reviewerAssessment.rvw2_cyberFraud} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Data segregation adequacy" name="rvw2_segregation" value={reviewerAssessment.rvw2_segregation} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Reviewer notes & gaps identified" name="rvw2_notes" value={reviewerAssessment.rvw2_notes} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        {/* Category 3 */}
        <div className="review-cat-section">
          <div className="review-cat-header cat-strategic" onClick={() => toggleCat('c3')}>
            <h3>3. Strategic &amp; Reputational Risk Assessment</h3>
            <span style={{ transform: collapsed.c3 ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s', display: 'inline-block' }}>&#9660;</span>
          </div>
          <div className={`review-cat-body ${collapsed.c3 ? 'collapsed' : ''}`}>
            <TextAreaField label="Client pushback / stakeholder perception risk" name="rvw3_clientPushback" value={reviewerAssessment.rvw3_clientPushback} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Skill atrophy & reviewer complacency risk" name="rvw3_skillAtrophy" value={reviewerAssessment.rvw3_skillAtrophy} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Downstream use by third parties — liability assessment" name="rvw3_downstream" value={reviewerAssessment.rvw3_downstream} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Branding & reputational harm potential" name="rvw3_branding" value={reviewerAssessment.rvw3_branding} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Takedown request process assessment" name="rvw3_takedown" value={reviewerAssessment.rvw3_takedown} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Reviewer notes & gaps identified" name="rvw3_notes" value={reviewerAssessment.rvw3_notes} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        {/* Category 4 */}
        <div className="review-cat-section">
          <div className="review-cat-header cat-ethical" onClick={() => toggleCat('c4')}>
            <h3>4. Ethical &amp; Societal Risk Assessment</h3>
            <span style={{ transform: collapsed.c4 ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s', display: 'inline-block' }}>&#9660;</span>
          </div>
          <div className={`review-cat-body ${collapsed.c4 ? 'collapsed' : ''}`}>
            <TextAreaField label="Privacy infringement risk assessment" name="rvw4_privacy" value={reviewerAssessment.rvw4_privacy} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Proper use of research & vendor materials assessment" name="rvw4_properUse" value={reviewerAssessment.rvw4_properUse} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="AI transparency & explainability adequacy" name="rvw4_transparency" value={reviewerAssessment.rvw4_transparency} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Workforce impact & accountability assessment" name="rvw4_workforce" value={reviewerAssessment.rvw4_workforce} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Reviewer notes & gaps identified" name="rvw4_notes" value={reviewerAssessment.rvw4_notes} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        {/* Category 5 */}
        <div className="review-cat-section">
          <div className="review-cat-header cat-legal" onClick={() => toggleCat('c5')}>
            <h3>5. Legal &amp; Regulatory Risk Assessment</h3>
            <span style={{ transform: collapsed.c5 ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s', display: 'inline-block' }}>&#9660;</span>
          </div>
          <div className={`review-cat-body ${collapsed.c5 ? 'collapsed' : ''}`}>
            <TextAreaField label="IP ownership & copyright infringement assessment" name="rvw5_ipOwnership" value={reviewerAssessment.rvw5_ipOwnership} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Third-party IP claims risk" name="rvw5_ipThirdParty" value={reviewerAssessment.rvw5_ipThirdParty} onChange={onChange} readOnly={readOnly} />
            <CheckboxGroup name="rvw5_contracts" label="Contractual protections adequacy" value={reviewerAssessment.rvw5_contracts} onChange={onChange} readOnly={readOnly}
              options={[
                { value: 'indemnification', label: 'IP indemnification confirmed' },
                { value: 'warranties', label: 'Warranties / guarantees present' },
                { value: 'dataReturn', label: 'Data return on termination' },
                { value: 'liabilityCap', label: 'Liability cap defined' },
                { value: 'breachNotify', label: 'Breach notification SLA' },
                { value: 'exitClause', label: 'Exit clause reviewed' },
              ]}
            />
            <TextAreaField label="Regulatory compliance assessment" name="rvw5_regulatory" value={reviewerAssessment.rvw5_regulatory} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Cross-border data transfer assessment" name="rvw5_crossBorder" value={reviewerAssessment.rvw5_crossBorder} onChange={onChange} readOnly={readOnly} />
            <TextAreaField label="Reviewer notes & gaps identified" name="rvw5_notes" value={reviewerAssessment.rvw5_notes} onChange={onChange} readOnly={readOnly} />
          </div>
        </div>

        <TextAreaField
          label="Additional reviewer observations not covered above"
          name="rvwAdditional"
          value={reviewerAssessment.rvwAdditional}
          onChange={onChange}
          readOnly={readOnly}
          rows={3}
        />
      </div>
    </div>
  );
}
