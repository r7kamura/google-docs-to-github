# google-docs-to-github

GitHub Action to export Google Docs from Google Drive folder to your GitHub repository.

## Usage

This is an example workflow to export docs daily at 00:00 (GMT).

```yaml
# .github/workflows/import.yml
name: import

on:
  schedule:
    - cron: "0 0 * * *"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/auth@v0
        with:
          service_account: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_EMAIL }}
          workload_identity_provider: ${{ secrets.GOOGLE_WORKLOAD_IDENTITY_PROVIDER }}
      - uses: r7kamura/google-docs-to-github@main
        with:
          google_drive_folder_id: 1zD5A9LcT1aHz5_R_eXvikWy1l7SGcjH_
```

## Inputs

### `google_drive_folder_id`

- ID of the Google Drive folder to be exported.
  - You can get it from its URL by accessing the folder.
- required
