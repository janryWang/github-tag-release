import { exec, ExecOptions } from '@actions/exec'
import { GithubToken } from './constants'

export const shell = async (commandLine: string, args?: string[]) => {
  const options: ExecOptions = {
    env: {
      ...process.env,
      GITHUB_TOKEN: GithubToken,
      GH_TOKEN: GithubToken,
    },
  }
  let stdout = ''
  let stderr = ''
  options.listeners = {
    stdout: (data: Buffer) => {
      stdout += data.toString()
    },
    stderr: (data: Buffer) => {
      stderr += data.toString()
    },
  }
  await exec(commandLine, args, options)
  return {
    stdout,
    stderr,
  }
}
