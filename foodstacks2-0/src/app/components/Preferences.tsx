"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
    return <div className="bg-purple-100 text-purple-700">Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
<main>
  <div className="bg-purple-100 min-h-screen">
    {/* Title Section */}
    <div className="text-5xl text-purple-700 text-center p-10 font-bold">
      User Preferences
    </div>

    {/* Back Button */}
    <div className="top-0 left-0 mt-10 ml-5 absolute">
      <Link
        href="/"
        className="inline-flex items-center border border-purple-300 px-3 py-1.5 rounded-md text-purple-500 hover:bg-indigo-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          ></path>
        </svg>
        <span className="ml-1 font-bold text-lg">Back</span>
      </Link>
    </div>

    {/* Form Section */}
    <div className="p-4 bg-purple-100 flex items-start justify-center">
      <form
        action="/"
        method="post"
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-10 w-full max-w-lg rounded-lg shadow-lg"
      >
        {/* Type of Food */}
        <div className="space-y-2">
          <label htmlFor="typeOfFood" className="block text-gray-700 font-bold">
            Type of food:
          </label>
          <input
            type="text"
            id="typeOfFood"
            name="typeOfFood"
            value={typeOfFood}
            onChange={(e) => setTypeOfFood(e.target.value)}
            className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-purple-500 text-purple-700"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-gray-700 font-bold">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-purple-500 text-purple-700"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 border-none px-6 py-2 rounded-md mt-5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
  );
};

export default Preferences;
