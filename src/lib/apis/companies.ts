const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies= async (rate:string="asc" ,page:number=1,limit:number=8 ,points:string="desc") => {
  try {
    const response = await fetch(`${API_URL}api/active-companies?rate=${rate}&page=${page}&per_page=${limit}&score_points=${points} `, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching blogs data",
    };
  }
};
export const getCompany = async (id: string): Promise<CompanyApiResponse> => {
  try {
    const response = await fetch(`${API_URL}api/active-companies/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lawyer data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error fetching lawyer data",
      data: null,
      error: error instanceof Error ? error.message : "Unknown error fetching lawyer data",
    };
  }
};