import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Hero } from "@/types";

interface WinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guessCount: number;
  hero: Hero;
}

const WinDialog: React.FC<WinDialogProps> = ({
  isOpen,
  onClose,
  guessCount,
  hero,
}) => {
  console.log(hero);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`bg-black/80 border border-white/40 backdrop-blur-sm`}
      placement="center">
      <ModalContent className="py-4">
        <ModalHeader className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold">🎉 Congrats! 🎉</span>
        </ModalHeader>
        <ModalBody className="text-center space-y-4">
          <p className="text-xl">
            You found the hero in{" "}
            <span className="font-bold">
              {guessCount} {guessCount === 1 ? "guess" : "guesses"}
            </span>
            !
          </p>
          <div className="mt-2">
            <p className="text-gray-400">The hero was:</p>
            <p className="text-2xl font-bold mt-1">{hero.name}</p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center pt-4">
          <Button
            className="font-semibold px-8 transition-transform"
            onPress={onClose}
            size="lg">
            Play Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WinDialog;
