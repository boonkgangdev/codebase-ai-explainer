import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button>Create Project</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No projects yet</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Upload a repository or connect GitHub to start analyzing your
          codebase.
        </CardContent>
      </Card>
    </div>
  );
}
