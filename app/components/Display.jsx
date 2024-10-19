"use client";
import { useState } from "react";
import { useMyContext } from "./MyContext.js";

const PlacesList = ({ data, index }) => {
  const { state } = useMyContext();
  const [Invert, setInvert] = useState(
    new Array(data.length).fill(false)
  );
 
  const inverted = (relativeIndex,index) => {
    console.log(`${relativeIndex} ${Invert[relativeIndex+index] === false ? 'Hi' : 'Bye'}`+" "+index);
    const newInvert = [...Invert];
    newInvert[relativeIndex+index] = !newInvert[relativeIndex+index];
    setInvert(newInvert);
  
    console.log(`${relativeIndex} ${newInvert[relativeIndex] === false ? 'Hi' : 'Bye'}`);
  };

  const articlesToShow = data.slice(index, index + 4);

  return (
    <div className="ml-20">
      <div className="grid grid-cols-2 gap-x-52 w-content">
        {articlesToShow.map((article, relativeIndex) => (
          <div key={relativeIndex} className="m-2 w-96 shadow-xl rounded-xl">
            <div className="flex flex-col justify-between border-2 p-3 items-center h-48 rounded-xl">
              <div className="m-3">
                <h1 className="font-semibold">
                  {article.author || state.channelName || "Unknown Author"} Publications
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
                <div
                  className={`relative left-20 `}
                  onClick={() => inverted(relativeIndex,index)}
                >
                  <img className="w-6 cursor-pointer" src={Invert[relativeIndex+index] ? 'heart1.svg':'heart2.svg'} alt="Heart" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
