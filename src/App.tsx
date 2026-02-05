import TitleBar from "./components/TitleBar";
import Footer from "./components/Footer";
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
    <Router>
      <div className="h-screen overflow-hidden flex flex-col bg-backgroundColor">
        <TitleBar />

        <div className="flex flex-1 overflow-hidden w-full">
          <Sidebar />

          <Explorer />

          <div className="flex-1 flex flex-col overflow-hidden">
            <TabBar />

            <main className="flex-1 overflow-y-auto bg-backgroundColor custom-scroll">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/techstack" element={<TechStack />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Bottom Bar */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
