export interface IBaseResponse {
  error: 0 | 1;
  errorDetails: Record<any, any>;
  message: string;
}

export interface IPaginatorRequest {
  offset: number;
  limit: number;
  q?: string;
}

export interface IPaginatorResponse<T> {
  items: T[];
  count: number;
}

export interface IMenu {
  slug: string;
  title: string;
  icon?: JSX.Element;
}
