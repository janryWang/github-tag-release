import { info, warning, setFailed } from '@actions/core'
import { createChangelogFile } from './changelog'
import { createReleaseNote } from './release-note'
import { commit } from './commit'

const runner = async () => {
  try {
    await createChangelogFile()
    info('ChangeLog generated success!')
    try {
      await createReleaseNote()
      info('ReleaseNote generated success!')
    } catch (e) {
      warning(e)
    }
    await commit()
    info('Git Commit Success!')
  } catch (e) {
    console.error(e)
    setFailed(e)
  }
}

runner()
