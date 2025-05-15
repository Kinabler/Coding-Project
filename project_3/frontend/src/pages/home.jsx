import Header from "../components/layout/header";
import { Outlet } from "react-router-dom";
const HomePage = () => {
    return (
        <>
            <div>
                <h1>Home Page</h1>
                <p>Welcome to the home page!</p>
            </div>
        </>
    );
}

export default HomePage;