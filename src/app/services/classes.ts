export class CareerPosition {
  _id?: String;
  position: String;
  description: String;
  short_description: String;
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

export class Department {
  _id?: String;
  name: String;
  rank: Number;
}

export class Teammate {
  _id?: String;
  first_name: String;
  last_name: String;
  pseudoname: String;
  title: String;
  department: String;
  seniority: Date;
  bio: String;
  primary_image: String;
  secondary_image: String;
}
