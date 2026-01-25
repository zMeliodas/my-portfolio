import CodeDisplay from "@/components/CodeDisplay";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex content-center justify-center bg-backgroundColor w-full h-full">
      <div className="flex space-x-18 items-center">
        <CodeDisplay />
        <div className="flex flex-col w-lg gap-4">
          <div className="flex-col">
            <h1 className="font-bold text-white text-6xl">Cedrick</h1>
            <h1 className="font-bold text-draculaPink text-6xl">Cabansag</h1>
          </div>

          <p className="font-mono text-white text-2xl">
            Full Stack Web Developer
          </p>
          <p className="font-mono text-white wrap-break-word">
            I build elegant, responsive web applications with modern
            technologies. Focused on clean code and intuitive user experiences.
          </p>

          <div className="flex">
            <Link to="/projects" className="flex items-center gap-2 text-white font-mono bg-draculaPink rounded-md p-2 px-6">
              View Projects <VscArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
