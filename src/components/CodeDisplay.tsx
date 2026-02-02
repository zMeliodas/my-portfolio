import {
  Code,
  CodeBlock,
  CodeHeader,
} from "@/components/animate-ui/components/animate/code";
import { FaReact } from "react-icons/fa";

const CodeDisplay = () => {
  const myCode = `const HomePage = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  const developer = {
    name: 'Cedrick Lemuel F. Cabansag',
    role: 'Full Stack Developer',
    bio: 'Building modern web experiences'
  };

  useEffect(() => {
    document.title = \`\${developer.name}\`\;
    setIsLoaded(true);
  }, [developer.name]);

  return (
    <main className="hero-container">
      <h1>{developer.name}</h1>
      <p>{developer.role}</p>
      <div className="cta">
        <Link href="/projects">View Projects</Link>
      </div>
    </main>
  );
};

export default HomePage;`;

  return (
    <>
      <Code className="w-xl border-borderColor" code={myCode}>
        <CodeHeader
          icon={FaReact}
          className="bg-windowColor text-white border-borderColor"
        >
          Home.tsx
        </CodeHeader>
        <CodeBlock
          className="bg-windowColor"
          writing={true}
          duration={5000}
          lang="tsx"
          cursor={true}
          theme="dark"
        ></CodeBlock>
      </Code>
    </>
  );
};

export default CodeDisplay;
