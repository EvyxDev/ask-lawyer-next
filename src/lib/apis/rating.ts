"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const rateServiceRequest = async (
  id: string,
  rating: string,
  message: string
) => {
  try {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("message", message);
    const response = await fetch(
      `${API_URL}api/user/rate-service-request/${id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const rateUsersRequest = async (
  id: string,
  rating: string,
  message: string
) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}api/user/rate-request/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating,
        message,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};


export const acceptHireEmployee = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/lawyer/accept-hire-request/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const completeHireEmployee = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/lawyer/complete-hire-request/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};

export const acceptRequest = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/lawyer/accept-request/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const completeRequest = async (id: string, answer?: string) => {
  try {
    const token = await getAuthToken();
    const formData = new FormData();

    if (answer) {
      formData.append("answer", answer);
    }
    const response = await fetch(
      `${API_URL}api/lawyer/complete-request/${id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
