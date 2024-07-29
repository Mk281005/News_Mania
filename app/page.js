import SearchBar from "./components/SearchBar";
import Categeory from "./components/Categeory";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="grid grid-cols-2 gap-x-96 w-full p-0 m-0 ">
     <div >
     <SearchBar/>
     <Categeory/>
       <span>bussienes list</span>
     </div>
     <div >
     <span >map</span>
     </div>
     </div>
    </main>
  );
}
