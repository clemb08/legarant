import { User } from "./user";

export class Contract {

  id: string;
  contractnumber: string;
  startdate: Date;
  status: string;
  user: User;
  enddate: Date;

  constructor(number?: string, startDate?: Date, termDate?: Date, status?: string) {
    this.contractnumber = number;
    this.startdate = startDate;
    this.enddate = termDate;
    this.status = status
  }
}