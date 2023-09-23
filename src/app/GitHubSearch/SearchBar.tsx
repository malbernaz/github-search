"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

export function SearchBar() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams()!;
  const [query, setQuery] = React.useState(searchParams.get("query") ?? "");
  const debouncedQuery = useDebounce(query, 500);

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  React.useEffect(() => {
    if (debouncedQuery) {
      router.push(`${pathName}?${createQueryString("query", debouncedQuery)}`);
    }
  }, [pathName, debouncedQuery, router, createQueryString]);

  return (
    <TextField
      id="search"
      type="search"
      label="Search Repositories"
      sx={{ width: "100%" }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
