import { Layers3 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Layers3 className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/teams" replace>
            Times
          </Link>
          <Link href="/" replace>
            Jogadores
          </Link>
        </nav>
      </div>
    </div>
  );
}
