import { info, setFailed } from '@actions/core'
import { createChangelogFile } from './changelog'
import { createReleaseNote } from './release-note'
import { commit } from './commit'

const runner = async () => {
  try {
    await createChangelogFile()
    info('ChangeLog generated success!')
    await createReleaseNote()
    info('ReleaseNote generated success!')
    await commit()
    info('Git Commit Success!')
  } catch (e) {
    console.error(e)
    setFailed(e)
  }
}

runner()
