export class Customer {
  id: number;
  contractStatus: string;
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address1: string;
  address2: string;

  constructor(
    id: number,
    contractStatus: string,
    name: string,
    postalCode: string,
    prefecture: string,
    city: string,
    address1: string,
    address2: string
  ) {
    this.id = id;
    this.contractStatus = contractStatus;
    this.name = name;
    this.postalCode = postalCode;
    this.prefecture = prefecture;
    this.city = city;
    this.address1 = address1;
    this.address2 = address2;
  }
}
