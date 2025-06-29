const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { QueryFunctionContext } from "@tanstack/react-query";

export const sendContactForm = async ({
  name,
  mobile,
  email,
  subject,
  content,
}: ContactFormData) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("content", content);
    formData.append("subject", subject);
    const response = await fetch(`${API_URL}api/store-contact-us`, {
      method: "POST",
      headers: {
        'Accept': 'application/json'
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
export const getblogCategory = async (locale: string = "en") => {
  try {
    const response = await fetch(`${API_URL}api/get-blogCategory-web`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale, 
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blog categories",
    };
  }
};
export const getBlogs= async (id:number=1 ,page:number=1,limit:number=8 ,order:string="desc") => {
  try {
    const response = await fetch(`${API_URL}api/get-blogByCategory/${id}?page=${page}&limit=${limit}&order=${order} `, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; 
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blogs data",
    };
  }
};
export const getBlog= async (id:string) => {
  try {
    const response = await fetch(`${API_URL}api/get-blog/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blog data",
    };
  }
};
export const getAboutUs = async (locale: string = "en") => {
  try {
    const response = await fetch(`${API_URL}api/about-web`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale, 
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blog categories",
    };
  }
};
export const getHero = async (locale: string = "en"):Promise<HeroResponse> => {
  try {
    const response = await fetch(`${API_URL}api/info-section`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale, 
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blog categories",
    };
  }
};


export const fetchSearchResults = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<string[], number>): Promise<ApiResponse> => {
  const [, keyword, type, sortOption, legalFieldId, categoryId] = queryKey; 

  const params = new URLSearchParams({
    keyword: keyword || "",
    page: pageParam.toString(),
    per_page: "10",
    type: type || "blogs",
  });

  const optionalParams: { [key: string]: string } = {
    legal_field_id: legalFieldId || "",
    arrange_by_rate: sortOption === "highest_rated" ? "true" : "",
    arrange_by_score_point: sortOption === "most_active" ? "true" : "",
    category: categoryId || "",
  };

  Object.entries(optionalParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const response = await fetch(`https://asklawyer.evyx.lol/api/unified-search?${params}`, {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) throw new Error("Failed to fetch search results");

  const data = await response.json() as ApiResponse;
  return { ...data, success: data.success ?? false };
};