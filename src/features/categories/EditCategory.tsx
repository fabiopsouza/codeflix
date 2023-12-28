import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { useEffect, useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { enqueueSnackbar } from "notistack";

export const CategoryEdit = () => {
  const id = useParams().id as string;
  const [isDisabled, setIsDisabled] = useState(false)
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, status] = useUpdateCategoryMutation();
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
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      setIsDisabled(false);
    }
    if (status.error) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [status.error, status.isSuccess]);

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
