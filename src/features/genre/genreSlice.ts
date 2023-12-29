import { Results as CategoryResults } from "../../types/Category";
import {
  Genre,
  GenreParams,
  GenrePayload,
  Results
} from "../../types/Genres";
import { apiSlice } from "../api/apiSlice";
const endpointUrl = "/genres";

export const initialState = {
  id: "",
  name: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  isActive: false,
  categories: [],
  description: "",
  pivot: { genre_id: "", category_id: "" },
};

function parseQueryParams(params: GenreParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getGenres({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteGenreMutation({ id }: { id: string }) {
  return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

function createGenreMutation(genre: GenrePayload) {
  return { url: endpointUrl, method: "POST", body: genre };
}

function getGenre({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayload) {
  return { url: `${endpointUrl}/${genre.id}`, method: "PUT", body: genre };
}

function getCategories() {
  // return `/categories?all=true`;
  return `/categories?page=0&per_page=100&is_active=true`; // API versão Java não tem a opção all
}

export const genreSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCaTegories: query<CategoryResults, void>({
      query: getCategories,
    }),
    getGenre: query<Genre, { id: string }>({
      query: getGenre,
      providesTags: ["Genres"],
    }),
    updateGenre: mutation<Genre, GenrePayload>({
      query: updateGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: mutation<Genre, { id: string }>({
      query: deleteGenreMutation,
      invalidatesTags: ["Genres"],
    }),

    getGenres: query<Results, GenreParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useDeleteGenreMutation,
  useGetGenreQuery,
  useGetCaTegoriesQuery,
  useUpdateGenreMutation,
  useCreateGenreMutation,
} = genreSlice;
