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
  git-auto-commit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Use github-tag-release
        uses: janrywang/github-tag-release
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

```
