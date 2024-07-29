"use client";
import React from "react";
import data from "/data.json";
import Image from "next/image";

function Category() {
  return (
    <div className="m-3">
      <div>
        <h1 className="text-xl font-bold">Category List</h1>
        <div className="flex gap-4 m-4 ">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col p-2 items-center font-semibold text-sm bg-slate-400 cursor-pointer rounded-xl h-2/5">
              <Image src={item.icon} width={30} height={30} className="w-7 mb-2" alt={item.value} />
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
