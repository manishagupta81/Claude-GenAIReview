import React from 'react';
import { useForm } from '../../hooks/useForm';
import TextField from '../FormFields/TextField';
import TextAreaField from '../FormFields/TextAreaField';
import RadioGroup from '../FormFields/RadioGroup';
import CheckboxGroup from '../FormFields/CheckboxGroup';

export default function Tab4OptionB({ readOnly }) {
  const { formData, updateField } = useForm();
  const onChange = (name, value) => updateField('formData', name, value);

  return (
    <div>
      <div className="panel-header panel-header-amber">
        <h2>Option B &mdash; Vendor Tool (External SaaS / Platform)</h2>
        <div className="panel-subtitle">Complete if Option B selected in Section 0</div>
      </div>
      <div className="panel-body panel-body-amber">
        {/* B1 */}
        <div className="subsection-title">B1. Vendor Overview</div>
        <div className="row">
          <TextField label="Vendor Name" name="b1VendorName" value={formData.b1VendorName} onChange={onChange} required readOnly={readOnly} />
          <TextField label="Product Name" name="b1ProductName" value={formData.b1ProductName} onChange={onChange} readOnly={readOnly} />
        </div>
        <TextField label="Feature Name" name="b1FeatureName" value={formData.b1FeatureName} onChange={onChange} readOnly={readOnly} />
        <div className="row">
          <RadioGroup name="b1VendorRel" label="Vendor relationship" value={formData.b1VendorRel} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'new', label: 'New vendor' }, { value: 'existing', label: 'Existing vendor' }]}
          />
          <RadioGroup name="b1AIEmbedded" label="AI embedded?" value={formData.b1AIEmbedded} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
        </div>
        <div className="row">
          <TextField label="Underlying model" name="b1UnderlyingModel" value={formData.b1UnderlyingModel} onChange={onChange} readOnly={readOnly} />
          <TextField label="Model version" name="b1ModelVersion" value={formData.b1ModelVersion} onChange={onChange} readOnly={readOnly} />
        </div>
        <TextField label="Access mode" name="b1AccessMode" value={formData.b1AccessMode} onChange={onChange} readOnly={readOnly} />
        <RadioGroup name="b1VendorTrains" label="Vendor trains on firm data?" value={formData.b1VendorTrains} onChange={onChange} readOnly={readOnly} inline
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'optedOut', label: 'Contractually opted out' }]}
        />
        <div className="row">
          <RadioGroup name="b1OptIn" label="Opt-in required per GenAI feature?" value={formData.b1OptIn} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <RadioGroup name="b1DefaultEnabled" label="GenAI features enabled by default?" value={formData.b1DefaultEnabled} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
        </div>
        <div className="row">
          <RadioGroup name="b1Sandbox" label="Sandbox available?" value={formData.b1Sandbox} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <RadioGroup name="b1ChangeNotify" label="Notification of major model/feature changes?" value={formData.b1ChangeNotify} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
        </div>
        <TextAreaField label="Process to assess new features before enablement" name="b1AssessProcess" value={formData.b1AssessProcess} onChange={onChange} readOnly={readOnly} />

        {/* B2 */}
        <div className="subsection">
          <div className="subsection-title">B2. Data &amp; AI Component Details</div>
          <TextAreaField label="Specific firm data used" name="b2FirmData" value={formData.b2FirmData} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="b2DataType" label="Prompt/upload data types" value={formData.b2DataType} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'public', label: 'Public' },
              { value: 'proprietary', label: 'Proprietary' },
              { value: 'clientConf', label: 'Client confidential' },
              { value: 'employeeConf', label: 'Employee confidential' },
            ]}
          />
          <RadioGroup name="b2ExternalLLM" label="Is data sent to external LLM provider?" value={formData.b2ExternalLLM} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="If yes, describe: data protection, retention, incident notification, audit rights" name="b2ExternalDetails" value={formData.b2ExternalDetails} onChange={onChange} readOnly={readOnly} rows={3} />
          <RadioGroup name="b2TrainingDisabled" label="Is training disabled contractually and technically?" value={formData.b2TrainingDisabled} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="Logical/physical data isolation" name="b2DataIsolation" value={formData.b2DataIsolation} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="b2CrossContam" label="Can other customers' data influence outputs?" value={formData.b2CrossContam} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <div className="sub-subsection-title">Retention Policy</div>
          <div className="retention-grid">
            <TextField label="Firm data" name="b2RetentionFirm" value={formData.b2RetentionFirm} onChange={onChange} readOnly={readOnly} />
            <TextField label="User inputs" name="b2RetentionInputs" value={formData.b2RetentionInputs} onChange={onChange} readOnly={readOnly} />
            <TextField label="Outputs" name="b2RetentionOutputs" value={formData.b2RetentionOutputs} onChange={onChange} readOnly={readOnly} />
          </div>
          <RadioGroup name="b2RetentionConfig" label="Retention configurable?" value={formData.b2RetentionConfig} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <RadioGroup name="b2CrossBorder" label="Cross-border assessment completed?" value={formData.b2CrossBorder} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="DLP and guardrails" name="b2DLP" value={formData.b2DLP} onChange={onChange} readOnly={readOnly} />
        </div>

        {/* B3 */}
        <div className="subsection">
          <div className="subsection-title">B3. Third-Party Risk &amp; Dependencies</div>
          <CheckboxGroup name="b3Risk" value={formData.b3Risk} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'govDocs', label: 'AI governance documentation reviewed' },
              { value: 'soc2', label: 'SOC 2 / ISO verified' },
              { value: 'audit', label: 'Right to audit included' },
              { value: 'subprocessors', label: 'Sub-processors disclosed' },
              { value: 'modelUpdate', label: 'Model update notification clause included' },
            ]}
          />
          <TextAreaField label="Nth-party dependencies" name="b3NthParty" value={formData.b3NthParty} onChange={onChange} readOnly={readOnly} />
        </div>

        {/* B4 */}
        <div className="subsection">
          <div className="subsection-title">B4. Accuracy, Safety &amp; Security</div>
          <TextAreaField label="POC/Pilot observations" name="b4POCObs" value={formData.b4POCObs} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Testing results & accuracy measurement" name="b4Testing" value={formData.b4Testing} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Failure modes observed" name="b4Failures" value={formData.b4Failures} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="b4HallucinationCtrl" label="Hallucination controls" value={formData.b4HallucinationCtrl} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'citations', label: 'Citations' },
              { value: 'internalLink', label: 'Internal linking' },
              { value: 'verifyReq', label: 'Verification required' },
            ]}
          />
          <TextAreaField label="Refusal and escalation conditions" name="b4Refusal" value={formData.b4Refusal} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="b4VendorProtection" label="Vendor protections against" value={formData.b4VendorProtection} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'promptInjection', label: 'Prompt injection' },
              { value: 'exfiltration', label: 'Data exfiltration' },
              { value: 'modelInversion', label: 'Model inversion' },
              { value: 'apiAbuse', label: 'API abuse' },
            ]}
          />
          <TextAreaField label="Logging (what, where, who has access)" name="b4Logging" value={formData.b4Logging} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="b4DriftMonitor" label="Monitoring for output drift?" value={formData.b4DriftMonitor} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <TextAreaField label="Incident readiness process" name="b4Incident" value={formData.b4Incident} onChange={onChange} readOnly={readOnly} />
          <RadioGroup name="b4FeatureScope" label="Feature enabled" value={formData.b4FeatureScope} onChange={onChange} readOnly={readOnly} inline
            options={[{ value: 'global', label: 'Global' }, { value: 'roleBased', label: 'Role-based' }]}
          />
        </div>

        {/* B5 */}
        <div className="subsection">
          <div className="subsection-title">B5. Deployment &amp; Ongoing Operations</div>
          <TextAreaField label="Operating model & ownership" name="b5OperatingModel" value={formData.b5OperatingModel} onChange={onChange} readOnly={readOnly} />
          <TextField label="Review frequency" name="b5ReviewFreq" value={formData.b5ReviewFreq} onChange={onChange} readOnly={readOnly} />
          <CheckboxGroup name="b5ChangeTriggers" label="Change triggers for re-review" value={formData.b5ChangeTriggers} onChange={onChange} readOnly={readOnly}
            options={[
              { value: 'newData', label: 'New data' },
              { value: 'newUsers', label: 'New users' },
              { value: 'newUseCase', label: 'New use case' },
              { value: 'vendorFeature', label: 'Vendor feature change' },
              { value: 'modelChange', label: 'Model change' },
            ]}
          />
          <TextAreaField label="Decommissioning plan" name="b5Decommission" value={formData.b5Decommission} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Training & communications plan" name="b5Training" value={formData.b5Training} onChange={onChange} readOnly={readOnly} />
          <TextAreaField label="Success metrics" name="b5SuccessMetrics" value={formData.b5SuccessMetrics} onChange={onChange} readOnly={readOnly} />
        </div>
      </div>
    </div>
  );
}
