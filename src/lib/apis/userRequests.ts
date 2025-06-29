"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestService = async ({
  first_name,
  last_name,
  mobile,
  email,
  message,
  summary,
  service_id,
  lawyer_id,
  files,
}: userRequest) => {
  const token = await getAuthToken();

  try {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("summary", summary);
    if (service_id) {
      formData.append("service_id", service_id);
    }
    if (lawyer_id) {
      formData.append("lawyer_id", lawyer_id);
    }
    if (files) {
      if (Array.isArray(files)) {
        files.forEach((file) => {
          formData.append("files[]", file);
        });
      } else {
        formData.append("files[]", files);
      }
    }
    const response = await fetch(`${API_URL}api/user/request-service`, {
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
