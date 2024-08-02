import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
const PlacesList = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    var url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=2deecf3f34514f4692c9023185cb916a";
    var req = new Request(url);
    fetch(req).then(function (response) {
      console.log(response.json());
      setdata(response)
    });
  }, []);

  return (
    <div className="m-3">
      <div className="flex border-b-2 p-3 items-center rounded-xl">
        <Image
          src="/restaurant.png"
          width={85}
          height={90}
          className="rounded-xl "
          alt="no"
        ></Image>
        <div className="m-3">
          <h1 className="font-semibold ">Business Name</h1>
          <h1 className="text-[14px]">Addrass </h1>
          <div className="flex items-center   gap-1">
            <span className="text-[14px]">4.6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
