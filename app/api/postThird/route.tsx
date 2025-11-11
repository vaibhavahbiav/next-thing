import * as fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { name } = reqBody;

    if (!name) {
      return NextResponse.json(
        { error: "Missing 'name' field in request body" },
        { status: 400 }
      );
    }

    const dirPath = path.join(process.cwd(), "third-things");
    await fs.promises.mkdir(dirPath, { recursive: true });
    const safeName = name.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-");
    const filename = path.join(dirPath, `${safeName}-message.json`);
    await fs.promises.writeFile(filename, JSON.stringify(reqBody, null, 2), "utf-8");

    return NextResponse.json({
      message: "success",
      file: filename,
      data: reqBody,
    });
  } catch (error: any) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const files = await fs.promises.readdir("third-things");
  return NextResponse.json({ files });
}


// import * as fs from 'fs';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const reqBody = await request.json();

//     const data = await fs.promises.readdir('third-things');
//     const filename = `third-things/third-data-${data.length}.json`;

//     await fs.promises.writeFile(filename, JSON.stringify(reqBody));

//     return NextResponse.json({ message: 'success', file: filename, data: reqBody });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: 'GET is not getting' });
// }
