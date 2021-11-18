'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator]
    if (!m) return o
    var i = m.call(o),
      r,
      ar = [],
      e
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
    } catch (error) {
      e = { error: error }
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i)
      } finally {
        if (e) throw e.error
      }
    }
    return ar
  }
var __values =
  (this && this.__values) ||
  function (o) {
    var s = typeof Symbol === 'function' && Symbol.iterator,
      m = s && o[s],
      i = 0
    if (m) return m.call(o)
    if (o && typeof o.length === 'number')
      return {
        next: function () {
          if (o && i >= o.length) o = void 0
          return { value: o && o[i++], done: !o }
        },
      }
    throw new TypeError(
      s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    )
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createChangelogFile = exports.createChangelog = void 0
var moment_1 = __importDefault(require('moment'))
var string_similarity_1 = require('string-similarity')
var git_1 = require('./git')
var constants_1 = require('./constants')
var CommitGroupBy = [
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
var isPublishMessage = function (str) {
  if (/chore\(\s*(?:versions?|publish|release)\s*\)/.test(str)) return true
  return /publish v?(?:\d+)\.(?:\d+)\.(?:\d+)/.test(str)
}
var isGithubTagReleaseCommit = function (str) {
  return str.includes(constants_1.AutoCommitMessage)
}
var getCurrentChanges = function (from, to) {
  if (to === void 0) {
    to = 'HEAD'
  }
  return __awaiter(void 0, void 0, void 0, function () {
    var contents
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          contents = []
          return [4 /*yield*/, (0, git_1.listCommits)(from, to)]
        case 1:
          return [
            2 /*return*/,
            _a.sent().filter(function (_a) {
              var summary = _a.summary
              if (
                contents.some(function (target) {
                  return (
                    (0, string_similarity_1.compareTwoStrings)(
                      target,
                      summary
                    ) > 0.5
                  )
                })
              )
                return false
              if (isPublishMessage(summary)) return false
              if (isGithubTagReleaseCommit(summary)) return false
              contents.push(summary)
              return true
            }),
          ]
      }
    })
  })
}
var getGroupChanges = function (from, to) {
  if (to === void 0) {
    to = 'HEAD'
  }
  return __awaiter(void 0, void 0, void 0, function () {
    var changes, results
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, getCurrentChanges(from, to)]
        case 1:
          changes = _a.sent()
          results = CommitGroupBy.map(function (_a) {
            var _b = __read(_a, 1),
              group = _b[0]
            return [group, []]
          })
          changes.forEach(function (_a) {
            var e_1, _b
            var summary = _a.summary,
              author = _a.author,
              sha = _a.sha
            var _loop_1 = function (group, value) {
              if (
                value.some(function (target) {
                  return summary.indexOf(target) === 0
                })
              ) {
                results.forEach(function (item) {
                  if (item[0] === group) {
                    item[1].push(
                      '[' +
                        summary +
                        '](' +
                        (0, git_1.getGithubRepoLink)() +
                        '/commit/' +
                        sha +
                        ') :point_right: ( [' +
                        author +
                        '](https://github.com/' +
                        author +
                        ') )'
                    )
                  }
                })
              }
            }
            try {
              for (
                var CommitGroupBy_1 = __values(CommitGroupBy),
                  CommitGroupBy_1_1 = CommitGroupBy_1.next();
                !CommitGroupBy_1_1.done;
                CommitGroupBy_1_1 = CommitGroupBy_1.next()
              ) {
                var _c = __read(CommitGroupBy_1_1.value, 2),
                  group = _c[0],
                  value = _c[1]
                _loop_1(group, value)
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 }
            } finally {
              try {
                if (
                  CommitGroupBy_1_1 &&
                  !CommitGroupBy_1_1.done &&
                  (_b = CommitGroupBy_1.return)
                )
                  _b.call(CommitGroupBy_1)
              } finally {
                if (e_1) throw e_1.error
              }
            }
          })
          return [
            2 /*return*/,
            results.filter(function (_a) {
              var _b = __read(_a, 2),
                value = _b[1]
              return value.length > 0
            }),
          ]
      }
    })
  })
}
var createChangelog = function (from, to) {
  if (to === void 0) {
    to = 'HEAD'
  }
  return __awaiter(void 0, void 0, void 0, function () {
    var isHead, headVersion, changes, _a, _b, nowDate, _c, _d, log
    var _e
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          isHead = to === 'HEAD'
          headVersion = isHead
            ? (_e =
                constants_1.LernaJSON === null ||
                constants_1.LernaJSON === void 0
                  ? void 0
                  : constants_1.LernaJSON.version) !== null && _e !== void 0
              ? _e
              : constants_1.PkgJSON === null || constants_1.PkgJSON === void 0
              ? void 0
              : constants_1.PkgJSON.version
            : to
          _a = getGroupChanges
          if (!(from !== null && from !== void 0)) return [3 /*break*/, 1]
          _b = from
          return [3 /*break*/, 3]
        case 1:
          return [4 /*yield*/, (0, git_1.lastTag)()]
        case 2:
          _b = _f.sent()
          _f.label = 3
        case 3:
          return [4 /*yield*/, _a.apply(void 0, [_b, to])]
        case 4:
          changes = _f.sent()
          if (!isHead) return [3 /*break*/, 5]
          _c = (0, moment_1.default)().format('YYYY-MM-DD')
          return [3 /*break*/, 7]
        case 5:
          _d = moment_1.default
          return [4 /*yield*/, (0, git_1.getTaggedTime)(to)]
        case 6:
          _c = _d.apply(void 0, [_f.sent(), 'YYYY-MM-DD']).format('YYYY-MM-DD')
          _f.label = 7
        case 7:
          nowDate = _c
          log = changes
            .map(function (_a) {
              var _b = __read(_a, 2),
                group = _b[0],
                contents = _b[1]
              return (
                '\n### ' +
                group +
                '\n' +
                contents
                  .map(function (content) {
                    return '\n1. ' + content + '    \n'
                  })
                  .join('') +
                '  \n'
              )
            })
            .join('')
          return [
            2 /*return*/,
            '\n## ' +
              headVersion +
              '(' +
              nowDate +
              ')\n\n' +
              (log ? log : '### No Change Log') +
              '\n',
          ]
      }
    })
  })
}
exports.createChangelog = createChangelog
var createChangelogFile = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var tags, contents, index, newer, older, _a
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/, (0, git_1.getSortableAllTags)()]
        case 1:
          tags = _b.sent().slice(0, constants_1.ChangelogLimit)
          contents = ''
          index = 0
          _b.label = 2
        case 2:
          if (!(index < tags.length)) return [3 /*break*/, 5]
          newer = tags[index]
          older = tags[index + 1]
          if (!older) return [3 /*break*/, 4]
          _a = contents
          return [4 /*yield*/, (0, exports.createChangelog)(older, newer)]
        case 3:
          contents = _a + _b.sent()
          _b.label = 4
        case 4:
          index++
          return [3 /*break*/, 2]
        case 5:
          return [2 /*return*/, '\n  # Changelog\n  ' + contents + '  \n  ']
      }
    })
  })
}
exports.createChangelogFile = createChangelogFile
//# sourceMappingURL=changelog.js.map
