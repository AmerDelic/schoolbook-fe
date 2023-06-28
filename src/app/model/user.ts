export class User {
  public id: number = 0;
  public username: string = '';
  public password: string = '';
  public publicId: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public profileImageUrl: string = '';
  public lastLoginDate?: Date;
  public lastLoginDateDisplay?: Date;
  public role: string = '';
  public authorities: [] = [];
  public enabled: boolean = false;
  public nonLocked: boolean = false;
  public createdAt?: Date;
}