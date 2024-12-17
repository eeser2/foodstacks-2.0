"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const Preferences = () => {
  const [typeOfFood, setTypeOfFood] = useState("");
  const [location, setLocation] = useState("");
  const [location_name, setLocationName] = useState("");
  const [data, setData] = useState<{
    typeOfFood: string;
    location: string;
    location_name: string;
  } | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/get_preferences")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTypeOfFood(data.typeOfFood || ""); // Set initial state from fetched data
        setLocation(data.location || ""); // Set initial state from fetched data
        setLocationName(data.location_name || "");
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/write_to_db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeOfFood,
          location,
          location_name,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/?typeOfFood=${typeOfFood}&location=${location}`);
      } else {
        const error = await response.json();
        console.error("Error:", error.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        action="/"
        method="post"
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md"
      >
        <div className="space-y-2">
          <label
            htmlFor="typeOfFood"
            className="block text-gray-700 font-medium"
          >
            Type of food:
          </label>
          <input
            type="text"
            id="typeOfFood"
            name="typeOfFood"
            value={typeOfFood}
            onChange={(e) => setTypeOfFood(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-700"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-700"
          />
        </div>
        <button type="submit" className="text-black btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default Preferences;
