import { type CardTypes } from "@/types";

const Card = ({ imageSrc, title, description, link, icon }: CardTypes) => {
  const getTitleInitial = (title: string) => {
    if (!title) return "";
    return title.trim().charAt(0).toUpperCase();
  };

  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="flex flex-col gap-3 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 transition-colors duration-200 w-full h-full"
    >
      <div className="bg-backgroundColor flex items-center justify-center border rounded-lg border-borderColor w-12 h-12 overflow-hidden">
        {imageSrc ? (
          <img
            className="w-full h-full object-contain p-1"
            src={imageSrc}
            alt={title}
          />
        ) : icon ? (
          icon
        ) : (
          <div className="rounded-lg bg-draculaPink text-white flex items-center justify-center text-xl font-semibold font-mono h-full w-full">
            {getTitleInitial(title)}
          </div>
        )}
      </div>
      <h1 className="text-draculaPink font-mono text-2xl">{title}</h1>
      <p className="text-white font-mono text-sm">{description}</p>
    </Wrapper>
  );
};

export default Card;