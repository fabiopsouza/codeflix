import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, bg: "white" }}
      >
        {children}
      </Container>
    </Box>
  );
}
