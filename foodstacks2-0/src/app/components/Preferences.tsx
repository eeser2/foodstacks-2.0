"use client";

import Link from "next/link";
import React, { useState } from "react";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const Preferences = () => {
  const [typeOfFood, setTypeOfFood] = useState('');
  const [location, setLocation] = useState('');
  const [sliderValue, setSliderValue] = useState(10);

  const router = useRouter();

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?typeOfFood=${typeOfFood}&location=${location}&distance=${sliderValue}`);
  };

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
          {/* <RangeSlider
            min="0"
            max="50"
            step="1"
            value={sliderValue}
            onInput={handleSliderChange}
            className="w-full"
            id="location-slider"
          /> */}
          <Slider 
            step={1} 
            maxValue={50} 
            minValue={1} 
            onChange={handleSliderChange}
            className="max-w-md"
            id="location-slider"
          />
          <div className="text-gray-700 mt-2">
            {sliderValue} miles
          </div>
        </div>
        <button type="submit" className="text-black btn btn-primary">Save</button>
      </form>
      {/* <div className="block text-gray-700 font-medium">
        <Link href="/">Save</Link>
      </div> */}
    </div>
  );
};

export default Preferences;
