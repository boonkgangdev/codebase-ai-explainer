import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-semibold">
        Codebase AI
      </Link>

      <div className="flex gap-4 text-sm text-muted-foreground">
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}
