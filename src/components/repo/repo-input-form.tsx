"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { parseGitHubRepoUrl } from "@/lib/github";

export function RepoInputForm() {
    const [repoLink, setRepoLink] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        const result = parseGitHubRepoUrl(repoLink);

        if (!result) {
            setError("Link is not valid! Enter a valid GitHub repository URL. like : facebook/react or https://github.com/facebook/react");
            return;
        }

        const { owner, name } = result;

        router.push(`/repo/${owner}/${name}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl space-y-3 bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-lg"
        >
            <label className="block text-sm font-medium text-slate-200">
                GitHub Repository
            </label>
            <input
                type="text"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                placeholder="Example: facebook/react or https://github.com/facebook/react"
                className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder:text-slate-500"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
                type="submit"
                disabled={!repoLink.trim()}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold w-full transition-colors ${
                    repoLink.trim()
                        ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
            >
                Analyze Issues
            </button>

        </form>
    );
}
