import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";
import { enqueueSnackbar } from "notistack";

export const CategoryCreate = () => {
  const dispatch = useAppDispatch();
  const [isdisabled, setIsdisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // dispatch(createCategory(categoryState));
    enqueueSnackbar('Success created category!', { variant: 'success' });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          isLoading={false}
          isdisabled={isdisabled}
          category={categoryState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
