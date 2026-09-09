/**
 * LIVE ANALYSIS — a real, deterministic heuristic analysis over real
 * GitHub pull-request data. This is not a simulation of ChangeGuard:
 * it fetches an actual PR from the GitHub API in the visitor's browser
 * and scores it with transparent rules. It is honestly scoped — a
 * demonstration of the analysis *shape*, not the production LLM system.
 */

export type RealPrData = {
  number: number;
  title: string;
  branch: string;
  base: string;
  author: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  commits: number;
  createdAt: string;
  url: string;
  files: Array<{
    filename: string;
    additions: number;
    deletions: number;
    status: string;
  }>;
};

export type StageOutput = {
  /** Per-stage evidence lines shown as each stage completes. */
  outputs: string[];
  score: number;
  band: "LOW" | "ELEVATED" | "HIGH";
  factors: Array<{ label: string; weight: string; value: string }>;
  recommendation: string;
};

const GITHUB_API = "https://api.github.com";

/** Fetch a real public PR. Throws on network/API failure — caller falls back. */
export async function fetchRealPr(
  repo: string,
  number_: number
): Promise<RealPrData> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-live-demo",
  };

  const prRes = await fetch(`${GITHUB_API}/repos/${repo}/pulls/${number_}`, {
    headers,
  });
  if (!prRes.ok) throw new Error(`GitHub API ${prRes.status}`);
  const pr = await prRes.json();

  const filesRes = await fetch(
    `${GITHUB_API}/repos/${repo}/pulls/${number_}/files?per_page=30`,
    { headers }
  );
  const files = filesRes.ok ? await filesRes.json() : [];

  return {
    number: pr.number,
    title: pr.title,
    branch: pr.head?.ref ?? "unknown",
    base: pr.base?.ref ?? "main",
    author: pr.user?.login ?? "unknown",
    additions: pr.additions ?? 0,
    deletions: pr.deletions ?? 0,
    changedFiles: pr.changed_files ?? files.length,
    commits: pr.commits ?? 0,
    createdAt: String(pr.created_at ?? "").slice(0, 10),
    url: pr.html_url,
    files: (Array.isArray(files) ? files : []).slice(0, 20).map((f: {
      filename: string;
      additions: number;
      deletions: number;
      status: string;
    }) => ({
      filename: f.filename,
      additions: f.additions,
      deletions: f.deletions,
      status: f.status,
    })),
  };
}

