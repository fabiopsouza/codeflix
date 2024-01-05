import { CastMember } from "./CastMembers";
import { Category } from "./Category";
import { Genre } from "./Genres";

export type FileObject = {
  name: string;
  file: File;
};

export interface Results {
  current_page: number;
  per_page: number;
  total: number;
  items: VideoItem[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  opened: boolean;
  published: boolean;
  rating: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  video_file_url: string;
  thumb_file_url: string;
  banner_file_url: string;
  trailer_file_url: string;
  banner: ImageMedia;
  thumbnail: ImageMedia;
  thumbnail_half: ImageMedia;
  video: VideoMedia;
  trailer: VideoMedia;
  categories_id: string[];
  genres_id: string[];
  cast_members_id: string[];
  categories?: Category[];
  genres?: Genre[];
  cast_members?: CastMember[];
}

export interface ImageMedia {
  id: string;
  checksum: string;
  name: string;
  location: string;
}

export interface VideoMedia {
  id: string;
  checksum: string;
  name: string;
  location: string;
  encoded_location: string;
  status: string;
}

export interface VideoParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface VideoPayload {
  id?: string;
  title: string;
  rating: string;
  opened: boolean;
  published: boolean;
  duration: number;
  description: string;
  genres?: string[];
  year_launched: number;
  categories?: string[];
  cast_members?: string[];
}
