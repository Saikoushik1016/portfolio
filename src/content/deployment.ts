/**
 * SYSTEM 01 — AI DEPLOYMENT INTELLIGENCE
 * Demo/simulated values are explicitly marked DEMO DATA.
 * Production facts are sourced from the résumé only.
 */

export type PipelineStage = {
  id: string;
  label: string;
  detail: string;
  /** Simulated output shown when the stage completes — DEMO DATA */
  output: string;
};

export const PIPELINE: PipelineStage[] = [
  {
    id: "pr",
    label: "Pull Request",
    detail: "Webhook receives the change set and acknowledges in low latency.",
    output: "PR #184 · terraform · +842/−219 · 3 services",
  },
  {
    id: "code",
    label: "Code Change Analysis",
    detail: "Diff parsed into modular components: resources touched, callers, configs.",
    output: "ecs task def · rds param group · 2 lambdas",
  },
  {
    id: "infra",
    label: "Infrastructure Analysis",
    detail: "Terraform plan mapped against live topology and dependency graph.",
    output: "12 resources · 3 dependency chains",
  },
  {
    id: "blast",
    label: "Blast Radius",
    detail: "Downstream services resolved from the service catalog.",
    output: "payments-api · ledger-svc · recon-worker",
  },
  {
    id: "incident",
    label: "Incident Context",
    detail: "Correlated with recent incident history and rollback records.",
    output: "2 related incidents in last 90 days",
  },
  {
    id: "reasoning",
    label: "AI Reasoning",
    detail: "Claude reasons over assembled evidence with structured prompts.",
    output: "chain-of-analysis · 5 considerations",
  },
  {
    id: "risk",
    label: "Risk Score",
    detail: "Weighted scoring across blast radius, incident history and change type.",
    output: "72 / 100",
  },
  {
    id: "rollout",
    label: "Rollout Recommendation",
    detail: "Graduated rollout plan with automated guardrails.",
    output: "canary 10% → 50% → 100%",
  },
];

export const PR_DEMO = {
  id: "PR #184",
  branch: "terraform",
  additions: 842,
  deletions: 219,
  services: 3,
  author: "deployment-bot",
};

export const RISK_DEMO = {
  score: 72,
  band: "ELEVATED",
  factors: [
    { label: "Blast radius", weight: "HIGH", value: "3 services affected" },
    { label: "Change type", weight: "MEDIUM", value: "Infrastructure as code" },
    { label: "Incident history", weight: "MEDIUM", value: "2 related incidents" },
    { label: "Test coverage", weight: "LOW", value: "Guardrails present" },
  ],
  recommendation: "Deploy behind canary. Hold at 10% while reconciliation lag is observed. Auto-rollback if error budget burns faster than 2× baseline.",
};

export const STACK = [
  "Python",
  "FastAPI",
  "Anthropic Claude",
  "LangChain",
  "Langfuse",
  "GitHub API",
  "GitHub Actions",
  "Docker",
];

/** Production impact — résumé facts, not demo. */
export const IMPACT = [
  "Automated deployment review preparation across engineering teams.",
  "Modular analysis components composed into a single risk pipeline.",
  "AI validation agreement of 85%+ with senior reviewer judgement.",
  "Secure GitHub webhooks with low-latency acknowledgement.",
  "Deployment analysis workflow compressed from 15 minutes to under 30 seconds.",
];
