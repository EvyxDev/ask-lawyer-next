"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getChats = async ({chatId}:{chatId:string | undefined}) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}api/chat/${chatId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs  ${response.status} ${response.statusText}`
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
export const sendMessageUser = async (messageData: {
  senderable_type: string;
  senderable_id: number;
  receiverable_type: string;
  receiverable_id: number;
  message: string;
  request_id: number;
  request_source: string;
  sender: string;
}) => {
  const response = await fetch(`${API_URL}api/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};