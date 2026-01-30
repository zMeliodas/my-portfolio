import { type CardTypes } from "@/types";

const Card = ({ imageSrc, title, description, link, icon }: CardTypes) => {
  const getTitleInitial = (title: string) => {
    if (!title) return "";
    return title.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-4 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 pr-12 transition-colors duration-200 max-w-sm max-h-64 w-full"
        >
          <div className="bg-backgroundColor border rounded-lg border-borderColor w-12 h-12">
            {imageSrc !== "" ? (
              <img className="p-1" src={imageSrc} alt="" />
            ) : (
              <div
                className={`rounded-lg bg-draculaPink text-white flex items-center justify-center text-xl font-semibold font-mono h-full`}
              >
                {getTitleInitial(title)}
              </div>
            )}
          </div>
          <h1 className="text-draculaPink font-mono text-2xl">{title}</h1>
          <p className="text-white font-mono text-md">{description}</p>
        </a>
      ) : (
        <div className="flex flex-col gap-4 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 pr-12 transition-colors duration-200 max-w-sm max-h-64 w-full">
          <div className="bg-backgroundColor flex justify-center items-center border rounded-lg border-borderColor w-12 h-12">
            {icon}
          </div>
          <h1 className="text-draculaPink font-mono text-2xl">{title}</h1>
          <p className="text-white font-mono text-md">{description}</p>
        </div>
      )}
    </>
  );
};

export default Card;
