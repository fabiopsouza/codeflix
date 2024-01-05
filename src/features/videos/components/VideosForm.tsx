import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";
import { InputFile } from "../../../components/InputFile";
import { RatingsList } from "../../../components/RatingsList";
import { CastMember } from "../../../types/CastMembers";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genres";
import { FileObject, Video } from "../../../types/Videos";

type Props = {
  video: Video;
  genres?: Genre[];
  categories?: Category[];
  castMembers?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (name: string, value: any) => void;
  handleAddFile: ({ name, file }: FileObject) => void;
  handleRemoveFile: (name: string) => void;
};

export function VideosForm({
  video,
  genres,
  categories,
  castMembers,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleAddFile,
  handleRemoveFile,
}: Props) {

  const handleAddThumbnail = (file: File) => {
    handleAddFile({ name: "THUMBNAIL", file });
  };

  const handleRemoveThumbnail = () => {
    handleRemoveFile("THUMBNAIL");
  };

  const handleAddBanner = (file: File) => {
    handleAddFile({ name: "BANNER", file });
  };

  const handleRemoveBanner = () => {
    handleRemoveFile("BANNER");
  };

  const handleAddTrailer = (file: File) => {
    handleAddFile({ name: "TRAILER", file });
  };

  const handleRemoveTrailer = () => {
    handleRemoveFile("TRAILER");
  };

  const handleAddVideo = (file: File) => {
    handleAddFile({ name: "VIDEO", file });
  };

  const handleRemoveVideo = () => {
    handleRemoveFile("VIDEO");
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            <FormControl fullWidth>
              <TextField
                name="title"
                label="Title"
                value={video.title}
                disabled={isDisabled}
                onChange={(e) => handleChange('title', e.target.value)}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                minRows={4}
                name="description"
                label="Description"
                disabled={isDisabled}
                onChange={(e) => handleChange('description', e.target.value)}
                value={video.description}
                inputProps={{ "data-testid": "description" }}
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    name="year_launched"
                    label="Year Launched"
                    disabled={isDisabled}
                    onChange={(e) => handleChange('year_launched', parseInt(e.target.value))}
                    value={video.year_launched}
                    inputProps={{ "data-testid": "year_launched" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    name="duration"
                    label="Duration"
                    disabled={false}
                    value={video.duration}
                    onChange={(e) => handleChange('duration', parseInt(e.target.value, 10))}
                    inputProps={{ "data-testid": "duration" }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteFields
                name="cast_members"
                label="Cast Members"
                isLoading={isLoading}
                isDisabled={isDisabled}
                values={video.cast_members}
                options={castMembers}
                handleChange={(e) => handleChange('cast_members', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                alignContent={"center"}
                justifyContent={"space-between"}
                spacing={2}
              >
                <Grid item xs={5}>
                  <AutoCompleteFields
                    name="genres"
                    label="Genres"
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    values={video.genres}
                    options={genres}
                    handleChange={(e) => handleChange('genres', e.target.value)}
                  />
                </Grid>

                <Grid item xs={5}>
                  <AutoCompleteFields
                    name="categories"
                    label="Categories"
                    isLoading={isLoading}
                    isDisabled={false}
                    values={video.categories}
                    options={categories}
                    handleChange={(e) => handleChange('categories', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            <FormControl fullWidth>
              <Box mt={2} mb={2}>
                <FormLabel component="legend">Rating</FormLabel>
              </Box>
              <RadioGroup
                row
                name="rating"
                value={video.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
              >
                <RatingsList isDisabled={isDisabled} />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <InputFile
                onAdd={handleAddThumbnail}
                onRemove={handleRemoveThumbnail}
                placeholder="Thumbnail"
                data-testid="thumbnail-input"
              />
              <InputFile
                onAdd={handleAddBanner}
                onRemove={handleRemoveBanner}
                placeholder="Banner"
                data-testid="banner-input"
              />
            </FormControl>

            <FormControl fullWidth>
              <InputFile
                onAdd={handleAddVideo}
                onRemove={handleRemoveVideo}
                placeholder="Video"
                data-testid="video-input"
              />
              <InputFile
                onAdd={handleAddTrailer}
                onRemove={handleRemoveTrailer}
                placeholder="Trailer"
                data-testid="trailer-input"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box display="flex" sx={{ my: 2 }} gap={2}>
          <Button variant="contained" component={Link} to="/videos">
            Back
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
