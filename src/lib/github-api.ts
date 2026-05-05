import { Octokit } from "@octokit/rest";
import {IssueItem, RepoMeta} from "@/types/github";

const token = process.env.GITHUB_TOKEN;

export const octokit = new Octokit({
    auth: token,
});

export async function fetchRepoMeta(owner: string, repo: string): Promise<RepoMeta> {
    const res = await octokit.repos.get({ owner, repo });

    return {
        fullName: res.data.full_name,
        description: res.data.description,
        stars: res.data.stargazers_count,
        forks: res.data.forks_count,
        openIssuesCount: res.data.open_issues_count,
        defaultBranch: res.data.default_branch,
    };
}

export async function fetchIssues(params: {
    owner: string;
    repo: string;
    state?: "open" | "closed" | "all";
    page?: number;
    perPage?: number;
}): Promise<IssueItem[]> {
    const {
        owner,
        repo,
        state = "all",
        page = 1,
        perPage = 20,
    } = params;

    const res = await octokit.issues.listForRepo({
        owner,
        repo,
        state,
        page,
        per_page: perPage,
        sort: "created",
        direction: "desc",
    });

    // GitHub API includes PRs in issues endpoint ; so we should remove PRs from them
    const issuesOnly = res.data.filter((issue) => !("pull_request" in issue));

    return issuesOnly.map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state as "open" | "closed",
        comments: issue.comments,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        closedAt: issue.closed_at,
        url: issue.html_url,
        labels: (issue.labels ?? []).map((label: any) =>
            typeof label === "string"
                ? { name: label, color: "64748b" }
                : { name: label.name ?? "label", color: label.color ?? "64748b" }
        ),
        assignee: issue.assignee?.login ?? null,
    }));
}
