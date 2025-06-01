declare interface BlogCategory {
    id: number;
    is_activate: number;
    name: string;
  }
  interface BlogCategoryResponse {
    success: boolean;
    data: BlogCategory[];
    error?: string;
  }
  declare interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    created_at?: string;
    views:number;
    country_id?:number;
  }
  declare interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  declare interface PaginationData {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  }
  declare interface ApiResponse {
    success: boolean;
    data: PaginationData;
  }
  declare interface BlogFetchResult {
    data: Blog[] | null;
    pagination?: PaginationData;
    error?: string;
  }
  declare interface BlogDetails {
    id: number;
    image: string;
    title: string;
    description: string;
    country_id: number;
    views: number;
    status: number;
    blog_category_id: number;
    added_by: {
      name: string;
      image: string;
    };
    created_at: string;
    updated_at: string;
  }
  declare interface BlogDetailsResponse {
    success: boolean;
    data: BlogDetails;
  }
