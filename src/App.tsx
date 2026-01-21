import Window from "./components/Window";
import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import TabBar from "./components/TabBar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Window />
      <div className="flex">
        <Router>
          <Sidebar />
          <Explorer />

          <div className="flex flex-col w-full">
            <TabBar />

            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
