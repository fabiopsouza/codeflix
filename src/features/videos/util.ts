import { CastMember, Results as CastMembersResults } from "../../types/CastMembers";
import { Category, Results as CategoryResults } from "../../types/Category";
import { Genre, Results as GenresResults } from "../../types/Genres";
import { Video, VideoPayload } from "../../types/Videos";

export function mapVideoToForm(video: Video): VideoPayload {
  return {
    id: video.id,
    title: video.title,
    rating: video.rating,
    opened: video.opened,
    duration: video.duration,
    description: video.description,
    year_launched: video.year_launched,
    published: true,
    genres: video.genres?.map((genre) => genre.id),
    categories: video.categories?.map((category) => category.id),
    cast_members: video.cast_members?.map((cast_member) => cast_member.id),
  };
}

export function mapVideoSlices(
  originalVideo: Video,
  genres: GenresResults,
  castMembers: CastMembersResults,
  categories: CategoryResults
): Video {

  const video = Object.assign({
    genres: [],
    cast_members: [],
    categories: [],
  }, originalVideo);

  video.genres_id?.forEach(id => {
    const genre = getGenre(genres, id);
    if (genre) {
      video.genres.push(genre as Genre);
    }
  });

  video.cast_members_id?.forEach(id => {
    const item = getCastMember(castMembers, id);
    if (item) {
      video.cast_members.push(item as CastMember);
    }
  });

  video.categories_id?.forEach(id => {
    const category = getCategory(categories, id);
    if (category) {
      video.categories.push(category as Category);
    }
  });

  return video;
}

const getGenre = (result: GenresResults, id: string) => {
  return result.items.find((item) => item.id === id);
}

const getCastMember = (result: CastMembersResults, id: string) => {
  return result.items.find((item) => item.id === id);
}

const getCategory = (result: CategoryResults, id: string) => {
  return result.items.find((item) => item.id === id);
}