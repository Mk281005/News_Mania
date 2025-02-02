'use client';
import { useState, useEffect } from "react";
import { useMyContext } from "./MyContext.js";
import { useLiked } from "../context/Contest.js";

const PlacesList = ({ data, index }) => {
  const { state } = useMyContext();
  const { items, setitems } = useLiked();
  
  const [Invert, setInvert] = useState([]);
  const [liked_data, setliked_data] = useState([]);
  
  useEffect(() => {
    if (data.length > 0) {
      initializeState(data);
    }
  }, [data]); // Runs when `data` changes

  // Async function to check liked items
  const initializeState = async (data) => {
   console.log("Initializing data:", data[2]);

    const newInvert = new Array(data.length).fill(false);
    setInvert(newInvert);
console.log(items);
    if (items.length > 0) {
      for (const item of items) {
        console.log(item);
        const idx = data.findIndex((dataItem) => (dataItem.url === item.url || dataItem.link === item.link));
        console.log(idx +" "+data[idx]);
        if (idx !== -1) {
          newInvert[idx] = true;
        }
      }
    }

    setInvert(newInvert);
  };

  const inverted = (relativeIndex, index) => {
    if (Invert[relativeIndex + index]) {
        const like = [...items]; // Create a copy
        const idx = like.findIndex(
            (dataItem) =>
                dataItem.url === data[relativeIndex + index].url ||
                dataItem.link === data[relativeIndex + index].link
        );
        if (idx !== -1) {
            like.splice(idx, 1);
        }
        setitems(like);
    } else {
        const newInvert = [...Invert];
        newInvert[relativeIndex + index] = !newInvert[relativeIndex + index];
        setInvert(newInvert);

        // Filter liked data
        const newLikedData = data.filter((_, i) => newInvert[i] === true);

        setliked_data(newLikedData);
        setitems([...items, ...newLikedData]); // Correct way to add items
    }
};


  return (
    <div className="ml-20">
      <div className="grid grid-cols-2 gap-x-52 w-content">
        {data.slice(index, index + 4).map((article, relativeIndex) => (
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
                <div className="relative left-20" onClick={() => inverted(relativeIndex, index)}>
                  <img className="w-6 cursor-pointer" src={Invert[relativeIndex + index] ? 'heart1.svg' : 'heart2.svg'} alt="Heart" />
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
