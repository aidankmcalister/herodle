"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Hero } from "@/types";
import WinDialog from "@/components/WinDialog";
import { getBackgroundColorClass } from "@/utils";
import { Card } from "@/components/Card";

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

  const resetGame = () => {
    setGuesses([]);
    setGameWon(false);
    setTargetHero(heroes[Math.floor(Math.random() * heroes.length)]);
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
              onPress={resetGame}>
              Reset Game
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-black/80 backdrop-blur-sm border border-white/30 rounded-lg mt-1">
              {suggestions.map((hero) => (
                <div
                  key={hero.id}
                  className={`group p-2 transition-all duration-100 rounded-md cursor-pointer ${getBackgroundColorClass(
                    hero.primaryColor
                  )}`}
                  onClick={() => handleGuessSubmit(hero)}>
                  <p className="group-hover:translate-x-2 ml-0.5 group-hover:font-semibold transition-all duration-100">
                    {hero.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {gameWon && (
          <WinDialog
            isOpen={gameWon}
            onClose={() => resetGame()}
            guessCount={guesses.length}
            hero={targetHero!}
          />
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
