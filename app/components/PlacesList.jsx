"use client"
import React, { useState, useEffect } from "react";


const PlacesList = ({ data, index }) => {
  const [res, setRes] = useState(null);

  useEffect(() => {
    var url =process.env.NEXT_PUBLIC_API_URL;
      
    var req = new Request(url);
    fetch(req)
      .then((response) => response.json()) // Parse JSON data
      .then((data) => {
        console.log(data.articles);
        setRes(data.articles); // Set the articles to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (res && res.length > 0) {
    console.log(res[0].title + " " + 1);
  } else {
    console.log("No data available");
  }

  const articlesToShow = data.slice(index, index + 4);

  return (
    <div className="ml-20">
      <div className="grid grid-cols-2 gap-x-52 w-content">
        {articlesToShow.map((article, i) => (
          <div key={i} className=" m-2 w-96 ">
            <div className="flex flex-col justify-between border-2 p-3 items-center h-48 rounded-xl">
              <div className="m-3">
                <h1 className="font-semibold">
                  {article.author || "Unknown Author"} Publications
                </h1>
                <h1 className="text-[14px] font-medium pt-2">{article.title}</h1>
              </div>
              <div className="flex justify-center gap-1 mt-auto">
                <a
                  href={article.url}
                  className="text-[14px] border-2 p-3 bg-black text-white rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105 "
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
