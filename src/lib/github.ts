import { RepoIdentifier } from "@/types/github";

export function parseGitHubRepoUrl(url: string): RepoIdentifier | null {
    try {
        const trimmed = url.trim();

        if (!trimmed.startsWith("http")) {
            const [owner, name] = trimmed.split("/");
            if (owner && name) return { owner, name };
            return null;
        }

        const u = new URL(trimmed);

        if (u.hostname !== "github.com") return null;

        const parts = u.pathname.split("/").filter(Boolean);
        const [owner, name] = parts;

        if (!owner || !name) return null;

        return { owner, name };
    } catch {
        return null;
    }
}
