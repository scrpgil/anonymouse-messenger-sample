import { StorageLib } from "../lib/storage";
import { CanvasLib } from "../lib/canvas";

export class MessageController {
  public static async create(req: any, res: any, db: any, admin: any, storage:any) {
    if (req.method !== "POST") {
      res.status(405).end();
      return 0;
    }
    const message = JSON.parse(req.rawBody);
    const uid = req.params.uid;
    if (!uid || !message) {
      res.status(401).end();
      return 0;
    }
    if (message.message === "") {
      res.status(401).end();
      return 0;
    }
    let key = "";
    try {
      key = await db
        .collection("users/" + uid + "/messages")
        .add({
          message: message.message,
          answer: "",
          answered: false,
          created: admin.firestore.FieldValue.serverTimestamp(),
          updated: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(async (docRef: any) => {
          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        })
        .catch(async (error: any) => {
          console.error("Error adding document: ", error);
          return 0;
        });
    } catch (e) {
      console.error(e);
    }
    const canvasLib = new CanvasLib();
    const blob = await canvasLib.create(message.message);
    const storageLib = new StorageLib();
    await storageLib.upload(
      storage,
      blob,
      key + ".jpg",
      "users/" + uid + "/" + key
    );
    res.send({ id: key });
    return key;
  }
}
