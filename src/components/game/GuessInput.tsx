import { Input, Button } from "@nextui-org/react";
import { Hero } from "@/types";
import { getBackgroundColorClass } from "@/utils";

interface GuessInputProps {
  guess: string;
  gameWon: boolean;
  suggestions: Hero[];
  onGuessChange: (value: string) => void;
  onGuessSubmit: (hero: Hero) => void;
  onReset: () => void;
}

export function GuessInput({
  guess,
  gameWon,
  suggestions,
  onGuessChange,
  onGuessSubmit,
  onReset,
}: GuessInputProps) {
  return (
    <div className="relative">
      <div className="flex gap-2 justify-between">
        <Input
          value={guess}
          onChange={(e) => onGuessChange(e.target.value)}
          placeholder="Enter hero name..."
          disabled={gameWon}
          className="text-black"
        />
        <Button
          className="flex items-center justify-center px-5 bg-danger-500/75 text-white"
          onPress={onReset}>
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
              onClick={() => onGuessSubmit(hero)}>
              <p className="group-hover:translate-x-2 ml-0.5 group-hover:font-semibold transition-all duration-100">
                {hero.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
