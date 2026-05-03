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

export function CreateProjectDialog() {
  const [name, setName] = useState("");
  const [source, setSource] = useState("upload");

  const canCreate = name.trim().length >= 3;

  return (
    <Dialog>
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

            <RadioGroup value={source} onValueChange={setSource}>
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

          <Button disabled={!canCreate} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
