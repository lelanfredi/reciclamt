import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Edit3 } from "lucide-react";

interface AvatarOption {
  id: string;
  name: string;
  seed: string;
  backgroundColor: string;
  style: string;
}

interface AvatarSelectorProps {
  currentAvatar?: string;
  onAvatarSelect?: (avatar: AvatarOption) => void;
  size?: "sm" | "md" | "lg";
  showEditButton?: boolean;
}

const avatarOptions: AvatarOption[] = [
  {
    id: "1",
    name: "Floresta",
    seed: "floresta-feliz",
    backgroundColor: "bg-gradient-to-br from-green-400 to-emerald-600",
    style: "happy",
  },
  {
    id: "2",
    name: "Sol",
    seed: "sol-radiante",
    backgroundColor: "bg-gradient-to-br from-yellow-400 to-amber-500",
    style: "cheerful",
  },
  {
    id: "3",
    name: "Oceano",
    seed: "oceano-sereno",
    backgroundColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    style: "smiling",
  },
  {
    id: "4",
    name: "Lavanda",
    seed: "lavanda-suave",
    backgroundColor: "bg-gradient-to-br from-purple-400 to-violet-600",
    style: "fun",
  },
  {
    id: "5",
    name: "Cerejeira",
    seed: "cerejeira-doce",
    backgroundColor: "bg-gradient-to-br from-pink-400 to-rose-500",
    style: "caring",
  },
  {
    id: "6",
    name: "Terra",
    seed: "terra-fertil",
    backgroundColor: "bg-gradient-to-br from-amber-600 to-orange-600",
    style: "grounded",
  },
  {
    id: "7",
    name: "Brisa",
    seed: "brisa-fresca",
    backgroundColor: "bg-gradient-to-br from-cyan-400 to-teal-500",
    style: "fresh",
  },
  {
    id: "8",
    name: "Folha",
    seed: "folha-verde",
    backgroundColor: "bg-gradient-to-br from-lime-400 to-green-500",
    style: "natural",
  },
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatar = "felix",
  onAvatarSelect,
  size = "md",
  showEditButton = true,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(
    avatarOptions.find((avatar) => avatar.seed === currentAvatar) ||
      avatarOptions[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarSelect = (avatar: AvatarOption) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = () => {
    if (onAvatarSelect) {
      onAvatarSelect(selectedAvatar);
    }
    setIsOpen(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "lg":
        return "h-24 w-24";
      default:
        return "h-12 w-12";
    }
  };

  const getAvatarUrl = (seed: string) => {
    // Configuração para personagens com expressão neutra e cores da natureza
    const skinColors = {
      "floresta-feliz": "D4A574",
      "sol-radiante": "F4C2A1",
      "oceano-sereno": "E8B4A0",
      "lavanda-suave": "F2D7D5",
      "cerejeira-doce": "F8D7DA",
      "terra-fertil": "D2B48C",
      "brisa-fresca": "E6F3F7",
      "folha-verde": "E8F5E8",
    };

    const skinColor = skinColors[seed as keyof typeof skinColors] || "D4A574";

    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent&skinColor=${skinColor}&mouthType=default&eyeType=default&eyebrowType=default&facialHairType=blank&clothesColor=7ED321,4A90E2,F5A623,9013FE,FF6B9D&hairColor=8B4513,654321,D2691E,228B22&topType=shortHair,longHair,curly&clothesType=hoodie,sweater,shirt&accessoriesType=blank&hatColor=228B22,8B4513,4A90E2`;
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative ${selectedAvatar.backgroundColor} p-1 rounded-full`}
      >
        <Avatar className={getSizeClasses()}>
          <AvatarImage
            src={getAvatarUrl(selectedAvatar.seed)}
            alt={selectedAvatar.name}
          />
          <AvatarFallback className="bg-white text-gray-600">
            {selectedAvatar.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {showEditButton && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                Escolha seu Avatar
              </DialogTitle>
              <DialogDescription className="text-center">
                Selecione um avatar que represente sua personalidade
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-4 py-6">
              {avatarOptions.map((avatar, index) => (
                <motion.div
                  key={avatar.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`relative cursor-pointer transition-all duration-200 hover:scale-110 ${
                      selectedAvatar.id === avatar.id
                        ? "ring-4 ring-syntiro-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                    } ${avatar.backgroundColor} p-2 rounded-full`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={getAvatarUrl(avatar.seed)}
                        alt={avatar.name}
                      />
                      <AvatarFallback className="bg-white text-gray-600">
                        {avatar.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {selectedAvatar.id === avatar.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-syntiro-500 text-white rounded-full p-1"
                      >
                        <Check className="h-3 w-3" />
                      </motion.div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-600">
                    {avatar.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-syntiro-500 hover:bg-syntiro-600"
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AvatarSelector;
