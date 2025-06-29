// Interfaces
interface ApiMessage {
  id: number;
  message: string;
  senderable_type: string;
  senderable_id: number;
  receiverable_type: string;
  receiverable_id: number;
  is_read: boolean;
  is_sent_by_me: boolean;
  timestamp: string;
}

interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    room_id: number;
    senderable_type: string;
    senderable_id: number;
    receiverable_type: string;
    receiverable_id: number;
    body: string;
    read_at: string | null;
    request_id: number;
    request_source: string;
    updated_at: string;
    created_at: string;
  };
}

interface ActivitiesResponse {
  success: boolean;
  messages: ApiMessage[];
}

interface FirebaseMessage {
  id?: string;
  message: string;
  senderable_type: string;
  senderable_id: number;
  receiverable_type: string;
  receiverable_id: number;
  is_read: boolean;
  is_sent_by_me: boolean;
  timestamp: number;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}


interface RequestResponse {
  success: boolean;
  data: {
    accepted_by: number;
    // أي خصائص تانية زي current_page, data: HireRequest[], إلخ
  } | null;
}