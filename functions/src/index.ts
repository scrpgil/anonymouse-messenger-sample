import * as functions from "firebase-functions";
import * as express from "express";
var ejs = require('ejs');
import { AuthController } from "./controllers/auth";
import { MessageController } from "./controllers/message";
import { OgpController } from "./controllers/ogp";

const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors")({ origin: true });

const db = admin.firestore();
const storage = admin.storage();

const api = express();
api.set("view engine", "ejs");
api.engine("ejs", ejs.__express);
api.use(cors);

api.get("/api/users", async (req, res) => {
  const created = req.query.created;
  await AuthController.getList(req, res, db, created);
  return 0;
});

api.get("/api/user/:uid", async (req, res) => {
  await AuthController.get(req, res, db);
  return 0;
});

api.post("/api/user/:uid", async (req, res) => {
  const uid = await AuthController.verifyToken(req, res, admin);
  if (uid) {
    await AuthController.updateName(req, res, db, uid);
  }
  return 0;
});

api.get("/api/user/:uid/message/:id", async (req, res) => {
  await MessageController.get(req, res, db);
  return 0;
});

api.post("/api/user/:uid/message", async (req, res) => {
  await MessageController.create(req, res, db, admin, storage);
  return 0;
});

api.get("/api/user/:uid/messages", async (req, res) => {
  const created = req.query.created;
  await MessageController.getList(req, res, db, created);
  return 0;
});


api.post("/api/user/:uid/message/:id/answer", async (req, res) => {
  const uid = await AuthController.verifyToken(req, res, admin);
  if (uid) {
    await MessageController.answer(req, res, db, admin, uid);
  }
  return 0;
});
api.get("/home/:uid/:id", async (req, res) => {
  await OgpController.create(req, res, db);
  return 0;
});
exports.api = functions.https.onRequest(api);

exports.addUserTrigger = functions.auth.user().onCreate(async (user: any) => {
  await AuthController.addUserTrigger(db, user);
  return 0;
});

exports.deleteUser = functions.auth.user().onDelete(async (user: any) => {
  await AuthController.deleteUserTable(db, user);
  return 0;
});
