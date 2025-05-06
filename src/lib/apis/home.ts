const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const response = await fetch(`${API_URL}api/get-blogCategory`, {
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
export const getBlogs= async (id:number=1 ,page:number=1) => {
  try {
    const response = await fetch(`${API_URL}api/get-blogByCategory/${id}?page=${page}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.data; 
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blogs data",
    };
  }
};
export const getBlog= async (id:number) => {
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