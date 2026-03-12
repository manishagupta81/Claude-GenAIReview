# GenAI Governance Review Form

A full-stack serverless application for managing GenAI governance review workflows. Built with React and AWS (Lambda, API Gateway, DynamoDB, Cognito).

## Architecture

```
React (Vite) on S3  →  API Gateway (REST)  →  Lambda (Node.js 20)  →  DynamoDB
                        Cognito Authorizer                              Single Table
```

### Workflow

```
DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED / CONDITIONAL / REJECTED / DEFERRED
                                                                         ↓
                                                                    → DRAFT (return)
```

### Three User Roles

| Role | Can Edit | Visible Tabs |
|------|----------|--------------|
| **Requester** | Tabs 0-7, 9 (in DRAFT) | Tabs 0-9 |
| **Reviewer** | Tab 8, 10 (in SUBMITTED/UNDER_REVIEW) | Tabs 0-10 |
| **Approver** | Tab 11 (in UNDER_REVIEW) | All 12 tabs |

## Project Structure

```
├── .github/workflows/
│   ├── deploy-backend.yml        # SAM build + deploy on push to backend/
│   ├── deploy-frontend.yml       # Vite build + S3 sync on push to frontend/
│   └── claude-code-review.yml    # Automated PR review with Claude
├── backend/
│   ├── template.yaml             # SAM template (DynamoDB, Cognito, API GW, Lambdas)
│   ├── package.json
│   ├── samconfig.toml
│   ├── scripts/
│   │   └── seed-cognito-users.sh # Create demo users
│   └── src/
│       ├── handlers/             # Lambda functions (CRUD + transitions)
│       ├── lib/                  # Shared libs (auth, DB, validation, state machine)
│       └── constants/            # Risk library definitions
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── auth/                 # Cognito auth (login, provider, protected routes)
│       ├── context/              # Form state (useReducer + auto-save)
│       ├── hooks/                # useAuth, useForm
│       ├── components/
│       │   ├── Layout/           # Header, TabBar, ProgressBar, TabNavFooter
│       │   ├── FormFields/       # Reusable inputs (Text, Radio, Checkbox, Select, Date)
│       │   ├── Tabs/             # All 12 tab components
│       │   └── Dashboard/        # Form list, cards, status badges
│       ├── pages/                # Dashboard + Form pages
│       ├── utils/                # API client, tab config
│       └── styles/               # CSS variables + global styles
└── README.md
```

## Form Tabs (12 Total)

| # | Tab | Owner | Content |
|---|-----|-------|---------|
| 0 | Request Snapshot | Requester | Project info, sponsors, dates, objectives |
| 1 | Use Case & Workflow | Requester | Workflow, outputs, users, decision support |
| 2 | AI Classification | Requester | AI type, risk tier, value chain role |
| 3 | Option A | Requester | Custom GPT / in-house app details |
| 4 | Option B | Requester | Vendor tool / SaaS platform details |
| 5 | Intellectual Property | Requester | IP ownership, infringement, licensing |
| 6 | Workforce Impact | Requester | Job displacement, training, accountability |
| 7 | Regulatory Mapping | Requester | Jurisdictions, PII, GDPR, EU AI Act |
| 8 | Risk Library | Reviewer | 38 risks across 5 categories with severity |
| 9 | Risk Declaration | Requester | Residual risk, attestation, submit action |
| 10 | Reviewer Assessment | Reviewer | Deep-dive review across all risk categories |
| 11 | Decision | Approver | Risk ratings, conditions, approve/reject |

## Setup

### Prerequisites

- Node.js 20+
- AWS CLI configured
- AWS SAM CLI
- GitHub CLI (`gh`)

### Backend Deployment

```bash
cd backend
npm ci
sam build
sam deploy --guided   # First time (creates stack)
```

After deployment, note the API Gateway URL and Cognito Pool ID from the outputs.

### Seed Demo Users

```bash
cd backend/scripts
chmod +x seed-cognito-users.sh
./seed-cognito-users.sh <USER_POOL_ID>
```

Demo accounts:
- **requester1** / `Requester1!` (role: requester)
- **reviewer1** / `Reviewer1!` (role: reviewer)
- **approver1** / `Approver1!` (role: approver)

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL, Cognito Pool ID, and Client ID
npm ci
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API Gateway endpoint URL |
| `VITE_COGNITO_USER_POOL_ID` | Cognito User Pool ID |
| `VITE_COGNITO_CLIENT_ID` | Cognito App Client ID |

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/forms` | Requester | Create new draft form |
| GET | `/forms` | All | List forms (filtered by role) |
| GET | `/forms/{formId}` | All | Get form details |
| PUT | `/forms/{formId}` | All | Update form fields (role-restricted) |
| POST | `/forms/{formId}/transition` | All | Change form status |

## DynamoDB Schema

Single table design with `GenAIReviewForms`:

- **PK**: `FORM#<formId>` / **SK**: `METADATA`
- **GSI1**: By user (`USER#<username>` / `<status>#<createdAt>`)
- **GSI2**: By status (`STATUS#<status>` / `<createdAt>`)

## CI/CD

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `VITE_API_URL` | API Gateway URL (for frontend build) |
| `VITE_COGNITO_USER_POOL_ID` | Cognito Pool ID (for frontend build) |
| `VITE_COGNITO_CLIENT_ID` | Cognito Client ID (for frontend build) |
| `FRONTEND_BUCKET` | S3 bucket name for frontend hosting |
| `ANTHROPIC_API_KEY` | For Claude Code Review on PRs |

### Automated Workflows

- **deploy-backend.yml**: Triggers on push to `backend/**` on main
- **deploy-frontend.yml**: Triggers on push to `frontend/**` on main
- **claude-code-review.yml**: Runs Claude Code Review on all PRs

## Tech Stack

- **Frontend**: React 18, Vite, React Router, amazon-cognito-identity-js
- **Backend**: AWS Lambda (Node.js 20), API Gateway REST, DynamoDB, Cognito
- **Infrastructure**: AWS SAM (CloudFormation)
- **CI/CD**: GitHub Actions
- **Code Review**: Claude Code Action (Anthropic)
