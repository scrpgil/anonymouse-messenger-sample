import * as functions from "firebase-functions";
import * as express from "express";
import { AuthController } from "./controllers/auth";
import { MessageController } from "./controllers/message";

const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors")({ origin: true });

const db = admin.firestore();
const storage = admin.storage();

const api = express();
api.use(cors);

api.post("/api/user/:uid/message", async (req, res) => {
  await MessageController.create(req, res, db, admin, storage);
  return 0;
});
exports.api = functions.https.onRequest(api);

exports.addUserTrigger = functions.auth.user().onCreate(async (user: any) => {
  await AuthController.addUserTrigger(db, user);
  return 0;
});
