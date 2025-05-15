import { useEffect } from "react"
import axios from "./util/axios.customize";
import Header from "./components/layout/header.jsx";
import { Outlet } from "react-router-dom";

function App() {

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get("/api/v1/");
      console.log("Check Response: ", res);
    }

    fetchHelloWorld();
  }, [])


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
