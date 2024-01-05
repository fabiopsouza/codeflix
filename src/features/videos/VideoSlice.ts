import { apiSlice } from "../api/apiSlice";
import {
  ImageMedia,
  VideoMedia,
  Results,
  Video,
  VideoParams,
  VideoPayload,
} from "../../types/Videos";
import { Results as CategoriesResults } from "../../types/Category";
import { Results as GenresResults } from "../../types/Genres";
import { Results as CastMembersResults } from "../../types/CastMembers";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  rating: "",
  duration: 0,
  opened: false,
  published: false,
  banner: {} as ImageMedia,
  thumbnail: {} as ImageMedia,
  thumbnail_half: {} as ImageMedia,
  video: {} as VideoMedia,
  trailer: {} as VideoMedia,
  deleted_at: "",
  created_at: "",
  updated_at: "",
  description: "",
  year_launched: 0,
  genres_id: [],
  categories_id: [],
  cast_members_id: [],
  genres: [],
  categories: [],
  cast_members: [],
  thumb_file_url: "",
  video_file_url: "",
  banner_file_url: "",
  trailer_file_url: "",
};

function parseQueryParams(params: VideoParams) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value.toString());
    }
  });

  return query.toString();
}

const getVideos = ({ page = 0, perPage = 10, search = "" }: VideoParams) => {
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search })}`;
};

function deleteVideo({ id }: { id: string }) {
  return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

function getVideo({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateVideo(video: VideoPayload) {
  return {
    url: `${endpointUrl}/${video.id}`,
    method: "PUT",
    body: video,
  };
}
function createVideo(video: VideoPayload) {  
  return {
    url: endpointUrl,
    method: "POST",
    body: video,
  };
}

function getAllCategories() {
  return `categories?all=true`;
}

function getAllGenres() {
  return `genres?all=true`;
}

function getAllCastMembers() {
  return `cast_members?all=true`;
}

export const videosSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createVideo: mutation<Video, VideoPayload>({
      query: createVideo,
      invalidatesTags: ["Videos"],
    }),
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    updateVideo: mutation<Video, VideoPayload>({
      query: updateVideo,
      invalidatesTags: ["Videos"],
    }),
    getVideo: query<Video, { id: string }>({
      query: getVideo,
      providesTags: ["Videos"],
    }),

    getAllCategories: query<CategoriesResults, void>({
      query: getAllCategories,
      providesTags: ["Categories"],
    }),

    getAllGenres: query<GenresResults, void>({
      query: getAllGenres,
      providesTags: ["Genres"],
    }),

    getAllCastMembers: query<CastMembersResults, void>({
      query: getAllCastMembers,
      providesTags: ["CastMembers"],
    }),

    deleteVideo: mutation<Video, { id: string }>({
      query: deleteVideo,
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useGetAllGenresQuery,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetAllCategoriesQuery,
  useGetAllCastMembersQuery,
  useCreateVideoMutation,
} = videosSlice;
