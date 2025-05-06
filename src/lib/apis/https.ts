const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFooter = async () => {
  try {
    const response = await fetch(`${API_URL}api/setting`, {
      method: "GET",
      cache: "no-cache",
      signal: AbortSignal.timeout(5000), // 5-second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching footer data",
    };
  }
};