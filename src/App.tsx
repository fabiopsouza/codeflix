import "./App.css";
import { Box, ThemeProvider } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { darkTheme } from "./config/theme";
import { Typography } from "@mui/material";
import { CategoryList } from "./features/categories/ListCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { SnackbarProvider } from "notistack";
import { CreateCastMember } from "./features/cast/CreateCastMembers";
import { EditCastMember } from "./features/cast/EditCastMember";
import { ListCastmembers } from "./features/cast/ListCastmembers";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Header
            toggle={() => {
              alert("teste");
            }}
            theme={""}
          />
          <Layout>
            <Routes>
              {/* Category */}
              <Route path="/" element={<CategoryList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              {/* Cast members */}
              <Route path="/cast-members" element={<ListCastmembers />} />
              <Route path="/cast-members/create" element={<CreateCastMember />} />
              <Route path="/cast-members/edit/:id" element={<EditCastMember />}/>

              <Route
                path="*"
                element={
                  <Box sx={{ color: "white" }}>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h2">Page not found</Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
