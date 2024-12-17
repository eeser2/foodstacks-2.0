import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const apiKey = await fs
      .readFile(path.join(process.cwd(), "config.json"), "utf8")
      .then((data) => JSON.parse(data).apis.googlePlaces);

    console.log("API Key:", apiKey);

    // Get the payload from the request
    const { name, maxHeightPx, maxWidthPx } = await req.json();
    console.log("Location Name:", name);
    console.log("Max Height:", maxHeightPx);
    console.log("Max Width:", maxWidthPx);

    // Create a search query based on the type of food, location, and distance
    const url = `https://places.googleapis.com/v1/${name}/media?key=${apiKey}&maxHeightPx=${maxHeightPx}&maxWidthPx=${maxWidthPx}`;
    const response = await fetch(url, {
      method: "GET",
    });

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    // Data contains some attributes and then an "images" object.
    // We want to get images.medium.url from the data object.

    const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    // const randomIndex = Math.floor(Math.random() * data.length);
    // const randomPick = data[randomIndex];
    // console.log("Random Pick:", randomPick);
    // const imageSrc = randomPick.images.medium.url;
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
