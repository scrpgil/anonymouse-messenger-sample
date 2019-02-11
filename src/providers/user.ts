import { firebaseConfig } from "../helpers/firebaseConfig";
import firebase from "@firebase/app";
import "@firebase/auth";

export class UserController {
  public loginUser: any = null;
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  // ログイン有無確認
  async loggedIn() {
    if (this.loginUser) {
      return this.loginUser;
    } else {
      this.loginUser = await this.auth();
      return this.loginUser;
    }
  }

  // ログイン
  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  auth() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user || null);
      });
    });
  }
}

export const UserProvider = new UserController();

