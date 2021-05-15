export class User {
  [x: string]: string;

  id: string;
  name: string;
  username: string;
  email: string | null;
  title: string | null;
  phone: string | null;
  mobile: string | null;

  constructor(name?: string, username?: string, email?: string, title?: string, phone?: string, mobile?: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.title = title;
    this.phone = phone;
    this.mobile = mobile;
  }
}
