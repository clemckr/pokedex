import ApiResource from './ApiResource';

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResource[];
}

export default ApiResponse;
