import { NextResponse } from "next/server";
import { fetchIssues, fetchRepoMeta } from "@/lib/github-api";

export async function GET(_req: Request, { params }: { params: { owner: string; name: string } }) {
    try {
        const { owner, name } = params;

        const [meta, issues] = await Promise.all([
            fetchRepoMeta(owner, name),
            fetchIssues({ owner, repo: name, state: "all", page: 1, perPage: 20 }),
        ]);

        return NextResponse.json({ meta, issues });
    } catch (err: any) {
        // often octokit errors have status
        const status = err?.status ?? 500;

        // rate limit
        if (status === 403) {
            return NextResponse.json(
                { message: "GitHub API rate limit exceeded or forbidden." },
                { status: 403 }
            );
        }

        if (status === 404) {
            return NextResponse.json(
                { message: "Repository not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Unexpected error." },
            { status: 500 }
        );
    }
}
