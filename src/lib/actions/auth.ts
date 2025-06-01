"use server";

import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const logout = async () => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('لم يتم العثور على التوكن');
    }

    const response = await fetch(`${API_URL}api/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'فشل تسجيل الخروج');
    }



    return {
      success: true,
      data,
      message: 'تم تسجيل الخروج بنجاح',
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('خطأ غير معروف أثناء تسجيل الخروج');
  }
};