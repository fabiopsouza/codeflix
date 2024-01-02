import { Box, Paper, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { FileObject, Video } from "../../types/Videos";
// import { addUpload } from "../uploads/UploadSlice";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import {
  initialState,
  useCreateVideoMutation,
  useGetAllCastMembersQuery,
  useGetAllCategoriesQuery,
  useGetAllGenresQuery,
} from "./VideoSlice";
import { addUpload } from "../uploads/UploadSlice";

export const VideosCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const dispatch = useAppDispatch();

  function handleChange(name: string, value: any) {
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...selectedFiles, { name, file }]);
  }

  function handleRemoveFile(name: string) {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
  }

  function handleSubmitUploads(videoId: string) {
    selectedFiles.forEach(({ file, name }) => {
      const payload = { id: nanoid(), file, videoId, field: name };
      dispatch(addUpload(payload));
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { id, ...payload } = mapVideoToForm(videoState);
    try {
      const { id } = await createVideo(payload).unwrap();
      handleSubmitUploads(id);
    } catch (e) {
      enqueueSnackbar(`Error creating Video`, { variant: "error" });
    }
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video created`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error creating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>

        <VideosForm
          video={videoState}
          categories={categories?.items}
          genres={genres?.items}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          castMembers={castMembers?.items}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        />
      </Paper>
    </Box>
  );
};
