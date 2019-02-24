export class AuthController {
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
