/* 
    This is the main entry point of the React application.
    Init layout and routing to api !! 
*/

import { useEffect } from "react"
import axios from "./util/axios.customize";
import Header from "./components/layout/header.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Spin } from "antd";
import { AuthContext } from "./components/context/auth.context";

function App() {

  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);

      const res = await axios.get("/api/v1/account");
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res?.email ?? "",
            username: res?.username ?? "",
          },
        })
      }
      setAppLoading(false);
    }

    fetchAccount();
  }, [])


  return (
    <>
      {appLoading === true ?
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin /> Loading...
        </div>
        :
        <div>
          <Header />
          <Outlet />
        </div>
      }

    </>
  )
}

export default App
