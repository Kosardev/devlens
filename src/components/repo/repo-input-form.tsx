"use client";

import React, { useState } from "react";
import { parseGitHubRepoUrl } from "@/lib/github";
import { useRouter } from "next/navigation";

export function RepoInputForm() {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        const result = parseGitHubRepoUrl(value);

        if (!result) {
            setError("آدرس معتبر برای ریپازیتوری GitHub وارد کن. مثل: facebook/react یا https://github.com/facebook/react");
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="مثال: facebook/react یا https://github.com/facebook/react"
                className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder:text-slate-500"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition-colors w-full"
            >
                Analyze Issues
            </button>
        </form>
    );
}
