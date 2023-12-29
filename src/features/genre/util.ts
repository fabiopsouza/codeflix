import { Results } from "../../types/Category";
import { Genre } from "../../types/Genres";

export const mapGenreToForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    categories_id: genre.categories?.map((category) => category.id),
  };
};

export const mapGenreCategories = (originalGenre: Genre, categories: Results) => {
  const genre = Object.assign({categories: []}, originalGenre);

  genre.categories_id?.forEach(categoryID => {
    const category = getCategory(categories, categoryID);
    if (category) {
      genre.categories.push(category);
    }
  });

  return genre;
};

const getCategory = (categories: Results, id: string) => {
  return categories?.items.find((cat) => cat.id === id);
}
