const ContactsCard = () => {
  return (
    <>
      <div className="flex flex-col bg-windowColor border border-t-4 border-t-draculaPink border-borderColor rounded-md w-2xl h-86 px-12 py-8 gap-2">
        <div className="flex gap-3">
          <p className="font-mono text-draculaPink text-2xl">.socials</p>
          <p className="font-mono text-white text-2xl">{"{"}</p>
        </div>

        <div className="flex ml-10 gap-2">
          <p className="font-mono text-white text-2xl">email:</p>
          <a
            href="mailto:cedrick005.lemuel@gmail.com"
            className="font-mono text-draculaPink text-2xl hover:underline"
          >
            cedrick005.lemuel@gmail.com
          </a>
        </div>

        <div className="flex ml-10 gap-2">
          <p className="font-mono text-white text-2xl">github:</p>
          <a
            href="https://github.com/zMeliodas"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-draculaPink text-2xl hover:underline"
          >
            zMeliodas
          </a>
        </div>

        <div className="flex ml-10 gap-2">
          <p className="font-mono text-white text-2xl">instagram:</p>
          <a
            href="https://www.instagram.com/cedlemuel/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-draculaPink text-2xl hover:underline"
          >
            @cedlemuel
          </a>
        </div>

        <div className="flex ml-10 gap-2">
          <p className="font-mono text-white text-2xl">facebook:</p>
          <a
            href="https://www.facebook.com/meliodasw0w/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-draculaPink text-2xl hover:underline"
          >
            Cedrick Lemuel Flores Cabansag
          </a>
        </div>

        <div className="flex ml-10 gap-2">
          <p className="font-mono text-white text-2xl">
            linkedIn:
          </p>
          <a
            href="https://www.linkedin.com/in/cedrick-lemuel-cabansag-103148306/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-draculaPink text-2xl hover:underline"
          >
            Cedrick Lemuel Cabansag
          </a>
        </div>

        <p className="font-mono text-white text-2xl">{"}"}</p>
      </div>
    </>
  );
};

export default ContactsCard;
