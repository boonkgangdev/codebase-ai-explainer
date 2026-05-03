"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreateProjectDialog,
  type Project,
} from "@/components/create-project-dialog";
import { Badge } from "@/components/ui/badge";

export function DashboardClient() {
  const [projects, setProjects] = useState<Project[]>([]);

  function handleCreateProject(project: Project) {
    setProjects((currentProjects) => [project, ...currentProjects]);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Analyze repositories and generate AI-powered codebase insights.
          </p>
        </div>

        <CreateProjectDialog onCreateProject={handleCreateProject} />
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No projects yet</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Upload a repository or connect GitHub to start analyzing your
            codebase.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge variant="secondary">
                    {project.source === "upload" ? "ZIP Upload" : "GitHub"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
