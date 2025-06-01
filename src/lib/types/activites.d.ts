// Interface for the overall response
interface ActivitiesResponse {
  success: boolean;
  message:string;
  data: {
    data: {
      current_page: number;
      data: HireRequest[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: PaginationLink[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    } | null;
  } | null;

  error?: string;
}
interface HireRequest {
  id: number;
    created_at: string;
    first_name: string;
    last_name: string;
    message: string;
    service_id: number;
    user_id: number;
    lawyer_id: string;
    status: string;
    summary: string;
    accepted_by: number | null;
    is_rated: number;
    service: Service;
    files?: string[];
 
}
interface HireRequestResponse {
  success: boolean;
  message: string;
  data: HireRequest;
  error?: string;
}
interface Service {
  id: number;
  name: string;
  description: string;
  translations: Translation[];
}

interface Translation {
  id: number;
  platform_services_id: number;
  locale: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
