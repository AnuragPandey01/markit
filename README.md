## Markitt

[![Netlify Status](https://api.netlify.com/api/v1/badges/81e0ba5c-a209-4c2f-b8c0-ad982aca6692/deploy-status)](https://app.netlify.com/sites/markitt/deploys)

## Commit Message Convention

We follow the [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages) convention for our commit messages. This helps maintain a clear and consistent commit history.

### Format

`<type>(<scope>): <subject>`



Where:
- `<type>` is one of the following:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation changes
  - `style`: Code style changes (formatting, missing semi colons, etc)
  - `refactor`: Code refactoring
  - `test`: Adding or modifying tests
  - `chore`: Changes to build process or auxiliary tools
- `<scope>` is optional and indicates the section of the codebase
- `<subject>` is a short description in present tense



### Examples
- `feat: add user authentication`
- `fix(auth): resolve login redirect issue`
- `docs: update API documentation`
- `style: format code according to style guide`
- `refactor: simplify data fetching logic`
- `test: add unit tests for user service`
- `chore: update dependencies`

This convention helps us:
- Automatically generate changelogs
- Easily identify the types of changes in each commit
- Maintain a clean and consistent git history