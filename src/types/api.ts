// src/types/api.ts
import { AxiosResponse } from 'axios';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiResponse<T> extends AxiosResponse<T> { }