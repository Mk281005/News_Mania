"use client";
import React, { useState, useEffect } from "react";
import PlacesList from "./PlacesList.jsx";
import { useMyContext } from "./MyContext.js";
const BussinesList = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const saved=require("../rss_feed_data.json")
  console.log(saved);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(url);
        const result = await response.json();
        setData(result.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   
    fetchData();
  }, []);
  
  const handleNext = () => {
    if (currentIndex + 4 < data.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="m-3">
      <div className="flex gap-x-[1026px]">
        <h1 className="text-xl font-bold">Top News</h1>
        <div className="flex gap-2">
          {currentIndex > 0? 
            <img
              src="left.svg"
              className="w-6 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
              alt="Previous"
              onClick={handlePrev}
            />: <img
            src="left.svg"
            className="w-6 rounded-xl transition invisible duration-300 ease-in-out transform hover:bg-white hover:scale-105"
            alt="Previous"
            onClick={handlePrev}
          />
          }
          <img
            src="right.svg"
            onClick={handleNext}
            className="w-6 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
            alt="Next"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <PlacesList data={data} index={currentIndex} />
      </div>
    </div>
  );
};

export default BussinesList;
