export class AuthController {
  public static async get(req: any, res: any, db: any) {
    if (req.method !== "GET") {
      res.status(405).end();
      return 0;
    }
    const uid = req.params.uid;
    if (!uid) {
      res.status(401).end();
      return 0;
    }
    const docRef = await db.doc("users/" + uid).get();
    const user = docRef.data();
    if (user) {
      user.uid = docRef.id;
      res.send(user);
      return user;
    } else {
      return null;
    }
  }

  public static async getList(req: any, res: any, db: any, offset: any = null) {
    if (req.method !== "GET") {
      res.status(405).end();
      return 0;
    }
    let created = new Date();
    if (offset) {
      created = new Date(offset);
    }
    console.log(created);
    const docsRef = await db
      .collection("users")
      .orderBy("created", "desc")
      .where("created", "<", created)
      .limit(10)
      .get();
    const userList: any = [];
    try {
      await docsRef.forEach(async (doc: any) => {
        const user = doc.data();
        user.uid = doc.id;
        console.log(user.uid);
        userList.push(user);
      });
    } catch (e) {
      console.error(e);
    }

    const obj = {
      user_list: userList
    };
    res.send(obj);
    return 0;
  }

  public static async updateName(req: any, res: any, db: any, uid: string) {
    if (req.method !== "POST") {
      res.status(405).end();
      return 0;
    }
    const obj = JSON.parse(req.rawBody);
    const user = obj;
    if (uid !== req.params.uid || !user) {
      res.status(401).end();
      return 0;
    }
    const key = await db
      .doc("users/" + uid)
      .update({
        name: user.name
      })
      .then(async (doc: any) => {
        console.log("Document written with ID: ", doc.id);
        return doc.id;
      })
      .catch(async (error: any) => {
        console.error("Error adding document: ", error);
        return 0;
      });

    res.send({ id: key });
    return key;
  }

  public static async addUserTrigger(db: any, user: any) {
    let key = "";
    try {
      const created = new Date(user.metadata.creationTime);
      key = await db
        .collection("users")
        .doc(user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          icon: user.photoURL,
          created: created
        })
        .then(async (docRef: any) => {
          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        })
        .catch(async (error: any) => {
          console.error("Error adding document: ", error);
          return "";
        });
    } catch (e) {
      console.error(e);
    }
    return key;
  }

  public static async deleteUserTable(db: any, user: any) {
    let key = "";
    try {
      key = await db
        .collection("delete_users")
        .doc(user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          icon: user.photoURL,
          created: user.metadata.creationTime
        })
        .then(async (docRef: any) => {
          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        })
        .catch(async (error: any) => {
          console.error("Error adding document: ", error);
          return "";
        });
      db.collection("users")
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error: any) => {
          console.error("Error removing document: ", error);
        });
    } catch (e) {
      console.error(e);
    }
    return key;
  }
  public static async verifyToken(req: any, res: any, admin: any) {
    if (!req.headers.authorization) {
      res.status(403).json({ error: "No credentials sent!" });
      return null;
    }
    const token = req.headers.authorization.split(" ");
    if (token[0] !== "Bearer") {
      res.status(403).json({ error: "No credentials sent!" });
      return null;
    }
    const decodedToken = await admin.auth().verifyIdToken(token[1]);
    return decodedToken.uid;
  }
}
