const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFooter = async () => {
  try {
    const response = await fetch(`${API_URL}api/setting`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch footer data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching footer data",
    };
  }
};

export const getPrivacyPolicy = async (): Promise<PrivacyPolicyResponse> => {
  try {
    const response = await fetch(`${API_URL}api/PrivacyPolicy`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch footer data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: {
        id: 0,
        content_ar: "",
        content_en: "",
      },
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching footer data",
    };
  }
};
export const getHowProcessWorks= async (): Promise<HowProcessWorksResponse> => {
  try {
    const response = await fetch(`${API_URL}api/how-the-process-work`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch footer data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: {
        id: 0,
        description_ar: "",
        description_en: "",
      },
      error:
        error instanceof Error
          ? error.message
          : "Unknown error fetching footer data",
    };
  }
};