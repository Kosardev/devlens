"use client";

import Link from "next/link";
import { useRepoQuery } from "@/hooks/use-repo-query";
import {use} from "react";

export default function  RepoPage({params,}: { params: Promise<{ owner: string; name: string }>; }) {
    const { owner, name } = use(params);
    const { data, isLoading, error } = useRepoQuery(owner, name);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    <p className="text-slate-400">Loading repository data...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
                <div className="mx-auto max-w-4xl space-y-4">
                    <h1 className="text-xl font-semibold">Something went wrong</h1>
                    <p className="text-slate-400">{String((error as any)?.message ?? error)}</p>
                    <Link className="text-cyan-400 hover:underline" href="/">
                        Back to home
                    </Link>
                </div>
            </main>
        );
    }

    const { meta, issues } = data!;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
            <div className="mx-auto max-w-4xl space-y-8">
                <header className="space-y-2">
                    <h1 className="text-2xl font-bold">{meta.fullName}</h1>
                    {meta.description && <p className="text-slate-400">{meta.description}</p>}
                    <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        <span>⭐ {meta.stars}</span>
                        <span>🍴 {meta.forks}</span>
                        <span>🧩 Open issues: {meta.openIssuesCount}</span>
                        <span>🌿 Default: {meta.defaultBranch}</span>
                    </div>
                </header>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Latest Issues</h2>
                    <ul className="space-y-2">
                        {issues.map((issue) => (
                            <li
                                key={issue.id}
                                className="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <a
                                            href={issue.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium hover:underline"
                                        >
                                            #{issue.number} {issue.title}
                                        </a>
                                        <div className="mt-1 text-xs text-slate-400">
                                            {issue.state.toUpperCase()} • comments: {issue.comments} • assignee:{" "}
                                            {issue.assignee ?? "—"}
                                        </div>
                                    </div>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full border ${
                                            issue.state === "open"
                                                ? "border-emerald-700 text-emerald-300"
                                                : "border-slate-700 text-slate-300"
                                        }`}
                                    >
                                        {issue.state}
                                    </span>
                                </div>

                                {issue.labels.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {issue.labels.map((l) => (
                                            <span
                                                key={l.name}
                                                className="text-xs px-2 py-1 rounded-md border border-slate-800 text-slate-200"
                                                title={l.name}
                                            >
                                                {l.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}
