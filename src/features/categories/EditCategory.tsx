import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category } from "./categorySlice";
import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { enqueueSnackbar } from "notistack";

export const CategoryEdit = () => {
  const id = useParams().id as string;
  const [isFetching, setIsFetching] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  // const category = useAppSelector((state) => selectCategoryById(state, id)) ;
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "",
  });
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // dispatch(updateCategory(categoryState));
    enqueueSnackbar('Success updating category!', { variant: 'success' });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          isLoading={false}
          category={categoryState}
          isdisabled={isFetching || isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
