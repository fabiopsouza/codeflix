import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id as string;
  const [isFetching, setIsFetching] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const categoryState = useAppSelector((state) => selectCategoryById(state, id)) ;

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleToggle = () => {};

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
