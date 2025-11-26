import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const limit = parseInt(url.searchParams.get("limit") || "5");

    const dir = path.join(process.cwd(), "reading-things");
    const files = fs.readdirSync(dir);

    const jsonFiles = files.slice(offset, offset + limit);

    const items = jsonFiles.map((file) => {
      const fullPath = path.join(dir, file);
      const content = fs.readFileSync(fullPath, "utf8");
      const json = JSON.parse(content);

      return {
        slug: file.replace(".json", ""),
        ...json,
      };
    });

    return Response.json({
      items,
      hasMore: offset + limit < files.length
    });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
