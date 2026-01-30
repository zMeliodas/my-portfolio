import Window from "./components/Window";
import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import TabBar from "./components/TabBar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import TechStack from "./Pages/TechStack";

const App = () => {
  return (
    <>
      <Window />
      <Router>
        <div className="flex">
          <Sidebar />
          <Explorer />

          <div className="flex flex-col w-full">
            <TabBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/techstack" element={<TechStack />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
