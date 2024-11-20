"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [food, setFood] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);

   useEffect(() => {
    // Get query parameters directly using searchParams
    const typeOfFood = searchParams.get('typeOfFood');
    const location = searchParams.get('location');
    const distance = searchParams.get('distance');

    // If all parameters are found, set them in state
    if (typeOfFood && location && distance) {
      setFood(typeOfFood);
      setLocation(location);
      setDistance(Number(distance));
    }
  }, [searchParams]);

  return (
    <main>
      <div>Welcome to Foodstacks!!!</div>
      <br />
      <div>
        <p>Food: {food}</p>
        <p>Location: {location}</p>
        <p>Distance: {distance} miles</p>
      </div>
      <br />
      <button>
        <Link href="/description">View Details</Link>
      </button>
      <br></br>
      <button>Recommend</button>
      <br></br>
      <button>
        <Link href="/user_settings">Change User Preferences</Link>
      </button>
    </main>
  );
}
