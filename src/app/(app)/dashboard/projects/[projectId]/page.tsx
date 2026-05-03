"use client";

import { useState } from "react";

export default function ProjectPage() {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Repository</h1>

      <div className="border rounded-lg p-6 space-y-4">
        <input
          type="file"
          accept=".zip"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Upload ZIP
        </button>
      </div>
    </div>
  );
}
