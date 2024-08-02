"use client";
import React from "react";
import { useState } from "react";
import PlacesList from "./PlacesList";
const BussinesList = () => {
  const [count, setcount] = useState(0);
  return (
    <div className="m-3 ">
      <div className="flex  gap-x-[1026px]">
        <h1 className="text-xl font-bold">Top News</h1>
        <div className="flex gap-2">
          {count != 0 ? (
            <img
              src="left.svg"
              className="w-6 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
              alt=""
            />
          ) : (
            <img
              src="left.svg"
              className="w-6 rounded-xl invisible transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
              alt=""
            />
          )}
          <img
            src="right.svg"
            onClick={() => {
              setcount(count + 1);
            }}
            className="w-6 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
            alt=""
          />
        </div>
       
      </div>
      <div className="grid grid-cols-2">
      <div><PlacesList/></div>
      <div><PlacesList/></div> <div><PlacesList/></div> <div><PlacesList/></div>
      </div>
    </div>
  );
};

export default BussinesList;
