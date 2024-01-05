import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileObject, Video } from "../../types/Videos";
import { VideosForm } from "./components/VideosForm";
import { mapVideoSlices, mapVideoToForm } from "./util";
import {
  initialState,
  useGetAllCastMembersQuery,
  useGetAllCategoriesQuery,
  useGetAllGenresQuery,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "./VideoSlice";

export function VideosEdit() {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [updateVideo, status] = useUpdateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  function handleChange(name: string, value: any) {
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateVideo(mapVideoToForm(videoState));
  }

  function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...selectedFiles, { name, file }]);
  }

  function handleRemoveFile(name: string) {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
  }

  useEffect(() => {
    if (video && genres && castMembers && categories) {
      setVideoState(mapVideoSlices(video, genres, castMembers, categories));
    }
  }, [video, genres, castMembers, categories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video updated`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error updating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>

        <VideosForm
          video={videoState}
          genres={genres?.items}
          isLoading={isFetching}
          isDisabled={isFetching}
          categories={categories?.items}
          castMembers={castMembers?.items}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        />
      </Paper>
    </Box>
  );
}
