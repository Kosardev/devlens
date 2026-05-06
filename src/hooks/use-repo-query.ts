"use client";

import { useQuery } from "@tanstack/react-query";
import {ApiResponse} from "@/types/api";

async function getRepo(owner: string, name: string): Promise<ApiResponse> {
    const res = await fetch(`/api/repo/${owner}/${name}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Failed to fetch repo data.");
    }
    return res.json();
}

export function useRepoQuery(owner: string, name: string) {
    return useQuery({
        queryKey: ["repo", owner, name],
        queryFn: () => getRepo(owner, name),
        staleTime: 60_000,
        gcTime: 10 * 60_000,
        retry: (count, error) => {
            // If you have 404 Error don't retry
            if (error instanceof Error && error.message.includes("not found")) return false;
            return count < 2;
        },
    });
}
