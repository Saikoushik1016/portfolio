/**
 * ENGINEERING PROOF — numbers sourced exclusively from the résumé.
 * No invented metrics. `from` marks the documented before-state.
 */
export type MetricScale = "hero" | "feature" | "annotation";

export type Metric = {
  id: string;
  value: string;
  from?: string;
  unit?: string;
  label: string;
  context: string;
  scale: MetricScale;
};

export const METRICS: Metric[] = [
  {
    id: "p95-latency",
    value: "302ms",
    from: "420ms",
    label: "p95 latency",
    context:
      "CompletableFuture async processing, HikariCP pool tuning (50 → 150) and batch operations that cut DB round-trips 55%.",
    scale: "hero",
  },
  {
    id: "dataset",
    value: "120M+",
    unit: "records",
    label: "record dataset",
    context:
      "Reconciliation and analytics workloads processed against a nine-figure record dataset.",
    scale: "feature",
  },
  {
    id: "monthly-records",
    value: "500K+",
    unit: "records",
    label: "monthly transactions",
    context:
      "Reliable settlement sustained across 500K+ monthly transactions in production.",
    scale: "feature",
  },
  {
    id: "daily-tx",
    value: "10K+",
    unit: "txn/day",
    label: "daily transactions",
    context:
      "Transaction volume sustained by the event-driven payment backbone in production.",
    scale: "annotation",
  },
  {
    id: "query-perf",
    value: "1.2s",
    from: "2.8s",
    label: "query performance",
    context:
      "Heavy operational queries reworked — indexes, batching and access-path changes.",
    scale: "annotation",
  },
  {
    id: "provisioning",
    value: "18 min",
    from: "4 hrs",
    label: "infrastructure provisioning",
    context:
      "Terraform-automated AWS environments replaced manual console provisioning.",
    scale: "annotation",
  },
  {
    id: "deploy-analysis",
    value: "<30 sec",
    from: "15 min",
    label: "deployment analysis workflow",
    context:
      "AI-assisted PR risk analysis compressed the review-preparation workflow.",
    scale: "annotation",
  },
  {
    id: "ai-agreement",
    value: "85%+",
    label: "AI validation agreement",
    context:
      "Ground-truth agreement across a 25-case evaluation suite, with full Langfuse tracing and quality monitoring.",
    scale: "annotation",
  },
];
