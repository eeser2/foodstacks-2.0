import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const apiKey = await fs
      .readFile(path.join(process.cwd(), "config.json"), "utf8")
      .then((data) => JSON.parse(data).apiKey);
    // Get the payload from the request
    const { typeOfFood, location, distance } = await req.json();
    const category = "restaurants";
    const address = location;
    // Create a search query based on the type of food, location, and distance
    const searchQuery = `${typeOfFood} near ${location} within ${distance}`;
    const response = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${searchQuery}&category=${category}&address=${address}&language=en`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPick = data[randomIndex];
    const id = randomPick.location_id;
    return NextResponse.json({
      message: `${randomPick.name}`,
      data: randomPick,
    });
  } catch (error) {
    console.error("Error in /get_info:", error);
    return NextResponse.json(
      { error: "An internal error occurred while processing the request." },
      { status: 500 }
    );
  }
}
