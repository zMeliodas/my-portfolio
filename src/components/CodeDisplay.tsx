import {
  Code,
  CodeBlock,
  CodeHeader,
} from "@/components/animate-ui/components/animate/code";
import { useState } from "react";
import { FaReact } from "react-icons/fa";

const CodeDisplay = () => {
  const [key, setKey] = useState(0);
  const myCode = `const HomePage = () => {

  const [isLoaded, setIsLoaded] = useState(true);

  const developerInfo = {
    name: 'Cedrick Lemuel F. Cabansag',
    role: 'Full Stack Developer',
    bio: 'Building modern web experiences'
  };

  useEffect(() => {
    document.title = \`\${developerInfo.name}\`\;
    setIsLoaded(true);
  }, []);

  return (
    <main className="hero-container">
      <h1>{developerInfo.name}</h1>
      <p>{developerInfo.role}</p>
      <div className="cta">
        <Link href="/projects">View Projects</Link>
      </div>
    </main>
  );
};
export default HomePage;`;

  return (
    <>
      <Code className="w-xl border-gray-600" code={myCode}>
        <CodeHeader
          icon={FaReact}
          className="bg-windowColor text-white border-gray-600"
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
          onDone={() => {
            setTimeout(() => setKey((prev) => prev + 1), 60000);
          }}
        ></CodeBlock>
      </Code>
    </>
  );
};

export default CodeDisplay;
