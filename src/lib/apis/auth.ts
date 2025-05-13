//auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  export const forgotPasswordlawyer = async (email: string) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
  
      const response = await fetch(`${API_URL}api/auth/reset-password-lawyer`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };
  export const otpcheckLawyer = async (email: string ,otp:number) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp.toString());

      const response = await fetch(`${API_URL}api/auth/otp-check-lawyer`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };
  export const newPasswordLawyer = async (email: string ,password:number ,password_confirmation:number) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password.toString());
      formData.append("password_confirmation", password_confirmation.toString());

      const response = await fetch(`${API_URL}api/auth/new-password-lawyer`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };

  //user
  export const forgotPasswordUser = async (email: string) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
  
       const response = await fetch(`${API_URL}api/auth/reset-password-user`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };
  export const otpcheckUser = async (email: string ,otp:number) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp.toString());

      const response = await fetch(`${API_URL}api/auth/otp-check-user`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };
  export const newPasswordUser = async (email: string ,password:number ,password_confirmation:number) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password.toString());
      formData.append("password_confirmation", password_confirmation.toString());

      const response = await fetch(`${API_URL}api/auth/new-password-user`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      throw error instanceof Error ? error : new Error("خطأ غير معروف");    }
  };