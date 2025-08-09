// Define the task structure
interface Task {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}

// Define the shape of incoming request body
interface RequestBody {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: {
    id: keyof Task;
    desc: boolean;
  }[];
  columnFilters: {
    id: keyof Task;
    value: string[] | string;
  }[];
}

// Define the shape of API response
interface ResponseBody {
  items: Task[];
  total_count: number;
}

import { data } from "@/data/tasks";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();
  const { pagination, sorting, columnFilters }: RequestBody = body;

  let filtered: Task[] = [...data];

  // Filtering
  if (columnFilters) {
    for (const filter of columnFilters) {
      const { id, value } = filter;
      if (Array.isArray(value)) {
        // @ts-ignore
        filtered = filtered.filter((item) => value.includes(item[id]));
      } else {
        // @ts-ignore
        filtered = filtered.filter((item) => item[id] === value);
      }
    }
  }

  const total_count = filtered.length;

  // Sorting
  if (sorting?.length > 0) {
    const { id: sortKey, desc } = sorting[0];
    filtered.sort((a, b) => {
      // @ts-ignore
      const aVal = a[sortKey];
      // @ts-ignore
      const bVal = b[sortKey];

      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
      return 0;
    });
  }

  // Pagination
  const pageIndex = pagination?.pageIndex || 0;
  const pageSize = pagination?.pageSize || 10;
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const items = filtered.slice(start, end);

  return new Response(JSON.stringify({ items, total_count }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
