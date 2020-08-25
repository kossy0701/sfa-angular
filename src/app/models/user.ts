export class User {
  id: number;
  name: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  sex: string;
  administrator: string;
  disable: boolean;
  prefectureName: string;
  image: string;

  constructor(
    id: number,
    name: string,
    lastName: string,
    firstName: string,
    lastNameKana: string,
    firstNameKana: string,
    email: string,
    sex: string,
    administrator: string,
    disable: boolean,
    prefectureName: string,
    image?: string
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.firstName = firstName;
    this.lastNameKana = lastNameKana;
    this.firstNameKana = firstNameKana;
    this.email = email;
    this.sex = sex;
    this.administrator = administrator;
    this.disable = disable;
    this.prefectureName = prefectureName;
    this.image = image;
  }

  showSex(): string {
    return this.sex === 'male' ? '男' : '女';
  }

  showAdministrator(): string {
    return this.administrator ? '管理者' : '一般ユーザー';
  }
}

export interface UserForResponse {
  id: number;
  name: string;
  last_name: string;
  first_name: string;
  last_name_kana: string;
  first_name_kana: string;
  email: string;
  sex: string;
  administrator: string;
  disable: boolean;
  prefecture_name: string;
  image: string;
}
