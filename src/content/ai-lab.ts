/**
 * AI LAB — technical explorations, not professional accomplishments.
 * Each entry is labeled as an exploration per the design constitution.
 */

export type LabId = "agents" | "rag" | "observability" | "hitl";

export type LabItem = {
  id: LabId;
  numeral: string;
  title: string;
  question: string;
  /** Small diagram chain rendered as monospace nodes */
  flow: string[];
  insight: string;
  interactive: boolean;
  /** Optional public artifact backing this exploration. */
  artifact?: { label: string; url: string; note: string };
};

export const LAB: LabItem[] = [
  {
    id: "agents",
    numeral: "01",
    title: "Agents",
    question: "When do specialized components beat one good prompt?",
    flow: ["PLANNER", "RESEARCHER", "EXECUTOR", "REVIEWER"],
    insight:
      "Agents earn their complexity when subtasks need different tools or contexts — a planner can decompose, a reviewer can reject. When a single structured prompt with a schema would do, the agent is theater. The hard part is not making them talk to each other; it is making failure observable.",
    interactive: false,
  },
  {
    id: "rag",
    numeral: "02",
    title: "Retrieval-Augmented Generation",
    question: "What should the model know that it was never trained on?",
    flow: ["QUESTION", "EMBEDDING", "RETRIEVAL", "CONTEXT", "MODEL", "ANSWER"],
    insight:
      "The retrieval step is the product. Rankings, chunk boundaries and context packing decide the answer long before the model reads anything. Inspect what was retrieved — an answer is only as credible as the passages behind it.",
    interactive: true,
  },
  {
    id: "observability",
    numeral: "03",
    title: "AI Observability",
    question: "Can you explain what the system did, after it did it?",
    flow: ["INPUT", "PROMPT", "MODEL", "TOOL CALL", "TOKENS", "LATENCY", "RESULT"],
    insight:
      "An LLM call without a trace is a coin flip with a bill attached. Prompts, tool calls, token counts and latencies belong in the same view as your service metrics — that is why systems like Langfuse exist, and why the deployment pipeline in System 01 traces every reasoning step.",
    interactive: false,
    artifact: {
      label: "READ THE RESEARCH — AI-DRIVEN CLOUD LOG FORENSICS",
      url: "https://github.com/Saikoushik1016/Cyber_Forensics_Research_Paper",
      note: "RESEARCH NOTEBOOK · JUPYTER · PUBLIC REPOSITORY",
    },
  },
  {
    id: "hitl",
    numeral: "04",
    title: "Human in the Loop",
    question: "Who is accountable when the system acts?",
    flow: ["RECOMMENDATION", "REVIEW", "APPROVE", "ACT"],
    insight:
      "Intelligence should escalate, not bypass. A recommendation that cannot show its evidence should never carry an irreversible action — review gates are not friction, they are the design.",
    interactive: false,
  },
];
