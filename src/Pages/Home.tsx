import CodeDisplay from "@/components/CodeDisplay";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex content-center justify-center bg-backgroundColor w-full h-full">
      <div className="flex flex-col w-full h-full justify-center items-center overflow-y-auto custom-scroll md:flex-row gap-12">
        <div className="flex items-center min-w-lg max-w-lg border-2 border-red-300">
          <CodeDisplay />
        </div>

        <div className="flex flex-col w-lg gap-4 justify-center items-center md:justify-normal md:items-baseline">
          <div className="flex flex-row md:flex-col gap-2">
            <h1 className="font-bold text-white text-6xl">Cedrick</h1>
            <h1 className="font-bold text-draculaPink text-6xl">Cabansag</h1>
          </div>

          <p className="font-mono text-white text-2xl">
            Full Stack Web Developer
          </p>
          <p className="font-mono text-white wrap-break-word">
            I build modern web applications that are responsive, user-centric,
            and built with clean, efficient code.
          </p>

          <div className="flex">
            <Link
              to="/projects"
              className="flex items-center gap-2 mt-2 text-white font-mono bg-draculaPink shadow-lg rounded-md p-2 px-6 transform transition-all duration-300 hover:-translate-y-1"
            >
              View Projects <VscArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
