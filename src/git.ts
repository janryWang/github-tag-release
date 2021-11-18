import github from '@actions/github'
import semver from 'semver'
import { GithubToken } from './constants'
import { shell } from './shell'

export async function changedPaths(sha: string): Promise<string[]> {
  return (
    await shell('git', [
      'show',
      '-m',
      '--name-only',
      '--pretty=format:',
      '--first-parent',
      sha,
    ])
  ).stdout.split('\n')
}

export async function getSortableAllTags() {
  return (await shell('git', ['tag', '-l'])).stdout.split(/\n/).sort((a, b) => {
    const v1 = a.replace(/^v/, '')
    const v2 = b.replace(/^v/, '')
    if (!v1 || !v2) return 1
    return semver.gte(v1, v2) ? -1 : 1
  })
}

export async function getCurrentBranch() {
  return (await shell('git', ['branch', '--show-current'])).stdout
}

export async function getTaggedTime(tag: string) {
  return (await shell('git', ['log', '-1', '--format=%ai', tag])).stdout
}

export function getGithubToken() {
  return GithubToken
}

export function getGithubRepoLink() {
  const repo = github.context.repo
  return `https://github.com/${repo.owner}/${repo.repo}`
}
/**
 * All existing tags in the repository
 */
export async function listTagNames() {
  return (await shell('git', ['tag'])).stdout.split('\n').filter(Boolean)
}

/**
 * The latest reachable tag starting from HEAD
 */
export async function lastTag() {
  return (await shell('git', ['describe', '--abbrev=0', '--tags'])).stdout
}

export async function getPreviousTag(current: string) {
  try {
    return (
      await shell('git', ['describe', '--abbrev=0', '--tags', current + '^'])
    ).stdout
  } catch {
    return ''
  }
}

export interface CommitListItem {
  sha: string
  refName: string
  summary: string
  date: string
  author: string
}

export function parseLogMessage(commit: string): CommitListItem | null {
  const parts =
    commit.match(
      /hash<(.+)> ref<(.*)> message<(.*)> date<(.*)> author<(.*)>/
    ) || []

  if (!parts || parts.length === 0) {
    return null
  }

  return {
    sha: parts[1],
    refName: parts[2],
    summary: parts[3],
    date: parts[4],
    author: parts[5],
  }
}

export async function listCommits(
  from: string,
  to = ''
): Promise<CommitListItem[]> {
  // Prints "hash<short-hash> ref<ref-name> message<summary> date<date>"
  // This format is used in `getCommitInfos` for easily analize the commit.
  const getRange = () => {
    if (!from || from == to) return to
    return `${from}..${to}`
  }

  return (
    await shell('git', [
      'log',
      '--oneline',
      '--pretty="hash<%h> ref<%D> message<%s> date<%cd> author<%an>"',
      '--date=short',
      getRange(),
    ])
  ).stdout
    .split('\n')
    .filter(Boolean)
    .map(parseLogMessage)
    .filter(Boolean)
}
