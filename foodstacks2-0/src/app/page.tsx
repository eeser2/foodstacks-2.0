"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Recommendation from "@/app/components/Recommendation";

export default function Home() {
  const searchParams = useSearchParams();
  const [food, setFood] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Get query parameters directly using searchParams
    const typeOfFood = searchParams.get("typeOfFood");
    const location = searchParams.get("location");

    // If all parameters are found, set them in state
    if (typeOfFood && location) {
      setFood(typeOfFood);
      setLocation(location);
    }
  }, [searchParams]);

  return (
    <main>
      <div>Welcome to Foodstacks!!!</div>
      <br />
      <div>
        <p>Food: {food}</p>
        <p>Location: {location}</p>
      </div>
      <br />
      <Recommendation />
      <br></br>
      <button>
        <Link href="/user_settings">Set Your Preferences!</Link>
      </button>
    </main>
  );
}
