export class Seo {
  title: string;
  metatags: Meta[];
}

export class Meta {
  name?: string;
  property?: string;
  content: string;
}

export class Admin {
  username: string;
  password: string;
}

export class Subscriber {
  _id?: string;
  name: string;
  email_address: string;
  status: string;
  timestamp_signup: Date;
}

export class Contact {
  _id?: string;
  name: string;
  email: string;
  message: string;
  optin: boolean;
  captcha: string;
}

export class NewsArticle {
  _id?: string;
  url: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  source: string;
}

export class CareerPosition {
  _id?: string;
  position: string;
  description: string;
  short_description: string;
}

export class CareerInquiry {
  _id?: string;
  position: string;
  first_name: string;
  last_name: string;
  email: string;
  specialty?: string;
  start_date: Date;
  status: string;
  awesome: string;
  captcha: string;
}

export class Department {
  _id?: string;
  name: string;
  rank: number;
}

export class Teammate {
  _id?: string;
  first_name: string;
  last_name: string;
  pseudoname: string;
  title: string;
  department: string;
  seniority: Date;
  bio: string;
  primary_image: string;
  secondary_image: string;
}

export class Image {
  _id?: string;
  path: string;
  alt: string;
  date: Date;
}

export class Project {
  _id?: string;
  title: string;
  meta_title: string;
  slug: string;
  description: string;
  keywords: string;
  category: string;
  date: Date;
  title_image_lg: string;
  title_image_md: string;
  title_image_sm: string;
  headline: string;
  copy: string;
  logo?: string;
  featured_image: string;
  highlights: string[];
  images: string[];
}
