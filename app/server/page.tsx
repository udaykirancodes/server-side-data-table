"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useTableState } from "@/hooks/use-table-state";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const {
    pagination,
    setPagination,
    remoteUpdateRequest,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    getState,
  } = useTableState();

  const {
    data: response,
    isSuccess,
    mutate: refetch,
  } = useMutation({
    mutationKey: ["tasks/server", remoteUpdateRequest],
    mutationFn: async () => {
      const response = await fetch("/api/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagination,
          sorting,
          columnFilters,
        }),
      });
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [remoteUpdateRequest]);

  if (!isSuccess) return <div>Loading...</div>;

  return (
    <div className="w-full h-full p-10">
      <DataTable
        data={response?.items || []}
        columns={columns}
        rowCount={response?.total_count || 0}
        setPagination={setPagination}
        pagination={pagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        serverSideHandling={true}
      />
    </div>
  );
}
