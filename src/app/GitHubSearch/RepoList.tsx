"use client";

import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useGitHubSearch } from "./context";

export function RepoList() {
  const { data, loading } = useGitHubSearch();
  const result = data?.search?.edges ?? [];

  return (
    <Grid container spacing={1}>
      {loading ? (
        <Grid item xs={12}>
          Searching...
        </Grid>
      ) : (
        result.map((e) => {
          const repo = e!.node!;

          if (repo.__typename !== "Repository") return null;

          return (
            <Grid item xs={12} key={repo.id}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container gap={1}>
                    <Grid item xs={1}>
                      <Avatar
                        src={repo.owner.avatarUrl}
                        alt={repo.owner.login}
                      />
                    </Grid>
                    <Grid item xs>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {repo.owner.login}/{repo.name}
                        </Typography>
                        <a href={repo.url} target="_blank" rel="noopener">
                          <GitHubIcon sx={{ fontSize: 14 }} />
                        </a>
                      </Box>
                      <Typography variant="body2">
                        {repo.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}
