"use client";
import React from "react";
import data from "/data.json";
import Image from "next/image";
import { useMyContext } from "./MyContext";
function Category() {
  const { state, setState } = useMyContext();
  const Channels =(link) =>{
        setState({ ...state, channelLink: link });
        console.log(state.channelLink );
  }
  return (
    <div className="m-3">
      <div>
        <h1 className="text-xl font-bold">News Channels</h1>
        <div className="flex gap-4 m-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-2 items-center justify-center font-semibold text-sm cursor-pointer rounded-xl h-[80px] transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
              onClick={()=>{Channels(item.link)}}
            >
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={item.icon}
                  fill
                  // style={{ objectFit: 'cover' }}
                  className="bg-cover bg-center"
                  alt={item.value}
                />
              </div>
              <div className="mt-auto">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
