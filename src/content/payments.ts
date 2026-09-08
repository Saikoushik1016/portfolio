/**
 * SYSTEM 02 — PAYMENTS
 * Demo transaction values are explicitly marked DEMO DATA.
 * Scale, latency and workflow numbers are sourced from the résumé.
 */

export type JourneyStep = {
  id: string;
  label: string;
  /** Shown when the transaction reaches this stage — DEMO DATA */
  event: string;
  note: string;
};

export const JOURNEY: JourneyStep[] = [
  {
    id: "client",
    label: "CLIENT",
    event: "POST /payments",
    note: "A payment request enters through the public API surface.",
  },
  {
    id: "api",
    label: "API",
    event: "201 · validated",
    note: "Schema and business validation at the edge — reject early, log everything.",
  },
  {
    id: "service",
    label: "PAYMENT SERVICE",
    event: "published",
    note: "Domain logic executes; the payment becomes an immutable event.",
  },
  {
    id: "bus",
    label: "EVENT BUS",
    event: "event.accepted",
    note: "Kafka distributes the event — consumers react independently, nothing blocks.",
  },
  {
    id: "recon",
    label: "RECONCILIATION",
    event: "reconciled",
    note: "Ledger positions verified against source systems across the record set.",
  },
  {
    id: "settle",
    label: "SETTLEMENT",
    event: "settled",
    note: "Final position committed; downstream reporting can proceed.",
  },
  {
    id: "db",
    label: "DATABASE",
    event: "committed",
    note: "State persisted with audit history — every mutation is traceable.",
  },
];

export const TXN_DEMO = {
  id: "TXN 8A03D9",
  amount: "$1,284.00",
  statusFlow: [
    "received",
    "validated",
    "published",
    "processed",
    "reconciled",
    "settled",
  ],
};

/** Optimization Room — résumé-sourced transformations. */
export const TRANSFORMATIONS = [
  {
    id: "p95",
    before: "420 ms",
    after: "302 ms",
    label: "p95 latency",
    how: "Redis caching layer, query-plan rework, payload slimming across hot endpoints.",
  },
  {
    id: "query",
    before: "2.8 sec",
    after: "1.2 sec",
    label: "query performance",
    how: "Index strategy and access-path changes on the heaviest operational queries.",
  },
  {
    id: "provision",
    before: "4 hours",
    after: "18 minutes",
    label: "infrastructure provisioning",
    how: "Terraform codified environments; ECS/Fargate replaced manual console work.",
  },
  {
    id: "rollback",
    before: "rollback",
    after: "under 6 min",
    label: "incident recovery",
    how: "Blue/green ECS deploys with health-gated traffic shifting made recovery routine.",
  },
];
