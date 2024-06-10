"use client";
import { Search } from "@mui/icons-material";
import React, { Fragment, useState } from "react";

import useDebounce from "@/hooks/debounce";

import CustomTextField from "@/components/ui/TextField";
import { CircularProgress, Paper } from "@mui/material";
import ProductDropdownCard from "../ProductDropdownCard";
import { TProduct } from "@/utils/models";
import { isItemInArray } from "@/utils/function";
import { useLanguage } from "@/context/Language";

interface ProductSearchBarProps {
  search: string;
  debounce?: boolean;
  setSearch: (search: string) => void;
  label?: string;
  placeHolder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  hideDropdown?: boolean;
  productData?: TProduct[];
  selectedArray?: any[];
  onProductDropdownClick?: (data: TProduct) => void;
  isLoading?: boolean;
}

export default function ProductSearchBar({
  search,
  setSearch,
  debounce = false,
  label = "",
  placeHolder = "",
  fullWidth = false,
  error = false,
  helperText = "",
  hideDropdown = true,
  productData = [],
  selectedArray = [],
  onProductDropdownClick = (data: TProduct) => {},
  isLoading = false,
}: ProductSearchBarProps) {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(searchTerm, 500, () => {
    setSearch(searchTerm);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const resetInput = () => {
    setSearchTerm("");
    setSearch("");
  };

  return (
    <div className={`tw-relative ${fullWidth ? "tw-w-full" : "tw-w-[510px]"}`}>
      <CustomTextField
        className="tw-w-full"
        label={label || translations?.ProductSearchBar}
        name="productSearch"
        value={debounce ? searchTerm : search}
        placeholder={placeHolder || translations?.ProductSearchBar}
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
      {!hideDropdown && (
        <Paper className="tw-max-h-60 tw-overflow-y-scroll tw-absolute tw-w-full tw-bg-white tw-z-10 tw-p-2 tw-flex tw-flex-col tw-gap-2">
          {isLoading ? (
            <div className="tw-min-h-16 tw-flex tw-justify-center tw-items-center">
              <CircularProgress size="2rem" />
            </div>
          ) : (
            <Fragment>
              {productData?.length === 0 ? (
                <div className="tw-flex tw-justify-center tw-items-center tw-p-8">
                  No Data
                </div>
              ) : (
                <Fragment>
                  {productData?.map((product) => (
                    <ProductDropdownCard
                      data={product}
                      disabled={
                        isItemInArray(selectedArray, product) ||
                        product.quantity === 0
                      }
                      onClick={() => {
                        onProductDropdownClick(product);
                        resetInput();
                      }}
                      key={product.id}
                    />
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </Paper>
      )}
    </div>
  );
}
