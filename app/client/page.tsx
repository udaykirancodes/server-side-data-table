"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useTableState } from "@/hooks/use-table-state";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    pagination,
    setPagination,
    remoteUpdateRequest,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  } = useTableState();

  const { data: response, isLoading } = useQuery({
    queryKey: ["tasks/client"],
    queryFn: async () => {
      const response = await fetch("/api/client");
      const data = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });

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
        serverSideHandling={false}
      />
    </div>
  );
}
