import { NextRequest, NextResponse } from "next/server";
import AdmZip from "adm-zip";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  const files = entries
    .filter((entry) => !entry.isDirectory)
    .map((entry) => ({
      name: entry.entryName,
      size: entry.header.size,
      content: entry.getData().toString("utf-8").slice(0, 200), // preview only
    }));

  console.log("Extracted files:", files.length);

  return NextResponse.json({
    success: true,
    fileCount: files.length,
    sample: files.slice(0, 5),
  });
}
