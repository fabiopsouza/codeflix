export interface Results {
  current_page: number;
  per_page: number;
  total: number;
  items: CastMember[];
}

export interface CastMember {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
