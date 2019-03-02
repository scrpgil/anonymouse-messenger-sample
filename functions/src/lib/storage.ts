export class StorageLib {
  constructor() {
    console.log("new storage lib");
  }
  upload(storage: any, blob: any, filename: any, path: any) {
    return new Promise(resolve => {
      const new_file = storage.bucket().file(path + "/" + filename);
      const blobStream = new_file.createWriteStream({
        metadata: {
          contentType: "image/jpeg"
        }
      });

      blobStream.end(blob, () => {
        resolve(true);
      });
    });
  }
}
