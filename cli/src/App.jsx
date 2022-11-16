import "./App.css";

// components
import Sidebar from "./components/Sidebar";
import ContentBox from "./components/ContentBox/ContentBox";

function App() {
    return (
        <>
            <div className="flex h-full">
                <Sidebar />
                <ContentBox />
            </div>
        </>
    );
}

export default App;
