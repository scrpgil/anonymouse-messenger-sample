import { StorageLib } from "../lib/storage";
import { CanvasLib } from "../lib/canvas";

export class MessageController {
  public static async create(
    req: any,
    res: any,
    db: any,
    admin: any,
    storage: any
  ) {
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

  public static async get(req: any, res: any, db: any) {
    if (req.method !== "GET") {
      res.status(405).end();
      return 0;
    }
    const uid = req.params.uid;
    const id = req.params.id;
    if (!uid || !id) {
      res.status(401).end();
      return 0;
    }
    const docRef = await db.doc("users/" + uid + "/messages/" + id).get();
    const message = docRef.data();
    if (message) {
      message.id = docRef.id;
      res.send(message);
      return message;
    } else {
      return null;
    }
  }

  public static async answer(
    req: any,
    res: any,
    db: any,
    admin: any,
    uid: string
  ) {
    if (req.method !== "POST") {
      res.status(405).end();
      return 0;
    }
    const message = JSON.parse(req.rawBody);
    const id = req.params.id;
    if (uid !== req.params.uid || !message || !id) {
      res.status(401).end();
      return 0;
    }
    if (message.answer === "") {
      res.status(401).end();
      return 0;
    }
    let key = "";
    try {
      const docRef = await db.doc("users/" + uid + "/messages/" + id);
      key = docRef
        .update({
          answer: message.answer,
          answered: true,
          updated: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(async (doc: any) => {
          console.log("Document written with ID: ", doc.id);
          return doc.id;
        })
        .catch(async (error: any) => {
          console.error("Error adding document: ", error);
          return 0;
        });
    } catch (e) {
      console.error(e);
    }
    res.send({ id: key });
    return key;
  }

  public static async getList(req: any, res: any, db: any, offset: any = null) {
    if (req.method !== "GET") {
      res.status(405).end();
      return 0;
    }
    const uid = req.params.uid;
    if (!uid) {
      res.status(401).end();
      return 0;
    }
    let created = new Date();
    if (offset) {
      created = new Date(offset);
    }
    const docsRef = await db
      .collection("users/" + uid + "/messages")
      .orderBy("created", "desc")
      .where("created", "<", created)
      .limit(10)
      .get();
    const messageList: any = [];
    try {
      await docsRef.forEach(async (doc: any) => {
        const message = doc.data();
        message.id = doc.id;
        messageList.push(message);
      });
    } catch (e) {
      console.error(e);
    }

    const obj = {
      message_list: messageList
    };
    res.send(obj);
    return 0;
  }
}
