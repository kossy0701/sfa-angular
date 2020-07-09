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
    prefectureName: string
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
  }

  showSex(): string {
    return this.sex === 'male' ? '男' : '女';
  }

  showAdministrator(): string {
    return this.administrator ? '管理者' : '一般ユーザー';
  }
}
