'use client';
import { useState, useEffect } from "react";
import { useMyContext } from "./MyContext.js";
import { useLiked } from "../context/Contest.js";

const PlacesList = ({ data, index }) => {
  const { state } = useMyContext();
  const { items, setitems } = useLiked();
  const [Invert, setInvert] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) { // Added check for data
      initializeState(data);
    }
  }, [data, items]);

  const initializeState = async (data) => {
    const newInvert = new Array(data.length).fill(false);
   
    data.forEach((dataItem, idx) => {
      const isLiked = items.some(item => 
        (item.url && item.url === dataItem.url) || 
        (item.link && item.link === dataItem.link)
      );
      newInvert[idx] = isLiked;
    });
    
    setInvert(newInvert);
  };

  const inverted = (relativeIndex, index) => {
    const actualIndex = relativeIndex + index;
    const currentItem = data[actualIndex];
  
    const newInvert = [...Invert];
  
    newInvert[actualIndex] = !newInvert[actualIndex];
    setInvert(newInvert);

    if (newInvert[actualIndex]) {
      setitems(prevItems => [...prevItems, currentItem]);
    } else {
      setitems(prevItems => {
        const itemToRemove = prevItems.find(item => 
          (currentItem.url && item.url === currentItem.url) || 
          (currentItem.link && item.link === currentItem.link)
        );
        
        if (!itemToRemove) return prevItems;
        
        return prevItems.filter(item => item !== itemToRemove);
      });
    }
  };

  return (
    <div className="ml-20">
      <div className="grid grid-cols-2 gap-x-52 w-content">
        {data && data.slice(index, index + 4).map((article, relativeIndex) => { // Added check for data
          const actualIndex = relativeIndex + index;
          
          return (
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
                      rel="noopener noreferrer"
                      className="text-[14px] border-2 p-3 bg-black text-white rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105"
                    >
                      Read More
                    </a>
                  </div>
                  <div 
                    className="relative left-20" 
                    onClick={() => inverted(relativeIndex, index)}
                  >
                    <img 
                      className="w-6 cursor-pointer" 
                      src={Invert[actualIndex] ? 'heart1.svg' : 'heart2.svg'} 
                      alt="Heart" 
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesList;