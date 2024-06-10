import { Search } from "@mui/icons-material";
import React, { useState } from "react";

import useDebounce from "@/hooks/debounce";

import CustomTextField from "../TextField";
import { useLanguage } from "@/context/Language";

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
  label = "",
  placeHolder = "",
  fullWidth = false,
  error = false,
  helperText = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { translations } = useLanguage();
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
        label={label || translations?.searchBar}
        name="search"
        value={debounce ? searchTerm : search}
        placeholder={placeHolder || translations?.searchBar}
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
