"use client";

/**
 * REPO STAT PANEL — live GitHub repo stats for the visitor.
 * Fetches on mount; if the network or API hiccups, falls back to the
 * build-time snapshot so the panel is never broken or empty.
 */

import { useEffect, useState } from "react";
import {
  REPOS,
  type RepoKey,
  type RepoSnapshot,
} from "@/content/repos";
import { LINKS } from "@/content/links";
import { cn } from "@/lib/utils";

type Live = {
  stars: number;
  forks: number;
  pushed: string;
  lastCommit: { sha: string; date: string; message: string } | null;
  openIssues?: number;
};

function fmtDate(iso: string): string {
  return iso.slice(0, 10);
}

export function RepoStatPanel({
  repoKey,
  className,
}: {
  repoKey: RepoKey;
  className?: string;
}) {
  const snapshot: RepoSnapshot = REPOS[repoKey];
  const [live, setLive] = useState<Live | null>(null);
  const [state, setState] = useState<"loading" | "live" | "snapshot">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    (async () => {
      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-repo-panel",
        };
        const [repoRes, commitRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${LINKS.githubOwner}/${snapshot.name}`, {
            headers,
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/repos/${LINKS.githubOwner}/${snapshot.name}/commits?per_page=1`,
            { headers, signal: controller.signal }
          ),
        ]);
        if (!repoRes.ok) throw new Error(String(repoRes.status));
        const repo = await repoRes.json();
        const commits = commitRes.ok ? await commitRes.json() : [];
        const c = Array.isArray(commits) ? commits[0] : null;
        if (cancelled) return;
        setLive({
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          pushed: String(repo.pushed_at ?? "").slice(0, 10),
          openIssues: repo.open_issues_count ?? 0,
          lastCommit: c
            ? {
                sha: String(c.sha).slice(0, 7),
                date: String(c.commit?.author?.date ?? "").slice(0, 10),
                message: String(c.commit?.message ?? "").split("\n")[0],
              }
            : null,
        });
        setState("live");
      } catch {
        if (!cancelled) setState("snapshot");
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [snapshot.name]);

  const pushed = live?.pushed ?? snapshot.pushed;
  const lastCommit = live?.lastCommit ?? snapshot.lastCommit;

  const cell = "font-mono text-[10px] tracking-[0.14em]";
  const label = "text-ivory/35";
  const value = "text-ivory/70";

  return (
    <div
      className={cn(
        "hairline-gold flex flex-wrap items-center gap-x-6 gap-y-2 bg-royal/50 px-4 py-3",
        className
      )}
    >
      <a
        href={snapshot.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2"
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-gold group-hover:text-ivory transition-colors duration-gesture">
          {snapshot.name.toUpperCase()} ↗
        </span>
        <span className="hairline-gold px-2 py-0.5 text-[9px] font-mono tracking-[0.14em] text-ivory/50">
          {snapshot.language.toUpperCase()}
        </span>
      </a>

      <span className={cn(cell, label)}>
        LAST PUSH <span className={value}>{fmtDate(pushed)}</span>
      </span>
      <span className={cn(cell, label)}>
        HEAD <span className={value}>{lastCommit.sha}</span>
      </span>

      <span
        className={cn(
          cell,
          "ml-auto",
          state === "live"
            ? "text-emerald-imperial"
            : state === "loading"
              ? "text-ivory/25"
              : "text-ivory/30"
        )}
        title={
          state === "snapshot"
            ? "Live fetch unavailable — showing build-time snapshot"
            : undefined
        }
      >
        {state === "live"
          ? "● LIVE FROM GITHUB"
          : state === "loading"
            ? "○ FETCHING…"
            : "○ SNAPSHOT"}
      </span>
    </div>
  );
}
