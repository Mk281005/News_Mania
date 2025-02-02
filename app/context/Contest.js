"use client"
import {  createContext, useContext, useState } from 'react';


let Liked = createContext();


export const LikeProvider = ({children}) => {
   
       const [items, setitems] = useState([]);
      // console.log(items+"hi");
       return (
        <Liked.Provider value={{items,setitems}}>
           {children}
        </Liked.Provider>
       )
}
export const useLiked = () => useContext(Liked)