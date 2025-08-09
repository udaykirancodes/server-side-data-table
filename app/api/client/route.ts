import { data } from "@/data/tasks";

export async function GET() {
  return new Response(
    JSON.stringify({ items: data, total_count: data.length }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
