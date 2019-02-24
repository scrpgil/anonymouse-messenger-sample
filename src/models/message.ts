export class Message {
  id: string;
  message: string;
  created: string;
  updated: string;
  answer: string;
  answered: boolean;

  constructor(fields: any) {
    for (const f of Object.keys(fields)) {
      this[f] = fields[f];
    }
  }
}
