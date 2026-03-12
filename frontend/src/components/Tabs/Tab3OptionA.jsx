import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';

export default function Tab3OptionA({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header panel-header-green">
        <h2>Option A &mdash; Custom GPT / Custom In-House Application</h2>
        <div className="panel-subtitle">Complete if Option A selected in Section 0</div>
      </div>
      <div className="panel-body panel-body-green">
        {/* A1 */}
        <div className="subsection-title">A1. Model &amp; Architecture</div>
        <CheckboxGroup name="a1ModelType" label="Model type" value={formData.a1ModelType} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'openSource', label: 'Open-source' },
            { value: 'proprietary', label: 'Proprietary API (OpenAI, Anthropic, etc.)' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <CheckboxGroup name="a1AccessMode" label="Access mode" value={formData.a1AccessMode} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'chatUI', label: 'Chat UI' },
            { value: 'api', label: 'API' },
            { value: 'embedded', label: 'Embedded' },
            { value: 'rag', label: 'RAG implemented' },
            { value: 'agentic', label: 'Agentic orchestration' },
          ]}
        />
        <RadioGroup name="a1FineTuned" label="Fine-tuned?" value={formData.a1FineTuned} onChange={onChange} readOnly={readOnly} inline
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
        <TextAreaField label="Training data source" name="a1TrainingData" value={formData.a1TrainingData} onChange={onChange} readOnly={readOnly} />
        <RadioGroup name="a1DataLeave" label="Does data leave firm-controlled environment?" value={formData.a1DataLeave} onChange={onChange} readOnly={readOnly} inline
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
        <TextAreaField label="If yes, describe safeguards" name="a1DataSafeguards" value={formData.a1DataSafeguards} onChange={onChange} readOnly={readOnly} />
        <CheckboxGroup name="a1Integrations" label="Integrations used" value={formData.a1Integrations} onChange={onChange} readOnly={readOnly}
          options={[
            { value: 'apis', label: 'APIs' },
            { value: 'rpa', label: 'RPA' },
            { value: 'plugins', label: 'Plugins' },
            { value: 'connectors', label: 'Connectors' },
          ]}
        />
        <TextAreaField label="Data flow and authentication summary" name="a1DataFlow" value={formData.a1DataFlow} onChange={onChange} readOnly={readOnly} />

        {/* A2 */}
        <div className="subsection">
          <div className="subsection-title">A2. Knowledge &amp; Data Governance</div>
          <CheckboxGroup name="a2KnowledgeSrc" label="Knowledge sources" value={formData.a2KnowledgeSrc} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'files', label: 'Files' },
              { value: 'links', label: 'Links' },
              { value: 'connectors', label: 'Connectors' },
              { value: 'databases', label: 'Databases' },
              { value: 'apis', label: 'APIs' },
            ]}
          />
          <CheckboxGroup name="a2DataType" label="Data types in prompts/uploads" value={formData.a2DataType} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'public', label: 'Public' },
              { value: 'proprietary', label: 'Proprietary' },
              { value: 'clientConf', label: 'Client confidential' },
              { value: 'employeeConf', label: 'Employee confidential' },
            ]}
          />
          <TextAreaField label="Examples" name="a2DataExamples" value={formData.a2DataExamples} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="a2DataOutside" label="Is any data sent outside firm controls?" value={formData.a2DataOutside} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="DLP / guardrails" name="a2DLP" value={formData.a2DLP} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="a2Licensing" label="External-origin content licensing confirmed?" value={formData.a2Licensing} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="Where knowledge stored? Who has access?" name="a2KnowledgeAccess" value={formData.a2KnowledgeAccess} onChange={onChange} readOnly={readOnly} />
          <TextField label="Refresh frequency and approval owner" name="a2RefreshFreq" value={formData.a2RefreshFreq} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="a2PromptLog" label="Prompt logging enabled?" value={formData.a2PromptLog} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextField label="Retention period" name="a2Retention" value={formData.a2Retention} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="a2Governance" value={formData.a2Governance} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'dpia', label: 'DPIA completed' },
              { value: 'minimization', label: 'Data minimization applied' },
              { value: 'accessControls', label: 'Access controls enforced' },
              { value: 'retentionDefined', label: 'Data retention defined' },
            ]}
          />
        </div>

        {/* A3 */}
        <div className="subsection">
          <div className="subsection-title">A3. Accuracy, Validation &amp; Safety</div>
          <CheckboxGroup name="a3Testing" label="Testing performed" value={formData.a3Testing} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'functional', label: 'Functional' },
              { value: 'hallucination', label: 'Hallucination' },
              { value: 'adversarial', label: 'Adversarial' },
              { value: 'bias', label: 'Bias' },
              { value: 'mrm', label: 'MRM validation' },
            ]}
          />
          <TextAreaField label="How accuracy measured" name="a3AccuracyMeasure" value={formData.a3AccuracyMeasure} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Observed failure modes" name="a3FailureModes" value={formData.a3FailureModes} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="a3HallucinationCtrl" label="Hallucination controls" value={formData.a3HallucinationCtrl} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'citations', label: 'Citations' },
              { value: 'internalDocs', label: 'Links to internal docs' },
              { value: 'manualVerify', label: 'Manual verification' },
            ]}
          />
          <TextAreaField label="Refusal conditions" name="a3Refusal" value={formData.a3Refusal} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Data exfiltration controls" name="a3Exfiltration" value={formData.a3Exfiltration} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Incident tracking & escalation" name="a3Incident" value={formData.a3Incident} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="a3Monitoring" label="Ongoing monitoring" value={formData.a3Monitoring} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'drift', label: 'Drift' },
              { value: 'kpis', label: 'KPIs' },
              { value: 'logging', label: 'Logging' },
              { value: 'escalation', label: 'Incident escalation' },
            ]}
          />
        </div>

        {/* A4 */}
        <div className="subsection">
          <div className="subsection-title">A4. Security &amp; Ethics</div>
          <CheckboxGroup name="a4Security" value={formData.a4Security} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'promptInjection', label: 'Prompt injection testing' },
              { value: 'outputFiltering', label: 'Output filtering' },
              { value: 'cyberReview', label: 'Cybersecurity review' },
              { value: 'killSwitch', label: 'Kill switch' },
            ]}
          />
          <CheckboxGroup name="a4Domains" label="Sensitive domains involved" value={formData.a4Domains} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'credit', label: 'Credit' },
              { value: 'pricing', label: 'Pricing' },
              { value: 'underwriting', label: 'Underwriting' },
              { value: 'amlkyc', label: 'AML/KYC' },
              { value: 'hr', label: 'HR' },
              { value: 'profiling', label: 'Profiling' },
            ]}
          />
          <div className="row">
            <RadioGroup name="a4BiasTesting" label="Bias testing completed?" value={formData.a4BiasTesting} onChange={onChange} readOnly={readOnly} inline
              options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            />
            <RadioGroup name="a4EthicsReview" label="Ethics Council review required?" value={formData.a4EthicsReview} onChange={onChange} readOnly={readOnly} inline
              options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            />
          </div>
        </div>

        {/* A5 */}
        <div className="subsection">
          <div className="subsection-title">A5. Deployment &amp; Operations</div>
          <TextAreaField label="Owner responsibilities" name="a5OwnerResp" value={formData.a5OwnerResp} onChange={onChange} readOnly={readOnly} />
          <TextField label="Review frequency" name="a5ReviewFreq" value={formData.a5ReviewFreq} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="a5ChangeTriggers" label="Change triggers for re-review" value={formData.a5ChangeTriggers} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'newData', label: 'New data' },
              { value: 'newUsers', label: 'New users' },
              { value: 'newWorkflow', label: 'New workflow' },
              { value: 'modelChange', label: 'Model change' },
              { value: 'featureChange', label: 'Feature change' },
            ]}
          />
          <TextAreaField label="Decommissioning plan" name="a5Decommission" value={formData.a5Decommission} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Training & communications plan" name="a5Training" value={formData.a5Training} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Success metrics" name="a5SuccessMetrics" value={formData.a5SuccessMetrics} onChange={onChange} readOnly={readOnly} />
        </div>
      </div>
    </div>
  );
}
