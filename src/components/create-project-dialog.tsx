"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ProjectSource = "upload" | "github";

export type Project = {
  id: string;
  name: string;
  source: ProjectSource;
  createdAt: string;
};

type CreateProjectDialogProps = {
  onCreateProject: (project: Project) => void;
};

export function CreateProjectDialog({
  onCreateProject,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [source, setSource] = useState<ProjectSource>("upload");

  const canCreate = name.trim().length >= 3;

  function handleCreateProject() {
    if (!canCreate) return;

    onCreateProject({
      id: crypto.randomUUID(),
      name: name.trim(),
      source,
      createdAt: new Date().toISOString(),
    });

    setName("");
    setSource("upload");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Start by naming your codebase analysis project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              placeholder="e.g. My SaaS Platform"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Repository source</Label>

            <RadioGroup
              value={source}
              onValueChange={(value) => setSource(value as ProjectSource)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload">Upload ZIP</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="github" id="github" />
                <Label htmlFor="github">Connect GitHub later</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            disabled={!canCreate}
            className="w-full"
            onClick={handleCreateProject}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
