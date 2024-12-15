"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface Hero {
  id: number;
  name: string;
  gender: string;
  species: string;
  role: string;
  rangeType: string;
  firstAppearance: string;
  year: number;
  image: string;
  isNewest?: boolean;
  primaryColor: string;
}

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

  if (field === "rangeType") {
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
  } else if (field === "role" || field === "species") {
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

const Card = ({
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
  <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
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

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [targetHero, setTargetHero] = useState<Hero | null>(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Hero[]>([]);
  const [suggestions, setSuggestions] = useState<Hero[]>([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    fetch("/data/heroes.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((hero: Hero) => {
          const img = document.createElement("img");
          img.src = hero.image;
        });

        setHeroes(data);
        setTargetHero(data[Math.floor(Math.random() * data.length)]);
      });
  }, []);

  const handleGuessChange = (value: string) => {
    setGuess(value);
    if (value.length > 0) {
      const filtered = heroes.filter((hero) =>
        hero.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleGuessSubmit = (selectedHero: Hero) => {
    if (gameWon) return;
    setGuesses((prev) => [
      ...prev.map((guess) => ({ ...guess, isNewest: false })),
      { ...selectedHero, isNewest: true },
    ]);
    setGuess("");
    setSuggestions([]);
    if (selectedHero.id === targetHero?.id) {
      setGameWon(true);
    }
  };

  return (
    <div className="mt-20 bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-screen max-w-3xl flex flex-col items-center justify-center">
      <h1 className="text-9xl font-marvel">HERODLE</h1>

      <div className={`w-full max-w-2xl`}>
        <div className="relative">
          <div className="flex gap-2 justify-between">
            <Input
              value={guess}
              onChange={(e) => handleGuessChange(e.target.value)}
              placeholder="Enter hero name..."
              disabled={gameWon}
              className="text-black"
            />
            <Button
              className="flex items-center justify-center px-5 bg-danger-500/75 text-white"
              onPress={() => {
                setGuesses([]);
                setGameWon(false);
                setTargetHero(
                  heroes[Math.floor(Math.random() * heroes.length)]
                );
              }}>
              Reset Game
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-black/80 backdrop-blur-sm border border-white/50 rounded-lg mt-1">
              {suggestions.map((hero) => (
                <div
                  key={hero.id}
                  className={`group p-2 transition-all duration-100 rounded-md cursor-pointer bg-${hero.primaryColor}`}
                  onClick={() => handleGuessSubmit(hero)}>
                  <p className="group-hover:translate-x-2 group-hover:font-semibold transition-all duration-100">
                    {hero.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {gameWon && (
          <div className="text-center text-green-500 font-bold text-xl">
            Congratulations! It took you {guesses.length} guess
            {guesses.length === 1 ? "" : "es"}!
          </div>
        )}
        <div className="grid gap-4 justify-items-center">
          <div className="grid grid-cols-6 gap-4 bg-black/30 mt-2 p-4 rounded-lg w-full">
            <h2 className="text-sm font-semibold text-center">Hero</h2>
            <h2 className="text-sm font-semibold text-center">Gender</h2>
            <h2 className="text-sm font-semibold text-center">Species</h2>
            <h2 className="text-sm font-semibold text-center">Role</h2>
            <h2 className="text-sm font-semibold text-center">Range Type</h2>
            <h2 className="text-sm font-semibold text-center">First Year</h2>
          </div>
          <motion.div layout className="w-full grid gap-4">
            {[...guesses].reverse().map((guess) => (
              <motion.div
                key={guess.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-6 gap-4">
                <Image
                  src={guess.image}
                  alt={guess.name}
                  width={100}
                  height={100}
                  priority={guess.isNewest}
                  className="object-contain"
                />
                <Card
                  field="gender"
                  content={guess.gender}
                  actualValue={targetHero?.gender || ""}
                  index={0}
                  isNewest={guess.isNewest}
                />
                <Card
                  field="species"
                  content={guess.species}
                  actualValue={targetHero?.species || ""}
                  index={1}
                  isNewest={guess.isNewest}
                />
                <Card
                  field="role"
                  content={guess.role}
                  actualValue={targetHero?.role || ""}
                  index={2}
                  isNewest={guess.isNewest}
                />
                <Card
                  field="rangeType"
                  content={guess.rangeType}
                  actualValue={targetHero?.rangeType || ""}
                  index={3}
                  isNewest={guess.isNewest}
                />
                <Card
                  field="year"
                  content={guess.year}
                  actualValue={targetHero?.year || 0}
                  index={4}
                  isNewest={guess.isNewest}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
