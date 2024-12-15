import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { typeOfFood, location, distance, location_id } = body;

    // Define the path to the database file
    const filePath = path.join(process.cwd(), "db.json");

    // Ensure the file exists
    try {
      await fs.access(filePath);
    } catch {
      // Create the file if it doesn't exist
      await fs.writeFile(filePath, JSON.stringify([]));
    }

    // Read existing data from the file
    const existingData = JSON.parse(await fs.readFile(filePath, "utf8"));

    // Update the data
    const updatedData = {
      ...existingData,
      typeOfFood,
      location,
      distance,
      location_id
    };

    // Write updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    // Return a success response
    return NextResponse.json({ message: "Database updated successfully!" });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      { error: "Failed to update database." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
