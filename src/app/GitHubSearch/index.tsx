"use client";

import { Container, Grid } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { RepoList } from "./RepoList";
import { GitHubSearchProvider } from "./context";

export function GitHubSearch() {
  return (
    <GitHubSearchProvider>
      <Container maxWidth="sm" style={{ marginBlock: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Grid item xs={12}>
            <RepoList />
          </Grid>
        </Grid>
      </Container>
    </GitHubSearchProvider>
  );
}
