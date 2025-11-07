import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "reading-things", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const fileData = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(fileData));
}
