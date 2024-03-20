import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface FilterState {
  search: string;
  page: number;
  limit: number;
  additionalParams: Record<string, any>;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setAdditionalParams: Dispatch<SetStateAction<Record<string, any>>>;
  reset: () => void;
}

const useFilterState = (): FilterState => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [additionalParams, setAdditionalParams] = useState<Record<string, any>>(
    {}
  );

  const reset = () => {
    setPage(1);
    setSearch("");
    setAdditionalParams({});
  };

  useEffect(() => {
    setPage(1);
  }, [search, additionalParams]);

  useEffect(() => {
    setPage(1);
    setSearch("");
  }, [limit]);

  return {
    search,
    page,
    limit,
    additionalParams,
    setSearch,
    setPage,
    setLimit,
    setAdditionalParams,
    reset,
  };
};

export { useFilterState };
