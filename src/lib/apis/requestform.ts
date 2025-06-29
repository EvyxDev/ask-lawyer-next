
const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
  token,
}: RequestFormData & { token: string | null }) => {
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
export const getCountries = async (
  locale: string = "en"
): Promise<CountriesResponse> => {
  try {
    const response = await fetch(`${API_URL}api/countries`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale,
      },
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
export const getActiveCompanies = async (
  locale: string = "en"
): Promise<CountriesResponse> => {
  try {
    const response = await fetch(`${API_URL}api/auth/active-companies-for-register`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale,
      },
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
          : "Unknown error fetching active companies",
    };
  }
};
export const getCities = async (
  locale: string = "en",
  country:string
): Promise<CountriesResponse> => {
  try {
    const response = await fetch(`${API_URL}api/countries/${country}/cities`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale,
      },
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
export const getlegalFileds = async (
  locale: string = "en"
): Promise<LanguageResponse> => {
  try {
    const response = await fetch(`${API_URL}api/legalFileds`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale,
      },
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
      success: false,
      message: "Failed to fetch languages",
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching languages",
    };
  }
};
export const getLanguages = async (
  locale: string = "en"
): Promise<LanguageResponse> => {
  try {
    const response = await fetch(`${API_URL}api/languages`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": locale,
      },
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
      success: false,
      message: "Failed to fetch languages",
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching languages",
    };
  }
};
export const getLawyers = async (): Promise<LawyersResponse> => {
  try {
    const response = await fetch(`${API_URL}api/getLawyers`, {
      method: "GET",
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
      success: false,
      message: "Failed to fetch languages",
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching languages",
    };
  }
};
