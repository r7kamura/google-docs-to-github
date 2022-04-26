const fsPromises = require("fs/promises");
const { google } = require("googleapis");
const core = require("@actions/core");

async function main() {
  const drive = google.drive({
    auth: new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    }),
    version: "v3",
  });

  const folderId = core.getInput("google_drive_folder_id");

  const files = await listFiles({ drive, folderId });

  const directoryPath = "output";

  await createDirectory({ directoryPath });

  files.forEach(async (file) => {
    const html = await exportFile({
      drive,
      fileId: file.id,
    });

    await fsPromises.writeFile(
      `${directoryPath}/${file.id}.json`,
      JSON.stringify({
        ...file,
        html,
      })
    );
  });
}

async function createDirectory({ directoryPath }) {
  await fsPromises.stat(directoryPath).catch((err) => {
    if (err.code === "ENOENT") {
      fsPromises.mkdir(directoryPath);
    }
  });
}

async function exportFile({ drive, fileId }) {
  const response = await drive.files.export({
    fileId,
    mimeType: "text/html",
  });
  return response.data;
}

async function listFiles({ drive, folderId }) {
  const response = await drive.files.list({
    fields: "nextPageToken, files(id, name, createdTime, modifiedTime)",
    orderBy: "modifiedTime desc",
    pageSize: 1000,
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.document'`,
  });
  return response.data.files;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
