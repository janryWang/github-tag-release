'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var _a, _b, _c, _d
Object.defineProperty(exports, '__esModule', { value: true })
exports.PkgJSON =
  exports.LernaJSON =
  exports.GithubToken =
  exports.ReleaseTitle =
  exports.AutoCommitMessage =
  exports.ChangelogLimit =
    void 0
var fs_extra_1 = __importDefault(require('fs-extra'))
var core_1 = require('@actions/core')
var PkgJSON = {}
exports.PkgJSON = PkgJSON
var LernaJSON = {}
exports.LernaJSON = LernaJSON
try {
  exports.LernaJSON = LernaJSON =
    (_a = fs_extra_1.default.readJSONSync('lerna.json')) !== null &&
    _a !== void 0
      ? _a
      : {}
} catch (_e) {}
try {
  exports.PkgJSON = PkgJSON =
    (_b = fs_extra_1.default.readJSONSync('package.json')) !== null &&
    _b !== void 0
      ? _b
      : {}
} catch (_f) {}
exports.ChangelogLimit = Number((0, core_1.getInput)('changelog_limit') || 40)
exports.AutoCommitMessage =
  (0, core_1.getInput)('auto_commit_message') ||
  'chore: update CHANGELOG.md by github-tag-release'
exports.ReleaseTitle = (0, core_1.getInput)('release_title') || 'Release 🚀'
exports.GithubToken =
  (0, core_1.getInput)('github_token', { required: true }) ||
  ((_c = process.env) === null || _c === void 0 ? void 0 : _c.GH_TOKEN) ||
  ((_d = process.env) === null || _d === void 0 ? void 0 : _d.GITHUB_TOKEN)
//# sourceMappingURL=constants.js.map
