export class CreateUserDto {}
// google-login.dto.ts
export class GoogleLoginDto {
  idToken: string;
  roles: 'user'|'student';
}