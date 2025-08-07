import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { data } from "@/data/tasks";

export default function Home() {
  return (
    <div className="w-full h-full p-10">
      <DataTable data={data} columns={columns} />
    </div>
  );
}
