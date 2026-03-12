import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';

export default function Tab1UseCase({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header">
        <h2>Section 1 &mdash; Use Case &amp; Workflow Clarity</h2>
        <div className="panel-subtitle">All Submissions</div>
      </div>
      <div className="panel-body">
        <div className="subsection-title">Describe End-to-End Workflow</div>
        <TextAreaField label="Trigger" name="wfTrigger" value={formData.wfTrigger} onChange={onChange} readOnly={readOnly} />
        <TextAreaField label="Inputs" name="wfInputs" value={formData.wfInputs} onChange={onChange} readOnly={readOnly} />
        <TextAreaField label="Processing" name="wfProcessing" value={formData.wfProcessing} onChange={onChange} readOnly={readOnly} />
        <TextAreaField label="Outputs" name="wfOutputs" value={formData.wfOutputs} onChange={onChange} readOnly={readOnly} />
        <TextAreaField label="Where outputs go next" name="wfOutputDest" value={formData.wfOutputDest} onChange={onChange} readOnly={readOnly} />

        <div className="subsection">
          <div className="subsection-title">Output Types Produced</div>
          <CheckboxGroup
            name="outputType"
            value={formData.outputType}
            onChange={onChange}
            readOnly={readOnly}
            options={[
              { value: 'text', label: 'Text' },
              { value: 'summary', label: 'Summary' },
              { value: 'extractedFields', label: 'Extracted fields' },
              { value: 'docDraft', label: 'Document draft' },
              { value: 'code', label: 'Code' },
              { value: 'image', label: 'Image' },
              { value: 'decision', label: 'Decision recommendation' },
              { value: 'other', label: 'Other' },
            ]}
          />
          {formData.outputType?.includes('other') && (
            <TextField name="outputTypeOther" value={formData.outputTypeOther} onChange={onChange} readOnly={readOnly} placeholder="Specify..." />
          )}
        </div>

        <div className="subsection">
          <div className="subsection-title">Users &amp; Access</div>
          <RadioGroup
            label="Who are the users?"
            name="userType"
            value={formData.userType}
            onChange={onChange}
            readOnly={readOnly}
            inline
            options={[
              { value: 'internal', label: 'Internal' },
              { value: 'external', label: 'External' },
              { value: 'both', label: 'Both' },
            ]}
          />
          <TextField label="Exact audience and estimated count" name="audienceCount" value={formData.audienceCount} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup
            label="Sharing method"
            name="sharingMethod"
            value={formData.sharingMethod}
            onChange={onChange}
            readOnly={readOnly}
            options={[
              { value: 'directShare', label: 'Direct share' },
              { value: 'intranet', label: 'Intranet link' },
              { value: 'embedded', label: 'Embedded in application' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <TextAreaField label="User add/remove process" name="userAddRemove" value={formData.userAddRemove} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Approval workflow for adding new user groups" name="userGroupApproval" value={formData.userGroupApproval} onChange={onChange} readOnly={readOnly} />
          <RadioGroup
            label="Do users already have permission to all surfaced datasets?"
            name="datasetPermission"
            value={formData.datasetPermission}
            onChange={onChange}
            readOnly={readOnly}
            inline
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
        </div>

        <div className="subsection">
          <div className="subsection-title">Decision Support &amp; Human Oversight</div>
          <CheckboxGroup
            label="Is output used for decision support in:"
            name="decisionSupport"
            value={formData.decisionSupport}
            onChange={onChange}
            readOnly={readOnly}
            options={[
              { value: 'investment', label: 'Investment' },
              { value: 'trading', label: 'Trading' },
              { value: 'suitability', label: 'Suitability' },
              { value: 'clientAdvice', label: 'Client advice' },
              { value: 'hr', label: 'HR' },
              { value: 'compliance', label: 'Compliance approval' },
              { value: 'amlkyc', label: 'AML/KYC' },
              { value: 'underwriting', label: 'Underwriting' },
              { value: 'otherRegulated', label: 'Other regulated decisions' },
              { value: 'productivity', label: 'Internal productivity only' },
            ]}
          />
          <TextAreaField label="Human-in-the-loop" name="humanInLoop" value={formData.humanInLoop} onChange={onChange} readOnly={readOnly} />
          <TextField label="Who reviews outputs?" name="outputReviewer" value={formData.outputReviewer} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="What must be validated?" name="validationReqs" value={formData.validationReqs} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Stop-use / escalate condition" name="stopUseCondition" value={formData.stopUseCondition} onChange={onChange} readOnly={readOnly} />
        </div>

        <div className="subsection">
          <div className="subsection-title">Output Reliance &amp; Disclosure</div>
          <RadioGroup
            label="Does the output include a disclaimer?"
            name="disclaimer"
            value={formData.disclaimer}
            onChange={onChange}
            readOnly={readOnly}
            options={[
              { value: 'systemEnforced', label: 'Yes — System-enforced disclaimer' },
              { value: 'policyBased', label: 'Yes — Policy-based requirement' },
              { value: 'no', label: 'No' },
            ]}
          />
          <TextAreaField label="If client or advisor-facing, specify required disclosure language" name="disclosureLanguage" value={formData.disclosureLanguage} onChange={onChange} readOnly={readOnly} />
          <TextField label="Client- or Advisor-facing or internal only?" name="facingType" value={formData.facingType} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Harm scenario" name="harmScenario" value={formData.harmScenario} onChange={onChange} readOnly={readOnly} />
          <RadioGroup
            label="Material impact if wrong"
            name="materialImpact"
            value={formData.materialImpact}
            onChange={onChange}
            readOnly={readOnly}
            inline
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
          <TextAreaField label="Worst-case outcome" name="worstCase" value={formData.worstCase} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Why GenAI vs traditional automation?" name="whyGenAI" value={formData.whyGenAI} onChange={onChange} readOnly={readOnly} />
        </div>
      </div>
    </div>
  );
}
