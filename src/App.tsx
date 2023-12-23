import "./App.css";
import { createTheme } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          // backgroundColor: "#000",
        }}
      >
        <Header
          toggle={() => {
            alert("teste");
          }}
          theme={""}
        />
        <Layout>
          <h1>teste</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
