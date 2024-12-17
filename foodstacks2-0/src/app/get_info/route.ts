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
    const { typeOfFood, location } = await req.json();

    // Build the query parameters for the Places Text Search API
    const textQuery = `${typeOfFood} near ${location}`;
    const url = "https://places.googleapis.com/v1/places:searchText";

    // Fetch results from the Places API
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "*",
      },
      body: JSON.stringify({
        textQuery,
        maxResultCount: 5,
      }),
    });

    const { places } = await res.json();

    if (places.length) {
      console.log("Places:", places);
    } else {
      console.log("No results");
    }

    // Pick a random place from the results
    const randomIndex = Math.floor(Math.random() * places.length);
    const randomRestaurant = places[randomIndex];
    console.log("Random Pick:", randomRestaurant);

    return NextResponse.json({
      message: "Recommendation received!",
      data: {
        randomRestaurant,
      },
    });
  } catch (error) {
    console.error("Error in /get_info:", error);
    return NextResponse.json(
      { error: "An internal error occurred while processing the request." },
      { status: 500 }
    );
  }
}
