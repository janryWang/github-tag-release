export declare function changedPaths(sha: string): Promise<string[]>
export declare function getSortableAllTags(): Promise<string[]>
export declare function getCurrentBranch(): Promise<string>
export declare function getTaggedTime(tag: string): Promise<string>
export declare function getGithubToken(): string
export declare function getGithubRepoLink(): string
/**
 * All existing tags in the repository
 */
export declare function listTagNames(): Promise<string[]>
/**
 * The latest reachable tag starting from HEAD
 */
export declare function lastTag(): Promise<string>
export declare function getPreviousTag(current: string): Promise<string>
export interface CommitListItem {
  sha: string
  refName: string
  summary: string
  date: string
  author: string
}
export declare function parseLogMessage(commit: string): CommitListItem | null
export declare function listCommits(
  from: string,
  to?: string
): Promise<CommitListItem[]>
