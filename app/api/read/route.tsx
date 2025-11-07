import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dire = path.join(process.cwd(), 'reading-things');
    const files = fs.readdirSync(dire);
    const allFiles = files.map((file) => {
      const filePath = path.join(dire, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    })
    // console.log("loaded", allFiles);
    return Response.json(allFiles);
  } catch (error) {
    // console.error("failed", error);
    return new Response("server error", { status: 500 });
  }
}
