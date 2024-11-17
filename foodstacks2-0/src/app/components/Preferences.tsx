"use client";

import Link from "next/link";
import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Preferences = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        action="/"
        method="post"
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
          <RangeSlider
            min="0"
            max="50"
            step="1"
            className="w-full"
            id="location-slider"
          />
        </div>
      </form>
      <div className="block text-gray-700 font-medium">
        <Link href="/">Save</Link>
      </div>
    </div>
  );
};

export default Preferences;
