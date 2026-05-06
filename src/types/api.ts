import { RepoMeta, IssueItem } from "./github";

export type ApiResponse = {
    meta: RepoMeta;
    issues: IssueItem[];
};

export type ApiErrorResponse = {
    message: string;
    status: number;
};