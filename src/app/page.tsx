"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
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

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [targetHero, setTargetHero] = useState<Hero | null>(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Hero[]>([]);
  const [suggestions, setSuggestions] = useState<Hero[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const correctColor = "bg-green-500/80";
  const partialColor = "bg-yellow-600/80";
  const incorrectColor = "bg-neutral-800/80";

  useEffect(() => {
    fetch("/data/heroes.json")
      .then((res) => res.json())
      .then((data) => {
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
          (actual) =>
            String(guess).toLowerCase() === String(actual).toLowerCase()
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
                        : "origin-bottom mt-6"
                    }`}>
                    <path
                      fill="currentColor"
                      d="M599.992 0L131.243 703.131h252.546V1800h432.422V703.131h252.546z"
                    />
                  </svg>
                )}
              </div>
            )}
            <span className="text-center font-semibold relative z-10">
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

  return (
    <div className="mt-20 bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-screen max-w-3xl flex flex-col items-center justify-center">
      <h1 className="text-9xl font-marvel tracking-tight">HERODLE</h1>

      <div
        className={`w-full max-w-2xl ${
          guesses.length > 0 ? "space-y-10" : "space-t-10"
        }`}>
        <div className="relative">
          <Input
            value={guess}
            onChange={(e) => handleGuessChange(e.target.value)}
            placeholder="Enter hero name..."
            disabled={gameWon}
            className="text-black"
          />

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
        <div className="grid gap-4 justify-items-center">
          <div className="grid grid-cols-6">
            <h1 className="text-sm font-bold text-center">Hero</h1>
            <h1 className="text-sm font-bold text-center">Gender</h1>
            <h1 className="text-sm font-bold text-center">Species</h1>
            <h1 className="text-sm font-bold text-center">Role</h1>
            <h1 className="text-sm font-bold text-center">Range Type</h1>
            <h1 className="text-sm font-bold text-center">First Appearance</h1>
          </div>
          {[...guesses].reverse().map((guess) => (
            <div key={guess.id} className="grid grid-cols-6 gap-2">
              <Image
                src={guess.image}
                alt={guess.name}
                width={100}
                height={100}
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
            </div>
          ))}
        </div>{" "}
        {/* <div className="grid gap-4">
          <div className="grid grid-cols-6 gap-2">
            <Card
              field="gender"
              content={targetHero?.gender || ""}
              actualValue={targetHero?.gender || ""}
            />
            <Card
              field="species"
              content={targetHero?.species || ""}
              actualValue={targetHero?.species || ""}
            />
            <Card
              field="role"
              content={targetHero?.role || ""}
              actualValue={targetHero?.role || ""}
            />
            <Card
              field="rangeType"
              content={targetHero?.rangeType || ""}
              actualValue={targetHero?.rangeType || ""}
            />
            <Card
              field="year"
              content={targetHero?.year || 0}
              actualValue={targetHero?.year || 0}
            />
          </div>
        </div> */}
        {gameWon && (
          <div className="text-center text-green-500 font-bold text-xl">
            Congratulations! You found the hero in {guesses.length} guesses!
          </div>
        )}
      </div>
    </div>
  );
}
