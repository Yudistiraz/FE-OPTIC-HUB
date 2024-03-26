import { Search } from "@mui/icons-material";
import React, { useState } from "react";

import useDebounce from "@/hooks/debounce";

import CustomTextField from "../TextField";

interface SearchBarProps {
  search: string;
  debounce?: boolean;
  setSearch: (search: string) => void;
  label?: string;
  placeHolder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function CustomSearchbar({
  search,
  setSearch,
  debounce = false,
  label = "Search",
  placeHolder = "Search",
  fullWidth = false,
  error = false,
  helperText = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(searchTerm, 500, () => {
    setSearch(searchTerm);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      <CustomTextField
        className={`${fullWidth ? "tw-w-full" : "tw-w-[510px]"}`}
        label={label}
        name="search"
        value={debounce ? searchTerm : search}
        placeholder={placeHolder}
        onChange={(e) => {
          if (debounce) {
            handleInputChange(e);
          } else {
            setSearch(e.target.value);
          }
        }}
        startAdornment={<Search />}
        error={error}
        helperText={helperText}
      />
    </>
  );
}
