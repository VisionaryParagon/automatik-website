export class CareerPosition {
  _id?: String;
  position: String;
  description: String;
}

export class CareerInquiry {
  _id?: String;
  position: String;
  first_name: String;
  last_name: String;
  email: String;
  specialty?: String;
  start_date: Date;
  status: String;
  awesome: String;
}
