import { AutoCommitMessage } from './constants'
import { shell } from './shell'

export const commit = async () => {
  return await shell('git', ['-am', AutoCommitMessage])
}
