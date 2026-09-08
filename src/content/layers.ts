/**
 * FROM DATABASE TO PIXEL — the full stack as one system.
 * Technologies are drawn from the résumé skill set, connected naturally.
 */

export type Layer = {
  id: string;
  numeral: string;
  label: string;
  meaning: string;
  tech: string;
};

export const LAYERS: Layer[] = [
  {
    id: "user",
    numeral: "01",
    label: "USER",
    meaning:
      "Everything begins with a person trying to get something done — not with a framework choice.",
    tech: "Accessibility · Responsive UI",
  },
  {
    id: "interface",
    numeral: "02",
    label: "INTERFACE",
    meaning:
      "The surface must be honest: fast feedback, visible states, no lies about what the system is doing.",
    tech: "React · TypeScript · Tailwind",
  },
  {
    id: "state",
    numeral: "03",
    label: "APPLICATION STATE",
    meaning:
      "State is a promise about truth. Keeping it small and derived beats keeping it everywhere.",
    tech: "React state · Server state",
  },
  {
    id: "api",
    numeral: "04",
    label: "API",
    meaning:
      "The contract. Versioned, validated, documented — the place where product intent becomes enforceable.",
    tech: "REST · FastAPI · Webhooks",
  },
  {
    id: "service",
    numeral: "05",
    label: "SERVICE",
    meaning:
      "Domain logic lives here, independent of transport — testable without a UI and without a database.",
    tech: "Java · Spring Boot · Python · Microservices",
  },
  {
    id: "event",
    numeral: "06",
    label: "EVENT",
    meaning:
      "When something meaningful happens, it is announced. Consumers react without coupling.",
    tech: "Kafka · Event-driven architecture",
  },
  {
    id: "cache",
    numeral: "07",
    label: "CACHE",
    meaning:
      "Latency is a feature. The cache is where the measurement of hot paths becomes visible money.",
    tech: "Redis",
  },
  {
    id: "database",
    numeral: "08",
    label: "DATABASE",
    meaning:
      "Schema as worldview: constraints, indexes and audit history encode what the business can trust.",
    tech: "PostgreSQL · MS SQL · DynamoDB",
  },
  {
    id: "infra",
    numeral: "09",
    label: "INFRASTRUCTURE",
    meaning:
      "Environments are code. Provisioning, deploys and rollbacks are product operations, not chores.",
    tech: "AWS · ECS · Fargate · Terraform · Docker",
  },
  {
    id: "observability",
    numeral: "10",
    label: "OBSERVABILITY",
    meaning:
      "You cannot operate what you cannot see. Traces and SLOs turn incidents into instrumented learning.",
    tech: "AWS X-Ray · Honeycomb · SLOs",
  },
  {
    id: "intelligence",
    numeral: "11",
    label: "INTELLIGENCE",
    meaning:
      "The newest layer behaves like the others: measured, observable, and subordinate to the workflow it serves.",
    tech: "Claude · LangChain · Langfuse · RAG",
  },
];

export const LANDSCAPE = [
  {
    group: "AI",
    items: [
      "Anthropic Claude",
      "LangChain",
      "LLM orchestration",
      "RAG",
      "Multi-agent systems",
      "Langfuse",
      "Prompt engineering",
    ],
  },
  {
    group: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "Flask",
      "REST APIs",
      "Microservices",
      "Webhooks",
      "Kafka",
      "Event-driven architecture",
    ],
  },
  {
    group: "Cloud",
    items: [
      "AWS",
      "ECS",
      "Fargate",
      "Lambda",
      "RDS",
      "S3",
      "CloudFront",
      "Terraform",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MS SQL", "DynamoDB", "Redis"],
  },
  {
    group: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind", "Responsive UI", "Accessible UI"],
  },
  {
    group: "Reliability & Security",
    items: [
      "OAuth2",
      "OIDC",
      "SAML",
      "JWT",
      "Okta",
      "Cognito",
      "RBAC",
      "Jest",
      "pytest",
      "Testcontainers",
      "AWS X-Ray",
      "Honeycomb",
      "SLOs",
      "SLIs",
    ],
  },
];
