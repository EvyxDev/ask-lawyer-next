const API_URL = process.env.NEXT_PUBLIC_API_URL;
//user
export const getRequests = async (
  locale: string = "ar",
  type:string,
  page: number = 1,
  per_page: number = 10,
  order: string = "desc",
) => {
  try {
    const response = await fetch(
      `/api/user-requests?type=${type}&page=${page}&per_page=${per_page}&order=${order}`,
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
export const getRequest = async (
  locale: string = "ar",
  id: string |undefined,
  token: string |null
) => {
  try {
    const response = await fetch(
      `${API_URL}api/user/request/${id}`,
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
//lawyer
export const getRequestsLawyer = async (
  locale: string = "ar",
  type:string,
  page: number = 1,
  per_page: number = 10,
  order: string = "desc",
) => {
  try {
    const response = await fetch(
      `/api/lawyer-requests?type=${type}&page=${page}&per_page=${per_page}&order=${order}`,
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
export const getRequestLawyer = async (
  locale: string = "ar",
  type:string,
  id: string |undefined,
  token: string |null,
 
) => {
  try {
    const response = await fetch(
      `${API_URL}api/lawyer/lawyer-request/${type}/${id}`,
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