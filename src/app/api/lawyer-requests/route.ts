import { getAuthToken } from "@/lib/utils/auth-token";

import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "10";
    const order = searchParams.get("order") || "desc";
    const locale = request.headers.get("accept-language") || "ar";
    const userToken = await getAuthToken();

    // Fetch hire requests
    const response = await fetch(
      `${API_URL}api/lawyer/lawyer-requests?type=${type}&page=${page}&per_page=${per_page}&order=${order}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to fetch hire requests: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error fetching lawyer requests",
      },
      { status: 500 }
    );
  }
}
