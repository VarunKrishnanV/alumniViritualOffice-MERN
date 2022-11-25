
import "./App.css";

// components
import Sidebar from "./components/Sidebar";
import { Outlet } from 'react-router-dom'
import Dashboard from "./dashboard";

function App() {
    return (
        <>
            {/* <div className="flex h-full">
                <Sidebar />
                <Outlet />
            </div> */}
            <Dashboard />

        </>
    );
}

export default App;
