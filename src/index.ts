import { createChangelogFile } from './changelog'
import { createReleaseNote } from './release-note'
import { commit } from './commit'

const runner = async () => {
  await createChangelogFile()
  await createReleaseNote()
  await commit()
}

runner()
