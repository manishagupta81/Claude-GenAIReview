import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';

export default function Tab7Regulatory({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header">
        <h2>Section 5 &mdash; Regulatory Mapping</h2>
        <div className="panel-subtitle">All Submissions</div>
      </div>
      <div className="panel-body">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Answer each question below to the best of your knowledge. Select <strong>"Not known"</strong> if you are unsure.
        </p>

        <TextAreaField label="1. Which jurisdictions or regions will this tool operate in or impact?" name="jurisdictions" value={formData.jurisdictions} onChange={onChange} readOnly={readOnly} placeholder="e.g., US, EU, UK, APAC, Global..." />

        <RadioGroup label="2. Will the tool process any personal data or PII?" name="regPII" value={formData.regPII} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <CheckboxGroup label="3. If personal data is processed, what types of PII may be involved?" name="piiTypes" value={formData.piiTypes} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'names', label: 'Names / contact info' },
            { value: 'financial', label: 'Financial / account data' },
            { value: 'health', label: 'Health / medical data' },
            { value: 'identity', label: 'Government IDs / SSN' },
            { value: 'behavioral', label: 'Behavioral / usage data' },
            { value: 'none', label: 'None / not applicable' },
          ]}
        />

        <RadioGroup label="4. Has the EU AI Act been considered for this tool's classification?" name="regEUAI" value={formData.regEUAI} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — assessed and classification determined' },
            { value: 'no', label: 'No — not yet assessed' },
            { value: 'na', label: 'Not applicable — no EU exposure' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="5. Is GDPR or equivalent data protection regulation applicable?" name="regGDPR" value={formData.regGDPR} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — GDPR or local data protection laws apply' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="6. Has a Data Protection Impact Assessment (DPIA) been conducted?" name="regDPIA" value={formData.regDPIA} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'completed', label: 'Yes — DPIA completed' },
            { value: 'inProgress', label: 'In progress' },
            { value: 'notRequired', label: 'Not required' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="7. Are there industry-specific regulations that apply?" name="regIndustry" value={formData.regIndustry} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="8. Will data be transferred across borders?" name="regCrossBorder" value={formData.regCrossBorder} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — cross-border data transfer is expected' },
            { value: 'no', label: 'No — data stays within one jurisdiction' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="9. Are there data residency requirements?" name="regResidency" value={formData.regResidency} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — specific residency requirements exist' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <RadioGroup label="10. Could this tool be classified as high-risk under any AI regulation?" name="regHighRisk" value={formData.regHighRisk} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'yes', label: 'Yes — high-risk classification likely' },
            { value: 'no', label: 'No' },
            { value: 'notKnown', label: 'Not known' },
          ]}
        />

        <TextAreaField label="If high-risk classification is triggered, please specify" name="highRiskDetails" value={formData.highRiskDetails} onChange={onChange} readOnly={readOnly} placeholder="e.g., which regulation, classification category..." />
        <TextAreaField label="Additional regulatory comments or concerns (optional)" name="regComments" value={formData.regComments} onChange={onChange} readOnly={readOnly} placeholder="Any additional context for the review team..." />
      </div>
    </div>
  );
}
