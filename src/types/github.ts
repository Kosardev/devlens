export interface RepoIdentifier {
    owner: string;
    name: string;
}


export type RepoMeta = {
    fullName: string;
    description: string | null;
    stars: number;
    forks: number;
    openIssuesCount: number;
    defaultBranch: string;
};

export type IssueItem = {
    id: number;
    number: number;
    title: string;
    state: "open" | "closed";
    comments: number;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    url: string;
    labels: { name: string; color: string }[];
    assignee: string | null;
};
