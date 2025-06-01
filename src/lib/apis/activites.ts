const API_URL = process.env.NEXT_PUBLIC_API_URL;

// src/lib/apis/activites.ts
export const getHireRequests = async (
  locale: string = "ar",
  page: number = 1,
  per_page: number = 10,
  order: string = "desc"
): Promise<ActivitiesResponse> => {
  try {
    const response = await fetch(
      `/api/hire-requests?page=${page}&per_page=${per_page}&order=${order}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Accept-Language": locale,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch hire requests: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching hire requests",
    };
  }
};

export const getHireRequest = async (
  locale: string = "ar",
  id: string,
  token: string |null
) => {
  try {
    const response = await fetch(
      `${API_URL}api/user/hire-request/${id}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching blog categories",
    };
  }
};
