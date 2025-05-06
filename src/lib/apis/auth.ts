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