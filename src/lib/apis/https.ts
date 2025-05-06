
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFooter = async ():Promise<BlogCategoryResponse> => {
  try {
    const response = await fetch(`${API_URL}api/setting`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error fetching footer data",
    };
  }
};