import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar
} from "@mui/x-data-grid";
import { useGetCategoriesQuery } from "./categorySlice";
import { Results } from "../../types/Category";

export const CategoryList = () => {
  // const dispatch = useAppDispatch();
  const { data, isFetching, error } = useGetCategoriesQuery({});

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

function mapDataToGridRows(data: Results) {
    const { items: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  async function handleDeleteCategory(id: string) {
    // dispatch(deleteCategory(id));
    enqueueSnackbar('Success deleted category!', { variant: 'success' });
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
      onClick={() => handleDeleteCategory(params.value)}
      color="secondary"
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  const rows = data ? mapDataToGridRows(data) : [];
  
  setTimeout(function() {
    console.log('rows', rows);
    console.log('error', error);
  }, 2000);
  
  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid
          rows={[]}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={componentProps}
        />
      </Box>
    </Box>
  );
};
