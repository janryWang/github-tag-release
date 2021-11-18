import { AutoCommitMessage } from './constants'
import { getGithubToken, getGithubRepoUrl } from './git'
import { shell } from './shell'

export const commit = async () => {
  await shell('git', [
    'config',
    '--local',
    'user.name',
    `"Github Actions Robot"`,
  ])
  await shell('git', [
    'config',
    '--local',
    'user.email',
    `"41898282+github-actions[bot]@users.noreply.github.com"`,
  ])
  await shell('git', [
    'remote',
    'set-url',
    'origin',
    `https://x-access-token:${getGithubToken()}@github.com/${getGithubRepoUrl()}`,
  ])
  await shell('git', ['add', '-A'])
  await shell('git', ['commit', '-m', `"${AutoCommitMessage}"`])
  await shell('git', ['push'])
}
