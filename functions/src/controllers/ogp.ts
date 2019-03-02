export class OgpController {
  public static async create(req: any, res: any, db: any) {
    const uid = req.params.uid;
    const id = req.params.id;
    const docRef = await db.doc("users/" + uid + "/messages/" + id).get();
    const message = docRef.data();
    const image_url =
      "https://firebasestorage.googleapis.com/v0/b/anonymous-messenger-sample.appspot.com/o/users%2F" +
      uid +
      "%2F" +
      id +
      "%2F" +
      id +
      ".jpg?alt=media";
    const url =
      "https://anonymous-messenger-sample.firebaseapp.com/user/" + uid + "/" + id;
    res.render("ogp", {
      title: message.message,
      url: url,
      image_url: image_url
    });
  }
}
