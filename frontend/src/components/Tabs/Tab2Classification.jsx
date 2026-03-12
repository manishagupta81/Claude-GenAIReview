import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';

export default function Tab2Classification({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header">
        <h2>Section 2 &mdash; AI System Classification</h2>
        <div className="panel-subtitle">All Submissions</div>
      </div>
      <div className="panel-body">
        <CheckboxGroup
          label="AI Type"
          name="aiType"
          value={formData.aiType}
          onChange={onChange}
          readOnly={readOnly}
          options={[
            { value: 'traditionalML', label: 'Traditional ML' },
            { value: 'genAI', label: 'Generative AI (LLM)' },
            { value: 'rag', label: 'RAG-based' },
            { value: 'agentic', label: 'Agentic / Autonomous' },
            { value: 'hybrid', label: 'Hybrid' },
          ]}
        />

        <div className="row">
          <TextField label="Foundation model (if known)" name="foundationModel" value={formData.foundationModel} onChange={onChange} readOnly={readOnly} />
          <TextField label="Model version" name="modelVersion" value={formData.modelVersion} onChange={onChange} readOnly={readOnly} />
        </div>

        <CheckboxGroup
          label="Role in AI Value Chain"
          name="valueChain"
          value={formData.valueChain}
          onChange={onChange}
          readOnly={readOnly}
          options={[
            { value: 'provider', label: 'Provider (we build)' },
            { value: 'deployer', label: 'Deployer (vendor)' },
            { value: 'both', label: 'Both' },
          ]}
        />

        <RadioGroup
          label="Initial Risk Tier (Self-Assessment)"
          name="riskTier"
          value={formData.riskTier}
          onChange={onChange}
          required
          readOnly={readOnly}
          options={[
            { value: 'low', label: 'Low (internal only)' },
            { value: 'moderate', label: 'Moderate (client interaction with human review)' },
            { value: 'high', label: 'High (material financial or HR decisioning)' },
            { value: 'regulatory', label: 'Regulatory-sensitive domain (AML/KYC, capital, compliance, conduct)' },
          ]}
        />

        <CheckboxGroup
          label="Additional Risk Characteristics"
          name="riskChar"
          value={formData.riskChar}
          onChange={onChange}
          readOnly={readOnly}
          options={[
            { value: 'profiling', label: 'Profiling individuals' },
            { value: 'automated', label: 'Automated decision-making' },
            { value: 'sensitiveData', label: 'Sensitive data processing' },
            { value: 'advisory', label: 'Customer advisory outputs' },
          ]}
        />
      </div>
    </div>
  );
}
