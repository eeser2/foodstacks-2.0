import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  const apiKey = await fs
    .readFile(path.join(process.cwd(), "config.json"), "utf8")
    .then((data) => JSON.parse(data).apiKey);
  // Get the payload from the request
  const { typeOfFood, location, distance } = await req.json();

  // Set query parameter values for TripAdvisor API
  const category = "restaurants";
  const address = location;
  // Create a search query based on the type of food, location, and distance
  const searchQuery = `${typeOfFood} near ${location} within ${distance}`;
  const data = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${searchQuery}&category=${category}&address=${address}&language=en`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) =>
    res
      .json()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  );
  return Response.json({ data });
}
