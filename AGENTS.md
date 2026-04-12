# Sample AGENTS.md file

## Before starting work

- Activate the current directory as a Serena MCP project (use MCP `activate_project`; do not assume a local `serena` CLI exists).

## Dev environment tips

- Use `npm ci` at the repo root to install dependencies.
- Use `npm run dev` at the repo root to start the development server.
- Use `npm run build` at the repo root to build the project.
- Use `npm run check` at the repo root to run all checks (linting and formatting).

## Testing instructions

- Currently there are no explicit tests as of now.
- When you commit, pre-commit hooks will run; CI checks run after you push or open a PR. Alternatively, you can run `npm run check` locally.
- You can run `npm run check -- --write` to auto-fix some issues.

## Commit / PR instructions

- There are no strict rules for commits, since it is squashed when merging PRs. However, try to keep your commits meaningful and step-by-step, to make the PR easier to review.
- It is highly recommended to Follow the .github/pull_request_template.md for the PR content. It is a standard in this repo.
- There is a pre-commit hook that runs Biome-based formatting and linting via `npm run check -- --write`. It will help you fixing issues before committing.
  - However, some environments don't support Biome (which is part of the pre-commit hooks), such as Termux running on Android NDK. In this case, please make sure to run `npm run check` locally before committing, then commit with the `--no-verify` flag.
- After creating a PR, don't add reviewers and labels by yourself.
