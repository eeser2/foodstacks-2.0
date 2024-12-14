import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.content.tripadvisor.com/api/v1/location/search",
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.DATA_API_KEY,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
