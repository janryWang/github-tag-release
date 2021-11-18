import moment from 'moment'
import { compareTwoStrings } from 'string-similarity'
import fs from 'fs-extra'
import {
  listCommits,
  lastTag,
  getTaggedTime,
  getGithubRepoLink,
  getSortableAllTags,
} from './git'
import {
  LernaJSON,
  PkgJSON,
  ChangelogLimit,
  AutoCommitMessage,
} from './constants'

const CommitGroupBy: Array<[string, string[]]> = [
  [':tada: Enhancements', ['feat', 'features', 'feature']],
  [':bug: Bug Fixes', ['bug', 'bugfix', 'fix']],
  [':boom: Breaking Changes', ['breaking', 'break']],
  [':memo: Documents Changes', ['doc', 'docs']],
  [':rose: Improve code quality', ['refactor', 'redesign']],
  [':rocket: Improve Performance', ['perf']],
  [':hammer_and_wrench: Update Workflow Scripts', ['build']],
  [':construction: Add/Update Test Cases', ['test']],
  [':blush: Other Changes', ['chore', 'ci', 'style']],
]

const isPublishMessage = (str: string) => {
  if (/chore\(\s*(?:versions?|publish|release)\s*\)/.test(str)) return true
  return /publish v?(?:\d+)\.(?:\d+)\.(?:\d+)/.test(str)
}

const isGithubTagReleaseCommit = (str: string) => {
  return str.includes(AutoCommitMessage)
}

const getCurrentChanges = async (from: string, to = 'HEAD') => {
  const contents = []
  return (await listCommits(from, to)).filter(({ summary }) => {
    if (contents.some((target) => compareTwoStrings(target, summary) > 0.5))
      return false
    if (isPublishMessage(summary)) return false
    if (isGithubTagReleaseCommit(summary)) return false
    contents.push(summary)
    return true
  })
}

const getGroupChanges = async (from: string, to = 'HEAD') => {
  const changes = await getCurrentChanges(from, to)
  const results: Array<[string, string[]]> = CommitGroupBy.map(([group]) => [
    group,
    [],
  ])
  changes.forEach(({ summary, author, sha }) => {
    for (const [group, value] of CommitGroupBy) {
      if (value.some((target) => summary.indexOf(target) === 0)) {
        results.forEach((item) => {
          if (item[0] === group) {
            item[1].push(
              `[${summary}](${getGithubRepoLink()}/commit/${sha}) :point_right: ( [${author}](https://github.com/${author}) )`
            )
          }
        })
      }
    }
  })
  return results.filter(([, value]) => {
    return value.length > 0
  })
}

export const createChangelog = async (from?: string, to = 'HEAD') => {
  const isHead = to === 'HEAD'
  const headVersion = isHead ? LernaJSON?.version ?? PkgJSON?.version : to
  const changes = await getGroupChanges(from ?? (await lastTag()), to)
  const nowDate = isHead
    ? moment().format('YYYY-MM-DD')
    : moment(await getTaggedTime(to), 'YYYY-MM-DD').format('YYYY-MM-DD')
  const log = changes
    .map(([group, contents]) => {
      return `
### ${group}
${contents
  .map((content) => {
    return `
1. ${content}    
`
  })
  .join('')}  
`
    })
    .join('')
  return `
## ${headVersion}(${nowDate})

${log ? log : '### No Change Log'}
`
}

export const createChangelogFile = async () => {
  const tags = (await getSortableAllTags()).slice(0, ChangelogLimit)
  console.log(tags, ChangelogLimit)
  let contents = ''
  for (let index = 0; index < tags.length; index++) {
    const newer = tags[index]
    const older = tags[index + 1]
    if (older) {
      contents += await createChangelog(older, newer)
    }
  }
  const file = `
  # Changelog
  ${contents}  
  `

  await fs.writeFile('CHANGELOG.md', file, 'utf8')
}
