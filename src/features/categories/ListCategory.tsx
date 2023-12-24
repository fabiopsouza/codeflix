import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar
} from "@mui/x-data-grid";

export const CategoryList = () => {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const categories = useAppSelector(selectCategories);

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

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => alert('delete action')}
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
          rows={categories}
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
