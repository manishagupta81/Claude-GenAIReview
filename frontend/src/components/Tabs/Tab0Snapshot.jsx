import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';
import DateField from '../FormFields/DateField';

export default function Tab0Snapshot({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header">
        <h2>Section 0 &mdash; Request Snapshot</h2>
        <div className="panel-subtitle">All Submissions</div>
      </div>
      <div className="panel-body">
        <RadioGroup
          label="Solution Type"
          name="solutionType"
          value={formData.solutionType}
          onChange={onChange}
          required
          readOnly={readOnly}
          options={[
            { value: 'optionA', label: 'Option A: Custom GPT / Custom In-House GenAI Application' },
            { value: 'optionB', label: 'Option B: Vendor Tool (External SaaS / Third-Party AI Platform)' },
          ]}
        />

        <RadioGroup
          label="Request Type"
          name="requestType"
          value={formData.requestType}
          onChange={onChange}
          required
          readOnly={readOnly}
          options={[
            { value: 'poc', label: 'Proof of Concept (POC) — Limited feasibility testing. Public data only.' },
            { value: 'pilot', label: 'Pilot — Controlled deployment with limited users and/or approved data classes.' },
            { value: 'implementation', label: 'Implementation — Full production deployment.' },
            { value: 'newUseCase', label: 'New Use Case / Material Change — Expansion in workflow, users, data classes, model, or features.' },
          ]}
        />

        <TextAreaField label="What will change in the next phase (if applicable)?" name="nextPhaseChange" value={formData.nextPhaseChange} onChange={onChange} readOnly={readOnly} />

        <div className="row">
          <TextField label="Project Name" name="projectName" value={formData.projectName} onChange={onChange} required readOnly={readOnly} />
          <TextField label="Business Unit" name="businessUnit" value={formData.businessUnit} onChange={onChange} required readOnly={readOnly} />
        </div>
        <div className="row">
          <TextField label="Business Sponsor" name="businessSponsor" value={formData.businessSponsor} onChange={onChange} required readOnly={readOnly} />
          <TextField label="Executive Sponsor" name="executiveSponsor" value={formData.executiveSponsor} onChange={onChange} required readOnly={readOnly} />
        </div>
        <div className="row">
          <TextField label="Business Owner (Accountable Executive)" name="businessOwner" value={formData.businessOwner} onChange={onChange} required readOnly={readOnly} />
          <TextField label="Technical Owner" name="technicalOwner" value={formData.technicalOwner} onChange={onChange} required readOnly={readOnly} />
        </div>
        <TextField label="Designated Admin(s)" name="designatedAdmins" value={formData.designatedAdmins} onChange={onChange} readOnly={readOnly} />
        <div className="row">
          <DateField label="Submission Date" name="submissionDate" value={formData.submissionDate} onChange={onChange} required readOnly={readOnly} />
          <DateField label="Target Go-Live Date" name="goLiveDate" value={formData.goLiveDate} onChange={onChange} readOnly={readOnly} />
        </div>
        <div className="row">
          <TextField label="Pilot Duration (if applicable)" name="pilotDuration" value={formData.pilotDuration} onChange={onChange} readOnly={readOnly} placeholder="e.g., 90 days" />
          <DateField label="Renewal / Review Date" name="renewalDate" value={formData.renewalDate} onChange={onChange} readOnly={readOnly} />
        </div>
        <TextAreaField label="Explicitly Out of Scope for This Request" name="outOfScope" value={formData.outOfScope} onChange={onChange} readOnly={readOnly} />

        <CheckboxGroup
          label="Business Objective"
          name="bizObj"
          value={formData.bizObj}
          onChange={onChange}
          required
          readOnly={readOnly}
          options={[
            { value: 'revenue', label: 'Revenue generation' },
            { value: 'cost', label: 'Cost reduction' },
            { value: 'risk', label: 'Risk mitigation' },
            { value: 'clientExp', label: 'Client experience' },
            { value: 'advisorExp', label: 'Advisor experience' },
            { value: 'productivity', label: 'Productivity' },
            { value: 'regulatory', label: 'Regulatory / compliance support' },
          ]}
        />
      </div>
    </div>
  );
}
