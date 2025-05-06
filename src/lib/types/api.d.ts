declare type DataBaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

declare type ErrorResponse = {
  error: string;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: Metadata;
} & T;

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
