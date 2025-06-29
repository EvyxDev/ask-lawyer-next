//auth.ts
"use server";

import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//lawyer
export const forgotPasswordlawyer = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(`${API_URL}api/auth/reset-password-lawyer`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const otpcheckLawyer = async (email: string, otp: number) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp.toString());

    const response = await fetch(`${API_URL}api/auth/otp-check-lawyer`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const newPasswordLawyer = async (
  email: string,
  password: number,
  password_confirmation: number
) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password.toString());
    formData.append("password_confirmation", password_confirmation.toString());

    const response = await fetch(`${API_URL}api/auth/new-password-lawyer`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const registerlawyer = async (
  email: string,
  password: string,
  password_confirmation: string,
  name: string,
  title: string,
  mobile: string,
  address: string,
  city_id: string,
  country_id: string,
  type: string,
  account_type: string,
  registration_number: string,
  education: string,
  medals: string,
  languages: number[],
  legal_fields: number[],
  photo_union_card?: File | null,
  img?: File | null,
  card_id_img?: File | null,
  photo_passport?: File | null,
  photo_office_rent?: File | null,
  parent_id?: string,
  name_company?: string,
  bio_company?: string,
  website_company?: string,
  address_company?: string,
  country_id_company?: string,
  city_id_company?: string,
  linked_in_company?: string
) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("name", name);
    formData.append("title", title);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("city_id", String(city_id));
    formData.append("country_id", String(country_id));
    formData.append("type", type);
    formData.append("account_type", account_type);
    formData.append("registration_number", registration_number);
    formData.append("education", education);
    formData.append("medals", medals);
    languages.forEach((languageId) => {
      formData.append("languages", String(languageId));
    });
    legal_fields.forEach((legalId) => {
      formData.append("legal_fields", String(legalId));
    });
    if (name_company) formData.append("name_company", name_company);
    if (bio_company) formData.append("bio_company", bio_company);
    if (website_company) formData.append("website_company", website_company);
    if (address_company) formData.append("address_company", address_company);
    if (country_id_company) formData.append("country_id_company", country_id_company);
    if (city_id_company) formData.append("city_id_company", city_id_company);
    if (linked_in_company) formData.append("linked_in_company", linked_in_company);
    if (parent_id) formData.append("parent_id", parent_id);

    // إضافة الصور بس لو كانت موجودة ومن نوع File
    if (img instanceof File) formData.append("img", img);
    if (photo_union_card instanceof File) formData.append("photo_union_card", photo_union_card);
    if (type === "3") {
      // إضافة الحقول الإضافية بس لو النوع Consultant (type=3)
      if (card_id_img instanceof File) formData.append("card_id_img", card_id_img);
      if (photo_passport instanceof File) formData.append("photo_passport", photo_passport);
      if (photo_office_rent instanceof File) formData.append("photo_office_rent", photo_office_rent);
    }

    const response = await fetch(`${API_URL}api/auth/register-lawyer`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors));
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const OtpregisterLawyer = async (email: string, otp: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    const response = await fetch(`${API_URL}api/auth/otp-check-lawyer`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
//user
export const registerUser = async (
  email: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    const response = await fetch(`${API_URL}api/auth/register-user`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const OtpregisterUser = async (email: string, otp: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    const response = await fetch(`${API_URL}api/auth/otp-check-user`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const forgotPasswordUser = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(`${API_URL}api/auth/reset-password-user`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const otpcheckUser = async (email: string, otp: number) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp.toString());

    const response = await fetch(`${API_URL}api/auth/otp-check-user`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const newPasswordUser = async (
  email: string,
  password: number,
  password_confirmation: number
) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password.toString());
    formData.append("password_confirmation", password_confirmation.toString());

    const response = await fetch(`${API_URL}api/auth/new-password-user`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const changePassword = async ({
  current_password,
  new_password,
  new_password_confirmation,
}: changePassword) => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("No authentication token provided");
    }
    const response = await fetch(`${API_URL}api/user/change-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password,
        new_password,
        new_password_confirmation,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    const err = error as Error;
    throw err;
  }
};
