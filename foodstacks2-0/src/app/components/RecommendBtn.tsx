"use client";

import React, { useState } from "react";

export default function RecommendBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(""); // Store the restaurant image URL

  const handleRecommend = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    setImageSrc(""); // Reset the image when fetching starts
    try {
      // Step 1: Fetch user preferences from the `get_preferences` route
      const preferencesResponse = await fetch("/get_preferences");
      if (!preferencesResponse.ok) {
        throw new Error("Failed to fetch user preferences.");
      }
      const preferences = await preferencesResponse.json();

      console.log("Fetched preferences:", preferences);

      // Step 2: Use preferences to send a POST request to the `get_info` route
      const infoResponse = await fetch("/get_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!infoResponse.ok) {
        throw new Error("Failed to get recommendation.");
      }

      const info = await infoResponse.json();
      console.log("Received recommendation:", info);

      // Set the recommendation result
      setRecommendation(info.message || "Recommendation received!");

      // Step 3: Add the location ID to the database
      const locationId = info.data.location_id;
      console.log("Location ID:", locationId);
      const addLocationResponse = await fetch("/write_to_db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeOfFood: preferences.typeOfFood,
          location: preferences.location,
          distance: preferences.distance,
          location_id: locationId,
        }),
      });

      if (!addLocationResponse.ok) {
        throw new Error("Failed to add location to database.");
      }

      console.log("Added location to database:", location);

      // Step 4: Fetch the image of the recommended restaurant
      const imageResponse = await fetch("/get_restaurant_img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location_id: locationId,
        }),
      });

      if (!imageResponse.ok) {
        throw new Error("Failed to fetch restaurant image.");
      }

      const image = await imageResponse.json();
      console.log("Received image:", image);

      // Set the image URL
      setImageSrc(image.imageSrc);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRecommend}
        disabled={isLoading}
        className={`px-4 py-2 text-white ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } rounded`}
      >
        {isLoading ? "Loading..." : "Recommend"}
      </button>
      {recommendation && (
        <div className="mt-2 text-green-600">{recommendation}</div>
      )}
      {error && <div className="mt-2 text-red-600">{error}</div>}
      {/* Render the image only when an image URL is set */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Recommended Restaurant"
          className="mt-4 w-64 h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
