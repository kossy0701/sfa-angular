export class Contact {
  id: number;
  contactedAt: string;
  way: string;
  purpose: string;
  subject: string;
  content: string;
  target: string;
  createdAt: string;

  constructor(
    id: number,
    contactedAt: string,
    way: string,
    purpose: string,
    subject: string,
    content: string,
    target: string,
    createdAt: string
  ) {
    this.id = id;
    this.contactedAt = contactedAt;
    this.way = way;
    this.purpose = purpose;
    this.subject = subject;
    this.content = content;
    this.target = target;
    this.createdAt = createdAt;
  }
}

export interface ContactForRequest {
  contactedAt: string;
  way: string;
  purpose: string;
  subject: string;
  content: string;
  target: string;
}

export interface ContactForResponse {
  id: number;
  contacted_at: string;
  way: string;
  purpose: string;
  subject: string;
  content: string;
  target: string;
  created_at: string;
}
