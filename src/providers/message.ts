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
}

export const MessageProvider = new MessageController();
