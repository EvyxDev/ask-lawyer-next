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

declare type LoginResponse = User;
