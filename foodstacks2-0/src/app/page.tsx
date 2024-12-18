"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Recommendation from "@/app/components/Recommendation";
// TODO: Add gferp tes
export default function Home() {
  const searchParams = useSearchParams();
  const [food, setFood] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Get query parameters directly using searchParams
    const typeOfFood = searchParams.get("typeOfFood");
    const userLocation = searchParams.get("location");

    // If all parameters are found, set them in state
    if (typeOfFood && userLocation) {
      setFood(typeOfFood);
      setLocation(userLocation);
    }
  }, [searchParams]);

  return (
    <body className="m-0 p-0">
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-500">
      <main className="flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center text-5xl font-bold text-purple-700 p-4 mt-10">
          Welcome to Foodstacks!
        </div>

        <br />

        {/* Food and Location Section */}
        <div className="text-center text-purple-700 text-3xl mt-4">
          <p>Food: {food || "N/A"}</p>
          <p>Location: {location || "N/A"}</p>
        </div>

        <br />

        {/* Recommendation Component */}
        <Recommendation />

        <br />

        {/* Link Section */}
        <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          <Link href="/user_settings"> Set Your Preferences!</Link>
        </button>
      </main>
    </div>
    </body>
  );
}
