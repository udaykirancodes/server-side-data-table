import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const useTableState = () => {
  // change
  const [remoteUpdateRequest, setRemoteUpdateRequest] =
    useState<boolean>(false);
  // pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  // sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // filters
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // listen to the changes
  useChange([pagination, sorting, columnFilters], () => {
    // if there are any changes then change remoteUpdateRequest
    setRemoteUpdateRequest((prev) => !prev);
  });

  //   // listen to the changes
  //   useEffect(() => {
  //     // if there are any changes then change remoteUpdateRequest
  //     setRemoteUpdateRequest((prev) => !prev);
  //   }, [pagination, sorting, columnFilters]);

  //   useEffect(() => {
  //     // reset pagination pageIndex to 0, when columnFilters applied / removed
  //     setPagination({
  //       pageIndex: DEFAULT_PAGE_INDEX,
  //       pageSize: pagination.pageSize,
  //     });
  //   }, [columnFilters, setPagination]);

  //   useChange([columnFilters], () => {
  //     setPagination({
  //       pageIndex: DEFAULT_PAGE_INDEX,
  //       pageSize: pagination.pageSize,
  //     });
  //   });

  const getState = () => {
    return {
      pagination,
      sorting,
      columnFilters,
    };
  };

  return {
    pagination,
    setPagination,
    remoteUpdateRequest,
    getState,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  };
};

export const useChange = (deps: React.DependencyList, effect: () => void) => {
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    effect();
  }, [...deps]);

  return;
};
