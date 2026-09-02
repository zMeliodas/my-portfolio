import ContactsCard from "@/components/ContactsCard";

const Contacts = () => {
  return (
    <div className="bg-backgroundColor w-full h-full overflow-auto">
      <div className="flex flex-col justify-center items-center h-full w-full gap-8 p-4 sm:p-24">
        <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl text-draculaPink">Contact Me</h1>
        <p className="font-mono text-sm md:text-lg lg:text-xl text-center max-w-xl text-white">
          Feel free to reach out to me through any of the social platforms
          below. I'm always open to new opportunities and connections.
        </p>
        <ContactsCard />
      </div>
    </div>
  );
};

export default Contacts;
