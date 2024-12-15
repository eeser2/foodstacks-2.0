import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const apiKey = await fs
      .readFile(path.join(process.cwd(), "config.json"), "utf8")
      .then((data) => JSON.parse(data).apiKey);
    // Get the payload from the request
    const { location_id } = await req.json();
    // Create a search query based on the type of food, location, and distance
    const response = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/${location_id}/photos?key=${apiKey}&language=en`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();
    // Data contains some attributes and then an "images" object.
    // We want to get images.medium.url from the data object.
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPick = data[randomIndex];
    console.log("Random Pick:", randomPick);
    const imageSrc = randomPick.images.medium.url;
    return NextResponse.json({
      imageSrc,
    });
  } catch (error) {
    console.error("Error in /get_restaurant_img:", error);
    return NextResponse.json(
      { error: "An internal error occurred while processing the request." },
      { status: 500 }
    );
  }
}
