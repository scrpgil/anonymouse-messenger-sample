import { API_URL } from "../helpers/config";

export class MessageController {
  constructor() {}

  async create(uid, model) {
    const method = "POST";
    const body = JSON.stringify(model);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    try {
      const res = await fetch(API_URL + "user/" + uid + "/message", {
        method,
        headers,
        body
      });
      const obj = await res.json();
      return obj;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async get(uid, id): Promise<any> {
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    try {
      const res = await fetch(API_URL + "user/" + uid + "/message/" + id, {
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

  async getList(uid, created: string = ""): Promise<any> {
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    try {
      const res = await fetch(
        API_URL + "user/" + uid + "/messages?created=" + created,
        {
          method,
          headers
        }
      );
      const obj = await res.json();
      const messageList = obj.message_list
      return messageList;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async answer(token, uid, id, model) {
    const method = "POST";
    const body = JSON.stringify(model);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    try {
      const res = await fetch(
        API_URL + "user/" + uid + "/message/" + id + "/answer",
        {
          method,
          headers,
          body
        }
      );
      const obj = await res.json();
      return obj;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export const MessageProvider = new MessageController();
