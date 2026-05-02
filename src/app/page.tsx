import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight mb-6">
        Understand any codebase in minutes
      </h1>

      <p className="text-muted-foreground max-w-xl mb-8">
        Upload a repository or connect GitHub and get instant insights,
        architecture breakdowns, and AI-powered explanations.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg">Get Started</Button>
        </Link>
        <Button variant="outline" size="lg">
          View Demo
        </Button>
      </div>
    </main>
  );
}
