import { firebaseConfig } from "../helpers/firebaseConfig";
import firebase from "@firebase/app";
import "@firebase/auth";
import { API_URL } from "../helpers/config";

export class UserController {
  public loginUser: any = null;
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  async logout(): Promise<void> {
    this.loginUser = null;
    await firebase.auth().signOut();
    location.href = "/";
  }

  async delete() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      let result = await firebase.auth().signInWithPopup(provider);
      if (result && result.credential) {
        const user = result.user;
        await user.reauthenticateWithCredential(result.credential);
        user.delete();
        this.loginUser = null;
        return true;
      } else {
        console.log("faild");
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
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

  async getToken() {
    if (this.loginUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      return token;
    } else {
      return null;
    }
  }

  async get(uid): Promise<any> {
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
      return obj;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getList(created: string = ""): Promise<any> {
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    try {
      const res = await fetch(API_URL + "users?created=" + created, {
        method,
        headers
      });
      const obj = await res.json();
      const userList = obj.user_list;
      return userList;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateName(token: string, uid: string, user: any): Promise<any> {
    const method = "POST";
    const body = JSON.stringify(user);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    try {
      const res = await fetch(API_URL + "user/" + uid, {
        method,
        headers,
        body
      });
      const user = await res.json();
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export const UserProvider = new UserController();

