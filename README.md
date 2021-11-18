# github-tag-release

github release by git tags

```
name: github-tag-release

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  github-tag-release:
    runs-on: ubuntu-latest
    if: contains(github.event.head_commit.message, 'chore(release)')
    steps:
      - uses: actions/checkout@v2

      - name: Use github-tag-release
        uses: janrywang/github-tag-release
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

```
