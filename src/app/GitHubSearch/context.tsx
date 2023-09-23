"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { graphql, useQuery, GraphQLProvider } from "~/lib/graphql";
import { ClientOptions } from "graphql-hooks";

const clientOptions = {
  url: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`,
  },
} satisfies ClientOptions;

export function GitHubSearchProvider({ children }: React.PropsWithChildren) {
  return <GraphQLProvider options={clientOptions}>{children}</GraphQLProvider>;
}

export const SEARCH_QUERY = graphql`
  query SearchRepository($query: String!) {
    search(type: REPOSITORY, first: 10, query: $query) {
      edges {
        cursor
        node {
          __typename
          ... on Repository {
            name
            id
            owner {
              login
              avatarUrl
            }
            description
            url
            stargazerCount
          }
        }
      }
    }
  }
`;

export function useGitHubSearch() {
  const params = useSearchParams();
  const query = params.get("query")!;

  return useQuery(SEARCH_QUERY, { variables: { query }, skip: !query });
}
