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
}
