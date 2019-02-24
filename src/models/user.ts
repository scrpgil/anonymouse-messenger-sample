export class User {
  uid: string;
  name: string;
  email: string;
  icon: string;
  created: string;

  constructor(fields: any) {
    for (const f of Object.keys(fields)) {
      this[f] = fields[f];
    }
  }
}
