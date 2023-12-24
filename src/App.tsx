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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
            <Route path="/" element={<CategoryList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/edit/:id" element={<CategoryEdit />} />
            
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
    </ThemeProvider>
  );
}

export default App;
