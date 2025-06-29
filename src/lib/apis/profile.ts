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
export const getAdminProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/lawyer/profile`, {
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
export const getProfileLawyer = async ()=> {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/lawyer/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile data categories: ${response.status} ${response.statusText}`
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
export const updateProfileLawyer = async ({
  name,
  mobile,
  title,
  country_id,
  email,
  city_id,
  address,
  education,
  medals,
  legal_fields,
  languages,
  img,
}: ProfileFormDataLawyer) => {
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
    if (education) {
      formData.append("education", education);
    }
    if (medals) {
      formData.append("medals", medals);
    }

    formData.append("legal_fields", JSON.stringify(legal_fields));
    formData.append("languages", JSON.stringify(languages));

    if (img instanceof File) {
      formData.append("img", img);
    }

    const response = await fetch(`${API_URL}api/lawyer/profile`, {
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

//lawyer notification
export const getNotificationLawyer = async (
  page: number = 1,
  per_page: number = 10,
  role: number
) => {
  try {
    const user_type = role === 1 ? 'lawyer' : role === 2 ? 'user' : '';
    if (!user_type) {
      throw new Error('Invalid role provided');
    }

    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/${user_type}/notifications?page=${page}&per_page=${per_page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch notifications: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      total: data.total,
      current_page: data.current_page,
      last_page: data.last_page,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error fetching notifications',
      data: [],
      total: 0,
      current_page: 1,
      last_page: 1,
    };
  }
};

//user notification
export const getNotificationUser = async (
  page: number = 1,
  per_page: number = 10
): Promise<NotificationResponse> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/user/notifications?page=${page}&per_page=${per_page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile data categories: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error fetching blog notifications",
      data: {
        total:0,
        current_page: 1,
        data: [],
      }, 
    };
  }
};