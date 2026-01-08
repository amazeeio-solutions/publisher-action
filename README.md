# Amazee Labs Publisher action

To be used in combination with
[`@amazeelabs/publisher`](https://github.com/AmazeeLabs/silverback-mono/tree/development/packages/npm/%40amazeelabs/publisher)'s
`github-workflow` mode.

## What the action does

- Notifies Publisher API about the build status
- Optionally: Sets environment variables for the next steps
- Optionally: Manages build caches

## Example workflow

```yml
name: FE Build

# Must contain "[env: {env}]" in the name
run-name: 'FE Build [env: ${{ inputs.env }}]'

on:
  workflow_dispatch:
    inputs:
      publisher_payload: # Required input
        description: 'Publisher payload'
        required: true
      env:
        description: 'Environment'
        required: true

# Important: limit the number of running builds to one per environment
concurrency:
  group: fe_build_${{ inputs.env }}

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      # Checkout, prepare, etc. as usual

      - name: Publisher
        uses: amazeeio-solutions/publisher-action@SHA
        with:
          success_env_var_name: BUILD_IS_SUCCESSFUL
          cache_paths: |
            apps/website/.cache
            apps/website/public
          cache_key: fe-build-cache-${{ inputs.env }}

      - name: Build & deploy
        run: do_build_and_deploy && echo "BUILD_IS_SUCCESSFUL=1" >> $GITHUB_ENV
```
