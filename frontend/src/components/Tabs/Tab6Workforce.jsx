import React from 'react';
import { useForm } from '../../hooks/useForm';
import RadioGroup from '../FormFields/RadioGroup';
import TextAreaField from '../FormFields/TextAreaField';

export default function Tab6Workforce({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header">
        <h2>Section 4 &mdash; Workforce Impact</h2>
        <div className="panel-subtitle">All Submissions</div>
      </div>
      <div className="panel-body">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Answer each question below to the best of your knowledge. Select <strong>"Not known"</strong> if you are unsure.
        </p>

        <RadioGroup label="1. Will this tool replace, reduce, or significantly change any existing job functions?" name="wfReplace" value={formData.wfReplace} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — some tasks or roles will be affected' },
            { value: 'no', label: 'No — the tool augments existing work without displacement' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="2. Has a workforce impact assessment been conducted?" name="wfAssessment" value={formData.wfAssessment} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — completed' },
            { value: 'inProgress', label: 'In progress' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="3. Has HR been consulted regarding potential workforce implications?" name="wfHR" value={formData.wfHR} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'na', label: 'Not applicable — no workforce impact expected' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="4. Will users receive AI literacy or usage training before deployment?" name="wfTraining" value={formData.wfTraining} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — training is planned or already delivered' },
            { value: 'no', label: 'No — no training planned' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="5. Is there a risk of skill atrophy from over-reliance on the AI?" name="wfSkillAtrophy" value={formData.wfSkillAtrophy} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — there is a risk' },
            { value: 'no', label: "No — the tool supports but doesn't replace critical thinking" },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="6. Is there a clear accountability structure for reviewing AI-generated outputs?" name="wfAccountability" value={formData.wfAccountability} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — roles and responsibilities are documented' },
            { value: 'no', label: 'No — not yet defined' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="7. Could clients or external stakeholders have concerns about AI being used?" name="wfClientConcerns" value={formData.wfClientConcerns} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — client sensitivity is expected' },
            { value: 'no', label: 'No — clients are unlikely to be concerned' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <RadioGroup label="8. Is there an escalation path if the tool produces incorrect or harmful outputs?" name="wfEscalation" value={formData.wfEscalation} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — escalation process is documented' },
            { value: 'no', label: 'No — not yet defined' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />
        <TextAreaField label="Additional workforce comments or concerns (optional)" name="wfComments" value={formData.wfComments} onChange={onChange} readOnly={readOnly} placeholder="Any additional context for the review team..." />
      </div>
    </div>
  );
}
