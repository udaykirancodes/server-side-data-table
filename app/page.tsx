import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button variant="link" size="lg">
        <Link href="/server">Server</Link>
      </Button>
      <Button variant="link" size="lg">
        <Link href="/client">Client</Link>
      </Button>
    </div>
  );
}
