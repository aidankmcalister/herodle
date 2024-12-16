import { motion } from "framer-motion";
import Image from "next/image";
import { Hero } from "@/types";
import { Card } from "@/components/Card";

interface GuessGridProps {
  guesses: Hero[];
  targetHero: Hero | null;
}

export function GuessGrid({ guesses, targetHero }: GuessGridProps) {
  return (
    <div className="grid gap-4 justify-items-center">
      <div className="grid grid-cols-6 gap-4 bg-black/30 mt-2 p-1 md:p-2 rounded-lg w-full">
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
            className="grid grid-cols-6 gap-1 md:gap-4">
            <Image
              src={guess.image}
              alt={guess.name}
              width={100}
              height={182}
              priority={guess.isNewest}
              className="object-contain h-[100px] md:h-[182px] w-full"
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
  );
}
