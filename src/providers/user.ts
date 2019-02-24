import { firebaseConfig } from "../helpers/firebaseConfig";
import firebase from "@firebase/app";
import "@firebase/auth";
import { API_URL } from "../helpers/config";
import { User } from "../models/user";

export class UserController {
  public loginUser: any = null;
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  async loggedIn() {
    if (this.loginUser) {
      return this.loginUser;
    } else {
      this.loginUser = await this.auth();
      return this.loginUser;
    }
  }

  auth() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user || null);
      });
    });
  }

  async get(uid): Promise<User> {
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    try {
      const res = await fetch(API_URL + "user/" + uid, {
        method,
        headers
      });
      const obj = await res.json();
      const user = new User(obj);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export const UserProvider = new UserController();

