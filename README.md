# google-docs-to-github

GitHub Action to export Google Docs from Google Drive folder to your GitHub repository.

## Usage

This is an example `.github/workflows/import.yml` that exports Google Docs in folder `1zD5A9LcT1aHz5_R_eXvikWy1l7SGcjH_` to `data` branch on the GitHub repository daily at 00:00 (GMT).

```yaml
name: import

on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 0 * * *"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: r7kamura/google-docs-to-github@main
        with:
          folder_id: 1zD5A9LcT1aHz5_R_eXvikWy1l7SGcjH_
```

## Inputs

### `folder_id`

- ID of the folder to be exported (included in the URL of the Google Drive folder).
- required
