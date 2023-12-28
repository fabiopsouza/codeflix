// {
//   "current_page": 0,
//   "per_page": 10,
//   "total": 2,
//   "items": [
//       {
//           "id": "d1667ae68bf84a7baf183b2a3dd8da3a",
//           "name": "Documentário",
//           "description": null,
//           "is_active": true,
//           "created_at": "2023-12-25T19:16:25.669429Z",
//           "deleted_at": null
//       },
//       {
//           "id": "6c4a09105bf04444ae4380fcbc41cda0",
//           "name": "Filme",
//           "description": "A categoria mais assistida",
//           "is_active": true,
//           "created_at": "2023-12-25T19:16:15.938032Z",
//           "deleted_at": null
//       }
//   ]
// }

export interface Results {
  current_page: number;
  per_page: number;
  total: number;
  items: Category[];
}

export interface Category {
  id: string;
  name: string;
  deleted_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
