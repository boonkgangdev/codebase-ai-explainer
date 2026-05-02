import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold">
          Codebase AI
        </Link>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
