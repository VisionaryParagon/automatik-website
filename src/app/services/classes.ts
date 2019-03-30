// SEO
export class Seo {
  title: string;
  metatags: Meta[];
}

export class Meta {
  name?: string;
  property?: string;
  content: string;
}

// Images
export class Image {
  _id?: string;
  path: string;
  alt: string;
  date: Date;
}

// Training Workshops
export class Workshop {
  _id?: string;
  title: string;
  meta_title: string;
  slug: string;
  description: string;
  keywords: string;
  logo: string;
  title_image_lg: string;
  title_image_md: string;
  title_image_sm: string;
  color: string;
  order: number;
  subhead: string;
  highlights: WorkshopHighlight[];
  quotes: Quote[];
}

export class WorkshopEvent {
  _id?: string;
  workshop: string;
  price: number;
  start_date: Date;
  end_date: Date;
  location: Location;
  schedule: Schedule[];
}

export class WorkshopHighlight {
  image: string;
  content: string;
}

export class Quote {
  quote: string;
  client: string;
}

export class Location {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export class Schedule {
  start: Date;
  end: Date;
}

export class WorkshopRegistration {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  workshop: string;
  workshop_date: Date;
  price: number;
  charge_id: string;
  reg_status: string;
  pmt_status: string;
  enrolled: Date;
  modified: Date;
}

// Portfolio
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

// Team
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

// Careers
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

// Email Subscriptions
export class Subscriber {
  _id?: string;
  name: string;
  email_address: string;
  status: string;
  timestamp_signup: Date;
}

// Contact Form
export class Contact {
  _id?: string;
  name: string;
  email: string;
  message: string;
  optin: boolean;
  captcha: string;
}

// Admin
export class Admin {
  username: string;
  password: string;
}
