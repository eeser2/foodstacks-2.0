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
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500">
      <main className="flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center text-5xl font-bold border-3 border-blue-700 text-purple-700 p-4 mt-10">
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
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
          <Link href="/user_settings"> Set Your Preferences!</Link>
        </button>
      </main>
    </div>
  );
}
