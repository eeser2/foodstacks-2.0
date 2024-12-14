import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the path to the `db.json` file
    const filePath = path.join(process.cwd(), "db.json");

    // Read the file
    const data = await fs.readFile(filePath, "utf8");

    // Return the data as JSON
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json(
      { error: "Failed to load preferences." },
      { status: 500 }
    );
  }
}
