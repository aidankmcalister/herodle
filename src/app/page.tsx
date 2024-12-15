"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { Icon } from "@iconify/react";

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
    setGuesses((prev) => [...prev, selectedHero]);
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
  }: {
    field: string;
    content: string | number;
    actualValue: string | number;
  }) => (
    <div
      className={`rounded-sm flex items-center justify-center p-2 -skew-y-6 relative
        ${getMatchStatus(field, content, actualValue)}
       `}>
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
      <span className="text-center font-semibold skew-y-6 relative z-10">
        {field === "year"
          ? content
          : Array.isArray(content)
          ? content.join(", ")
          : content}
      </span>
    </div>
  );

  return (
    <div className="mt-20 bg-black/75 backdrop-blur-sm p-8 rounded-lg shadow-lg w-screen max-w-3xl flex flex-col items-center justify-center">
      <h1 className="text-9xl font-marvel tracking-tight">HERODLE</h1>

      <div className="w-full max-w-2xl space-y-10">
        <div className="relative">
          <Input
            value={guess}
            onChange={(e) => handleGuessChange(e.target.value)}
            placeholder="Enter hero name..."
            disabled={gameWon}
            className="text-black"
          />

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-background border rounded-lg mt-1">
              {suggestions.map((hero) => (
                <div
                  key={hero.id}
                  className="group p-2 hover:bg-white/10 transition-all duration-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                  onClick={() => handleGuessSubmit(hero)}>
                  <p className="group-hover:translate-x-2 transition-all duration-100">
                    {hero.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid gap-4">
          {[...guesses].reverse().map((guess, index) => (
            <div key={index} className="grid grid-cols-6 gap-2">
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
              />
              <Card
                field="species"
                content={guess.species}
                actualValue={targetHero?.species || ""}
              />
              <Card
                field="role"
                content={guess.role}
                actualValue={targetHero?.role || ""}
              />
              <Card
                field="rangeType"
                content={guess.rangeType}
                actualValue={targetHero?.rangeType || ""}
              />
              <Card
                field="year"
                content={guess.year}
                actualValue={targetHero?.year || 0}
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
