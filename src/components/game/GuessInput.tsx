import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { Hero } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    <div className="flex gap-2 justify-between">
      <Autocomplete
        disableSelectorIconRotation
        value={guess}
        variant="faded"
        onInputChange={onGuessChange}
        placeholder="Enter hero name..."
        isDisabled={gameWon}
        className="text-black"
        selectorIcon={
          <Icon icon="mdi:magnify" className="h-6 w-6 text-default-400" />
        }
        classNames={{
          listbox: "text-black",
          base: "text-black data-[selected=true]:bg-blue-500 data-[hover=true]:bg-blue-100",
        }}
        items={suggestions}
        onSelectionChange={(key) => {
          const selectedHero = suggestions.find(
            (hero) => hero.id === Number(key)
          );
          if (selectedHero) onGuessSubmit(selectedHero);
        }}>
        {(hero) => (
          <AutocompleteItem key={hero.id}>
            <span className="text-black">{hero.name}</span>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button
        className="flex items-center justify-center px-5 bg-danger-500/75 text-white"
        onPress={onReset}>
        Reset Game
      </Button>
    </div>
  );
}
