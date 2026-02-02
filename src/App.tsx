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
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Title Bar - Fixed height */}
        <TitleBar />

        {/* Main Content Area - Takes remaining space */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Takes full height of this container */}
          <Sidebar />
          <Explorer />

          {/* Main content area */}
          <main className="flex-1 bg-editorColor overflow-auto">
            {/* Your routes/pages go here */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/techstack" element={<TechStack />} />
            </Routes>
          </main>
        </div>

        {/* Footer - Fixed height */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
