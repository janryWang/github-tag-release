import ghRelease from 'gh-release'
import { context } from '@actions/github'
import {
  lastTag,
  getPreviousTag,
  getCurrentBranch,
  getGithubToken,
} from './git'
import { createChangelog } from './changelog'
import { ReleaseTitle } from './constants'
import { createDingTalkNote } from './dingtalk'
const isPrerelease = (tag: string) => {
  return /(?:beta|rc|alpha)/.test(tag)
}

export const createReleaseNote = async () => {
  const to = await lastTag()
  const from = await getPreviousTag(to)
  const body = await createChangelog(from, to)
  const branch = await getCurrentBranch()
  const token = getGithubToken()
  return new Promise((resolve, reject) => {
    ghRelease(
      {
        ...context.repo,
        cli: true,
        tag_name: to,
        target_commitish: branch,
        name: `${ReleaseTitle} - ${to}`,
        body,
        draft: false,
        prerelease: isPrerelease(to),
        endpoint: 'https://api.github.com',
        auth: {
          token,
        },
      },
      async (err: unknown, response: unknown) => {
        if (err) {
          reject(err)
        } else {
          await createDingTalkNote(body)
          resolve(response)
        }
      }
    )
  })
}
