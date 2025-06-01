"use server";
import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/user/show-profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog categories: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching blog categories",
    };
  }
};
export const updateProfile = async ({
  name,
  mobile,
  title,
  country_id,
  email,
  city_id,
  address,
  img,
}: ProfileFormData) => {
  const token = await getAuthToken();

  try {
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (email) {
      formData.append("email", email);
    }
    formData.append("mobile", mobile);
    formData.append("title", title);
    formData.append("country_id", country_id);
    formData.append("city_id", city_id);
    formData.append("address", address);
    if (img instanceof File) {
      formData.append("img", img);
    }
    const response = await fetch(`${API_URL}api/user/update-profile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
