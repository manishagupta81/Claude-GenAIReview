'use strict';

/**
 * The 38 standard risks organized by category for the GenAI Review process.
 */
const RISK_CATEGORIES = [
  {
    id: 'model_operational',
    name: 'Model & Operational Risk',
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
    name: 'Security & Data Risk',
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
    name: 'Strategic & Reputational Risk',
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
    name: 'Ethical & Societal Risk',
    risks: [
      { id: 'privacyInfringement', label: 'Privacy Infringement' },
      { id: 'properUseMaterials', label: 'Proper Use of Research & Vendor Materials' },
    ],
  },
  {
    id: 'legal_regulatory',
    name: 'Legal & Regulatory Risk',
    risks: [
      { id: 'ipOwnership', label: 'IP — Ownership of Content' },
      { id: 'ipThirdParty', label: 'IP — Third Party Claims' },
      { id: 'contractualLimits', label: 'Contractual Use Limitations' },
      { id: 'noWarranties', label: 'No Guarantees or Warranties' },
      { id: 'indemnification', label: 'Indemnification' },
      { id: 'regCompliance', label: 'Regulatory & Compliance' },
    ],
  },
];

module.exports = { RISK_CATEGORIES };
