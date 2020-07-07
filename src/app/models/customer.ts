type ContractStatus = 'prospect' | 'existing' | 'dormant' | null;

export class Customer {
  id: number;
  contractStatus: ContractStatus;
  name: string;
  postalCode: string;
  prefectureName: string;
  city: string;
  address1: string;
  address2?: string;

  constructor(
    id: number,
    contractStatus: ContractStatus,
    name: string,
    postalCode: string,
    prefectureName: string,
    city: string,
    address1: string,
    address2?: string
  ) {
    this.id = id;
    this.contractStatus = contractStatus;
    this.name = name;
    this.postalCode = postalCode;
    this.prefectureName = prefectureName;
    this.city = city;
    this.address1 = address1;
    this.address2 = address2;
  }

  showContractStatus(): string {
    switch (this.contractStatus) {
      case 'prospect':
        return '見込み顧客';
      case 'existing':
        return '既存顧客';
      case 'dormant':
        return '休眠顧客';
    }
  }
}

export interface CustomerForRequest {
  contract_status: ContractStatus;
  name: string;
  postal_code: string;
  prefecture_id: number;
  city: string;
  address1: string;
  address2?: string;
}
