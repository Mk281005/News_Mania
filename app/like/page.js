'use client';
import React from "react";
import { useLiked } from "../context/Contest";
const Like = () => {
const {items} = useLiked();
  console.log(items);
// console.log(liked_data);

  return (
    
    <div className="ml-20">
      <h1 className="text-xl font-bold m-7">Liked News</h1>
      <div className="grid grid-cols-2 gap-x-52 w-content">
        {items.map((article, relativeIndex) => (
          <div key={relativeIndex} className="m-2 w-96 shadow-xl rounded-xl">
            <div className="flex flex-col justify-between border-2 p-3 items-center h-48 rounded-xl">
              <div className="m-3">
                <h1 className="font-semibold">
                  {article.author || article.channelName || "Unknown Author"} Publications
                </h1>
                <h1 className="text-[14px] font-medium pt-2">{article.title}</h1>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex relative justify-center gap-1 mt-auto items-center">
                  <a
                    href={article.url || article.link}
                    target="_blank"
                    className="text-[14px] border-2 p-3 bg-black text-white rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105"
                  >
                    Read More
                  </a>
                </div>
               
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Like
