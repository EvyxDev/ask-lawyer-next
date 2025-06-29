"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { getAuthToken } from "@/lib/utils/auth-token";

export const sendRequestForm = async ({
  name,
  mobile,
  country_id,
  lang_id,
  email,
  message,
  type,
  lawyer_id,
  lawyer_type,
}: RequestFormData) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token provided");
  }

  try {
    const response = await fetch(`${API_URL}api/user/store-request`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        country_id,
        lang_id,
        message,
        type,
        lawyer_id,
        lawyer_type,
      }),
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
export const sendRequestPrice = async ({
  request_id,
  price,
  message,
}: sendRequestPriceRequest) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token provided");
  }

  try {
    const formData = new FormData();
    formData.append("request_id", request_id);
    formData.append("price", price.toString());
    formData.append("message", message);
    const response = await fetch(
      `${API_URL}api/lawyer/submit-offer-price-list`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

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
// lawyer
export const getRequestPriceOffersLawyer = async (
  locale: string = "ar",
  page: number = 1,
  per_page: number = 10,
  order: string = "desc"
)=> {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `/api/price-list-requests?page=${page}&per_page=${per_page}&order=${order}`,
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
export const getRequestPriceOfferLawyer = async (
  locale: string = "ar",
  id: string
) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/lawyer/price-list-request/${id}`,
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
      throw new Error(`${response.status} ${response.statusText}`);
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
//user
export const getRequestPriceOffersUser = async (
  locale: string = "ar",
  page: number = 1,
  per_page: number = 10,
  order: string = "desc"
)=> {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `/api/user/price-list-request?page=${page}&per_page=${per_page}&order=${order}`,
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
export const getRequestPriceOfferUser = async (
  locale: string = "ar",
  id: string
) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/lawyer/price-list-request/${id}`,
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
      throw new Error(`${response.status} ${response.statusText}`);
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

//platform-services user
export const getPlatformServices = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/user/platform-services`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
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
export const getPlatformService = async (locale: string = "ar", id: string , lawyer_id?:string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${API_URL}api/user/platform-service/${id}?locale=${locale}&lawyer_id=${lawyer_id}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
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
export const getsuggestedLawyers = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/user/lawyer-offers/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
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

//platform-services lawyer
export const getPlatformLawyerServices = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/lawyer/platform-services`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
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
export const AcceptedLawyerServices = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/lawyer/accepted-platform-service`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
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
export const acceptService = async (platform_service_id: string, price: string) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token provided");
  }

  try {
    const formData = new FormData();
    formData.append("platform_service_id", platform_service_id);
    formData.append("price", price);

    const response = await fetch(`${API_URL}api/lawyer/add-platform-service`, {
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

