/**
 * REPOS — real public repositories, verified via the GitHub API.
 * Snapshot values below were captured at build time; the client panels
 * refresh them live and fall back to these numbers when offline.
 */

export type RepoSnapshot = {
  name: string;
  url: string;
  language: string;
  description: string;
  created: string;
  pushed: string;
  lastCommit: { sha: string; date: string; message: string };
};

export const REPOS = {
  changeguard: {
    name: "changeguard-ai",
    url: "https://github.com/Saikoushik1016/changeguard-ai",
    language: "Python",
    description: "Change risk review agent backend.",
    created: "2026-04-13",
    pushed: "2026-07-04",
    lastCommit: {
      sha: "bc808dc",
      date: "2026-05-25",
      message: "feat: GitHub client and full webhook pipeline wired end to end",
    },
  },
  bankingCore: {
    name: "Banking_System_Core",
    url: "https://github.com/Saikoushik1016/Banking_System_Core",
    language: "Java",
    description:
      "A high-integrity financial ledger engine simulating real-world banking operations — accounts, transfers, scheduled payments, account merging, and historical balance tracking.",
    created: "2025-11-18",
    pushed: "2026-04-01",
    lastCommit: {
      sha: "e93474b",
      date: "2026-04-01",
      message: "Revise README for comprehensive project documentation",
    },
  },
  forensics: {
    name: "Cyber_Forensics_Research_Paper",
    url: "https://github.com/Saikoushik1016/Cyber_Forensics_Research_Paper",
    language: "Jupyter Notebook",
    description: "AI Driven Approaches to Cloud Log Forensics.",
    created: "2025-10-24",
    pushed: "2025-10-26",
    lastCommit: {
      sha: "dcb244b",
      date: "2025-10-26",
      message: "Update README.md",
    },
  },
} as const;

export type RepoKey = keyof typeof REPOS;

/** The real PR used by the live analysis demo when GitHub is reachable. */
export const REAL_PR = {
  repo: "Saikoushik1016/changeguard-ai",
  number: 1,
  title: "test: trigger changeguard webhook",
  branch: "test/changeguard-webhook-test",
  base: "main",
  commits: 5,
  url: "https://github.com/Saikoushik1016/changeguard-ai/pull/1",
  created: "2026-06-01",
} as const;
