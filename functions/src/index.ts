import * as functions from 'firebase-functions';
import { AuthController } from "./controllers/auth";

const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserTable = functions.auth.user().onCreate(async (user: any) => {
  await AuthController.addUserTrigger(db, user);
  return 0;
});
