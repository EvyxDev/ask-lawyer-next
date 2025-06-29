declare type RegisterFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone?: string;
  gender: "male" | "female";
};

declare type ForgotPasswordFields = {
  email: string;
};
declare type RegisterUserType = {
 email: string;
  password: string;
  password_confirmation: string;
};
declare type LoginResponse = User;

declare interface changePassword  {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};