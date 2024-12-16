"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/types";
import WinDialog from "@/components/WinDialog";
import { GameHeader } from "@/components/game/GameHeader";
import { GuessInput } from "@/components/game/GuessInput";
import { GuessGrid } from "@/components/game/GuessGrid";
import GameTooltip from "@/components/game/GameTooltip";

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
      const filtered = heroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(value.toLowerCase()) &&
          !guesses.some((g) => g.id === hero.id)
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
      <div className="w-full relative">
        <div className="flex justify-center">
          <GameHeader />
        </div>
      </div>

      <div className="">
        <GameTooltip />
      </div>

      <div className={`w-full max-w-2xl mt-4`}>
        <GuessInput
          guess={guess}
          gameWon={gameWon}
          suggestions={suggestions}
          onGuessChange={handleGuessChange}
          onGuessSubmit={handleGuessSubmit}
          onReset={resetGame}
        />

        {gameWon && (
          <WinDialog
            isOpen={gameWon}
            onClose={() => resetGame()}
            guessCount={guesses.length}
            hero={targetHero!}
          />
        )}

        <GuessGrid guesses={guesses} targetHero={targetHero} />
      </div>
    </div>
  );
}
