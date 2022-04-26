# google-docs-to-github

Custom action to export Google Docs to GitHub.

This action exports docs directly under the specified folder on Google Drive,
convert them into JSON files that contain HTML body and some metadata such as their title and creation datetime,
then push them to GitHub repository.

## Set up

We recommend that you create a new service account on Google Cloud for this action, share the Google Drive folder with this account,
and authenticate to Google Cloud by using [google-github-actions/auth](https://github.com/google-github-actions/auth),
that automatically set up `GOOGLE_APPLICATION_CREDENTIALS` environment variable to access Google Drive API.

This action requires at least one of the following authorization scopes:

- `https://www.googleapis.com/auth/drive`
- `https://www.googleapis.com/auth/drive.file`
- `https://www.googleapis.com/auth/drive.readonly`

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
          service_account: my-service-account-id@my-project-id.iam.gserviceaccount.com
          workload_identity_provider: projects/my-project-id/locations/global/workloadIdentityPools/my-pool-id/providers/my-provider-id
      - uses: r7kamura/google-docs-to-github@main
        with:
          google_drive_folder_id: 1zD5A9LcT1aHz5_R_eXvikWy1l7SGcjH_
```

## Inputs

### `google_drive_folder_id`

- ID of the Google Drive folder to be exported.
  - You can get it from its URL by accessing the folder.
- required
