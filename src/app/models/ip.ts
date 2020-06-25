export class Ip {
  id: number;
  content: string;
  settedAt: string;

  constructor(id: number, content: string, settedAt: string) {
    this.id = id;
    this.content = content;
    this.settedAt = settedAt;
  }
}
