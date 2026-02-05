import gradpic from "../assets/gradpic.png";

const About = () => {
  return (
    <div className="bg-backgroundColor w-full h-full">
      <div className="flex flex-col justify-center mx-8 2xl:mx-72 items-center gap-2 mt-8 pb-24">
        <div className="w-54 h-54 overflow-hidden rounded-full">
          <img src={gradpic} className="w-full h-auto" alt="" />
        </div>

        <h1 className="text-5xl font-mono text-center text-draculaPink">
          Cedrick Lemuel Cabansag
        </h1>
        <p className="text-3xl font-mono text-center text-white">
          Software Engineer
        </p>

        <div className="flex flex-col justify-center content-center">
          <p className="text-md md:text-xl lg:text-2xl font-mono mt-8 text-white w-full">
            Hey, I'm a software developer who enjoys building full-stack
            applications with React, Node.js, Express, and PostgreSQL. I like
            working across the stack. Designing interfaces, building APIs, and
            structuring databases that make everything run smoothly.
          </p>

          <p className="text-md md:text-xl lg:text-2xl font-mono mt-8 text-white w-full">
            I'm constantly learning and refining my skills, with a focus on
            writing thoughtful and reliable software.
          </p>

          <p className="text-md md:text-xl lg:text-2xl font-mono mt-8 text-white w-full">
            I thrive on solving challenging problems and creating seamless
            digital experiences that delight users. When I’m not coding, you’ll
            find me playing competitive FPS games, hitting the gym, practicing
            martial arts, or jamming on my instruments.
          </p>

          <p className="text-md md:text-xl lg:text-2xl font-mono mt-8 text-white w-full">
            I’m always eager to collaborate on innovative projects and bring
            impactful ideas to life. Let’s build something amazing together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
