import SearchBar from "./components/SearchBar";
import Categeory from "./components/Categeory";
import BussinesList from "./components/BussinesList";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className=" w-full p-0 m-0 ">
     <div >
     <SearchBar/>
     <Categeory/>
     <BussinesList/>
       
     </div>
     
     </div>
    </main>
  );
}
