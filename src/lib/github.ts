import { RepoIdentifier } from "@/types/github";

export function parseGitHubRepoUrl(url: string): RepoIdentifier | null {
    const trimmed = url.trim();

    if (!trimmed) return null;

    // Allow 'owner/repo' format
    if (!trimmed.startsWith("http")) {
        const [owner, name] = trimmed.split("/");
        return owner && name ? { owner, name } : null;
    }

    try {
        const u = new URL(trimmed);
        if (u.hostname !== "github.com") return null;

        const [owner, name] = u.pathname
            .split("/")
            .filter(Boolean)
            .slice(0, 2);

        return owner && name ? { owner, name } : null;
    } catch {
        return null;
    }
}