/** Testable, deterministic scoring — same input, same verdict, always. */
export function analyzeRealPr(pr: RealPrData): StageOutput {
  const outputs: string[] = [];

  // Stage 1 — pull request
  outputs.push(
    `PR #${pr.number} · ${pr.branch} → ${pr.base} · ${pr.commits} commits · live fetch`
  );

  // Stage 2 — code change analysis
  const totalDelta = pr.additions + pr.deletions;
  const topFiles = [...pr.files]
    .sort((a, b) => b.additions + b.deletions - (a.additions + a.deletions))
    .slice(0, 3)
    .map((f) => f.filename.split("/").pop() || f.filename);
  outputs.push(
    `${pr.changedFiles} files · +${pr.additions}/−${pr.deletions}${
      topFiles.length ? ` · ${topFiles.join(", ")}` : ""
    }`
  );

  // Stage 3 — infrastructure analysis (path-based detection)
  const infraPatterns = [
    /infrastruct/i,
    /terraform/i,
    /\.tf$/,
    /deploy/i,
    /docker/i,
    /dockerfile/i,
    /ci|workflow/i,
    /\.github\//i,
  ];
  const infraFiles = pr.files.filter((f) =>
    infraPatterns.some((rx) => rx.test(f.filename))
  );
  outputs.push(
    infraFiles.length
      ? `${infraFiles.length} infrastructure-adjacent file(s): ${infraFiles
          .slice(0, 2)
          .map((f) => f.filename)
          .join(", ")}`
      : "No infrastructure or CI files touched"
  );

  // Stage 4 — blast radius (directory fan-out)
  const dirs = new Set(
    pr.files.map((f) => {
      const parts = f.filename.split("/");
      return parts.length > 1 ? parts.slice(0, -1).join("/") : "(root)";
    })
  );
  const testFiles = pr.files.filter(
    (f) => /test|spec/i.test(f.filename) || /tests?\//i.test(f.filename)
  );
  outputs.push(
    `${dirs.size} area(s) touched · ${testFiles.length} test file(s) in diff`
  );

  // Stage 5 — incident context (history honest proxy: PR age)
  const ageDays = pr.createdAt
    ? Math.max(
        0,
        Math.round((Date.now() - new Date(pr.createdAt).getTime()) / 86400000)
      )
    : 0;
  outputs.push(
    `Open for ${ageDays} day(s) · created ${pr.createdAt || "unknown"} · no linked incident data in public context`
  );

  // Stage 6 — reasoning (deterministic weights, stated openly)
  outputs.push(
    "Weighted heuristics: size, infra surface, area fan-out, test coverage in diff"
  );

  // Stage 7 — risk score (0..100, deterministic)
  let score = 10;
  if (totalDelta > 500) score += 20;
  else if (totalDelta > 100) score += 12;
  else if (totalDelta > 20) score += 6;
  if (pr.changedFiles > 20) score += 15;
  else if (pr.changedFiles > 5) score += 8;
  if (infraFiles.length > 0) score += 18;
  if (dirs.size > 4) score += 10;
  else if (dirs.size > 2) score += 5;
  if (testFiles.length === 0 && totalDelta > 30) score += 15;
  if (pr.additions > 0 && pr.deletions === 0 && totalDelta > 200) score += 8;
  score = Math.min(95, Math.max(5, score));

  const band: StageOutput["band"] =
    score >= 70 ? "HIGH" : score >= 40 ? "ELEVATED" : "LOW";

  outputs.push(`${score} / 100 · band ${band}`);

  // Stage 8 — rollout recommendation (compact form; full text in `recommendation`)
  outputs.push(
    band === "HIGH"
      ? "hold rollout · split the change · infra review first"
      : band === "ELEVATED"
        ? "canary 10% → observe error budget → full rollout"
        : "standard review · merge pipeline"
  );

  const factors = [
    {
      label: "Change size",
      weight: totalDelta > 500 ? "HIGH" : totalDelta > 100 ? "MEDIUM" : "LOW",
      value: `+${pr.additions}/−${pr.deletions} across ${pr.changedFiles} files`,
    },
    {
      label: "Infra surface",
      weight: infraFiles.length ? "HIGH" : "LOW",
      value: infraFiles.length
        ? `${infraFiles.length} infra/CI file(s) in diff`
        : "None detected",
    },
    {
      label: "Area fan-out",
      weight: dirs.size > 4 ? "MEDIUM" : "LOW",
      value: `${dirs.size} director${dirs.size === 1 ? "y" : "ies"} touched`,
    },
    {
      label: "Tests in diff",
      weight: testFiles.length === 0 && totalDelta > 30 ? "MEDIUM" : "LOW",
      value: testFiles.length
        ? `${testFiles.length} test file(s) present`
        : "No test changes detected",
    },
  ];

  const recommendation =
    band === "HIGH"
      ? "Hold rollout. Break the change into smaller PRs, add tests for touched areas, and request infra review before merge."
      : band === "ELEVATED"
        ? "Proceed with canary. Watch error rates at 10% before full rollout; ensure the touched areas have coverage."
        : "Low-risk profile. Standard review and merge pipeline is appropriate.";

  return { outputs, score, band, factors, recommendation };
}

export const LIVE_PR = {
  repo: "Saikoushik1016/changeguard-ai",
  number: 1,
} as const;
