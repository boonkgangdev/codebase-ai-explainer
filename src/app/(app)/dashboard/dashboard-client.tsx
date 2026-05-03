"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreateProjectDialog,
  type Project,
} from "@/components/create-project-dialog";

const STORAGE_KEY = "projects";
const EMPTY_PROJECTS: Project[] = [];

let cachedRawProjects: string | null = null;
let cachedProjects: Project[] = EMPTY_PROJECTS;

function getProjectsSnapshot(): Project[] {
  if (typeof window === "undefined") return EMPTY_PROJECTS;

  const rawProjects = localStorage.getItem(STORAGE_KEY);

  if (rawProjects === cachedRawProjects) {
    return cachedProjects;
  }

  cachedRawProjects = rawProjects;

  if (!rawProjects) {
    cachedProjects = EMPTY_PROJECTS;
    return cachedProjects;
  }

  try {
    cachedProjects = JSON.parse(rawProjects) as Project[];
    return cachedProjects;
  } catch {
    cachedProjects = EMPTY_PROJECTS;
    return cachedProjects;
  }
}

function getServerSnapshot(): Project[] {
  return EMPTY_PROJECTS;
}

function subscribeToProjects(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("projects-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("projects-updated", callback);
  };
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event("projects-updated"));
}

export function DashboardClient() {
  const projects = useSyncExternalStore(
    subscribeToProjects,
    getProjectsSnapshot,
    getServerSnapshot,
  );

  function handleCreateProject(project: Project) {
    saveProjects([project, ...projects]);
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
            <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
              <Card className="cursor-pointer transition hover:shadow-md">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
