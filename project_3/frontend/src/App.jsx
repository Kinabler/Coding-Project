import { useEffect } from "react"
import axios from "./util/axios.customize";

function App() {

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get("/api/v1/");
      console.log("Check Response: ", res);
    }

    fetchHelloWorld();
  }, [])


  return (
    <div>
      <h1> Hello world </h1>
    </div>
  )
}

export default App
