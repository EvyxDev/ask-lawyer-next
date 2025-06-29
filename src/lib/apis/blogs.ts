"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (
  page: number = 1,
  limit: number = 8,
  order: string = "desc"
) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/get-my-blogs?page=${page}&limit=${limit}&order=${order}`,
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
        `Failed to fetch blogs  ${response.status} ${response.statusText}`
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
export const getBlog = async (
  id: string 
): Promise<BlogDetailsResponse> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/get-blog-active-or-not/${id}`,
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
        `Failed to fetch blogs  ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: {} as BlogDetails, 
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching blog",
    };
  }
};
export const DeleteBlog = async ( id:string) => {
  const token = await getAuthToken();
  try {
   
    const response = await fetch(`${API_URL}api/delete-blog/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
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
export const addBlogMethod = async ({
  title,
  description,
  country_id,
  blog_category_id,
  img,
}: BlogFormData) => {
  const token = await getAuthToken();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("country_id", country_id);
    formData.append("blog_category_id", blog_category_id);
    if (img) {
      formData.append("img", img);
    }
    const response = await fetch(`${API_URL}api/add-blog`, {
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
export const updateBlogMethod = async ({
  id,
  title,
  description,
  country_id,
  blog_category_id,
  img,
}: BlogFormData) => {
  const token = await getAuthToken();

  try {
    const formData = new FormData();

    formData.append("title", title);

    if (description) {
      formData.append("description", description);
    }
    formData.append("country_id", country_id);
    formData.append("blog_category_id", blog_category_id);
    if (img instanceof File) {
      formData.append("img", img);
    }
    const response = await fetch(`${API_URL}api/update-blog/${id}`, {
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
