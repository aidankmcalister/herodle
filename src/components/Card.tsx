import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const correctColor = "bg-green-500/80";
const partialColor = "bg-yellow-600/80";
const incorrectColor = "bg-neutral-800/80";

const getMatchStatus = (
  field: string,
  guessValue: string | number | string[],
  actualValue: string | number | string[]
) => {
  if (JSON.stringify(guessValue) === JSON.stringify(actualValue))
    return correctColor;

  if (field === "rangeType" || field === "species" || field === "gender") {
    const guessArray = Array.isArray(guessValue) ? guessValue : [guessValue];
    const actualArray = Array.isArray(actualValue)
      ? actualValue
      : [actualValue];

    const hasOverlap = guessArray.some((guess) =>
      actualArray.some(
        (actual) => String(guess).toLowerCase() === String(actual).toLowerCase()
      )
    );
    if (hasOverlap) return partialColor;
  } else if (field === "role") {
    const guessWords = String(guessValue).toLowerCase().split(" ");
    const actualWords = String(actualValue).toLowerCase().split(" ");

    const hasOverlap = guessWords.some((word) => actualWords.includes(word));
    if (hasOverlap) return partialColor;
  }

  if (field === "year") {
    const guessNum = Number(guessValue);
    const actualNum = Number(actualValue);
    if (guessNum === actualNum) return correctColor;
    return incorrectColor;
  }

  return incorrectColor;
};

export const Card = ({
  field,
  content,
  actualValue,
  isNewest = false,
  index = 0,
}: {
  field: string;
  content: string | number;
  actualValue: string | number;
  isNewest?: boolean;
  index?: number;
}) => (
  <div
    className="relative w-full min-h-[100px] h-full"
    style={{ perspective: "1000px" }}>
    <motion.div
      key={isNewest ? `${field}-newest` : field}
      initial={isNewest ? { rotateY: 180 } : false}
      animate={{ rotateY: 0 }}
      transition={
        isNewest
          ? {
              duration: 1,
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }
          : {}
      }
      className="w-full h-full relative preserve-3d"
      style={{ transformStyle: "preserve-3d" }}>
      <div
        className={`absolute w-full h-full ${incorrectColor} rounded-sm skew-y-6`}
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
      <div
        className={`absolute w-full h-full ${getMatchStatus(
          field,
          content,
          actualValue
        )} rounded-sm -skew-y-6`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}>
        <div className="w-full h-full flex items-center justify-center">
          {field === "year" && (
            <div
              className={`absolute w-full h-full ${
                Number(content) === Number(actualValue)
                  ? "opacity-20"
                  : "opacity-10"
              }`}>
              {Number(content) === Number(actualValue) ? (
                <Icon icon="mdi:equal" className="w-full h-full" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 1800"
                  className={`w-full ${
                    Number(content) > Number(actualValue)
                      ? "rotate-180 origin-center h-4/5"
                      : "origin-bottom mt-8"
                  }`}>
                  <path
                    fill="currentColor"
                    d="M599.992 0L131.243 703.131h252.546V1800h432.422V703.131h252.546z"
                  />
                </svg>
              )}
            </div>
          )}
          <span className="text-center font-bold relative z-10">
            {field === "year"
              ? content
              : Array.isArray(content)
              ? content.join(", ")
              : content}
          </span>
        </div>
      </div>
    </motion.div>
  </div>
);
