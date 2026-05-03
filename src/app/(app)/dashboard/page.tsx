import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectDialog } from "@/components/create-project-dialog";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <CreateProjectDialog />
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
