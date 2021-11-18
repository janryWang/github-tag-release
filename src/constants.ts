import fs from 'fs-extra'
import { getInput } from '@actions/core'

let PkgJSON: any = {}
let LernaJSON: any = {}
try {
  LernaJSON = fs.readJSONSync('lerna.json') ?? {}
} catch {}

try {
  PkgJSON = fs.readJSONSync('package.json') ?? {}
} catch {}

export const ChangelogLimit = Number(getInput('changelog_limit') || 40)

export const AutoCommitMessage =
  getInput('auto_commit_message') ||
  'chore: update CHANGELOG.md by github-tag-release'

export const ReleaseTitle = getInput('release_title') || 'Release 🚀'

export const GithubToken: string =
  getInput('github_token', { required: true }) ||
  process.env?.GH_TOKEN ||
  process.env?.GITHUB_TOKEN

export { LernaJSON, PkgJSON }
