"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const Preferences = () => {
  const [typeOfFood, setTypeOfFood] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(1);
  const [location_id, setLocationID] = useState("");
  const [data, setData] = useState<{
    typeOfFood: string;
    location: string;
    distance: number;
    location_id: string;
  } | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/get_preferences")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTypeOfFood(data.typeOfFood || ""); // Set initial state from fetched data
        setLocation(data.location || ""); // Set initial state from fetched data
        setDistance(data.distance || 1); // Set initial state from fetched data
        setLocationID(data.location_id || "");
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const router = useRouter();

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setDistance(value[0]);
    } else {
      setDistance(value);
    }
  };

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
          distance,
          location_id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Success message
        router.push(
          `/?typeOfFood=${typeOfFood}&location=${location}&distance=${distance}`
        );
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
        <div className="mt-6 space-y-2">
          <label
            htmlFor="location-slider"
            className="block text-gray-700 font-medium"
          >
            Distance:
          </label>
          <Slider
            step={1}
            maxValue={50}
            minValue={1}
            value={distance}
            onChange={handleSliderChange}
            className="max-w-md"
            id="location-slider"
          />
          <div className="text-gray-700 mt-2">{distance} miles</div>
        </div>
        <button type="submit" className="text-black btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default Preferences;
