/**
 * CHAPTERS — employment history sourced from the résumé. No fabrication.
 * Roles, dates, stacks and metrics follow the résumé exactly.
 */

export type Chapter = {
  numeral: string;
  company: string;
  role: string;
  period: string;
  focus: string;
  mission: string;
  systems: string[];
  scale: string;
  impact: string[];
  tech: string[];
};

export const CHAPTERS: Chapter[] = [
  {
    numeral: "I",
    company: "Chicago Public Schools",
    role: "Research AI Engineer",
    period: "Aug 2025 — Present",
    focus: "AI-powered developer tooling and deployment intelligence.",
    mission:
      "Give engineering teams an accurate read on deployment risk before code ships — turn review preparation from a manual ritual into an automated, observable pipeline targeting Change Failure Rate, a core DORA metric.",
    systems: [
      "ChangeGuard AI — FastAPI multi-agent risk system",
      "Production GitHub webhook service (300+ events)",
      "LLM orchestration pipeline — 5 specialized agents",
      "LLM tracing and quality monitoring with Langfuse",
    ],
    scale: "100+ real GitHub pull requests analyzed · 300+ webhook events handled · 25-case ground-truth evaluation suite.",
    impact: [
      "Deployment risk assessment: 15 min → under 30 sec",
      "85%+ agreement with ground truth across the evaluation suite",
      "Structured risk assessments returned under 200ms",
      "HMAC-SHA256 webhook security with constant-time validation",
    ],
    tech: ["Python", "FastAPI", "Anthropic Claude", "LangChain", "Langfuse", "Pydantic", "pytest", "Docker", "GitHub API", "GitHub Actions"],
  },
  {
    numeral: "II",
    company: "Thomson Reuters",
    role: "Full Stack Engineer",
    period: "Aug 2021 — Jul 2024",
    focus: "Distributed payment infrastructure supporting a multiyear FedEx engagement.",
    mission:
      "Keep money moving correctly at scale — full-stack payment features and event-driven Java/Spring Boot services on AWS for one of the company's largest enterprise engagements, with Okta SSO for 10K enterprise users.",
    systems: [
      "Event-driven payment services (Kafka, ECS Fargate)",
      "Responsive React SPA frontend for FedEx workflows",
      "Multi-AZ AWS infrastructure as code (Terraform)",
      "CI/CD with blue-green deployments and sub-6-minute rollbacks",
    ],
    scale: "10K+ daily transactions across 4 microservices · 500K+ monthly transactions · 120M+ transaction records · 10K Okta SSO users.",
    impact: [
      "p95 latency: 420ms → 302ms (28% cut)",
      "Query performance on 70M records: 2.8s → 1.2s (2.3×)",
      "Infrastructure provisioning: 4 hrs → 18 min",
      "Reconciliation workflows accelerated by 40%",
      "85% test coverage; pipeline time cut 40%",
    ],
    tech: ["Java", "Spring Boot", "React", "TypeScript", "Kafka", "Redis", "MS SQL", "AWS ECS/Fargate/Lambda/RDS/S3", "Terraform", "Docker", "Okta SAML 2.0"],
  },
];

export const PHILOSOPHY = [
  {
    numeral: "I",
    principle: "Complexity belongs inside the system, not in the user's experience.",
  },
  { numeral: "II", principle: "Measure before optimizing." },
  {
    numeral: "III",
    principle: "AI should improve a workflow, not merely appear inside it.",
  },
  { numeral: "IV", principle: "Infrastructure is part of the product." },
  { numeral: "V", principle: "Observability is an engineering feature." },
  {
    numeral: "VI",
    principle: "Ownership means following a feature beyond the merge button.",
  },
];

export const EXPLORING = [
  "Agentic systems",
  "AI observability",
  "Developer tooling",
  "Reliable LLM applications",
  "Distributed systems",
  "Backend architecture",
  "Product engineering",
];
