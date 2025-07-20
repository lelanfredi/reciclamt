import React, { useState, useEffect } from "react";
import { Search, Filter, Award, Gift, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRewards } from "@/hooks/useRewards";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "./ui/alert";

interface Reward {
  id: string;
  title: string;
  description: string;
  category: string;
  pointCost: number;
  image: string;
}

interface RewardsCatalogProps {
  userPoints?: number;
  userId?: string;
  rewards?: Reward[];
  onRedeemReward?: (rewardId: string) => void;
}

const RewardsCatalog: React.FC<RewardsCatalogProps> = ({
  userPoints = 1250,
  userId,
  rewards: propRewards,
  onRedeemReward = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redemptionMessage, setRedemptionMessage] = useState<string | null>(
    null,
  );
  const [redemptionError, setRedemptionError] = useState<string | null>(null);

  const { rewards: supabaseRewards, loading, redeemReward } = useRewards();
  const { user, updateUserPoints } = useAuth();

  // Use Supabase rewards if available, otherwise use props
  const rewards =
    supabaseRewards.length > 0
      ? supabaseRewards.map((reward) => ({
          id: reward.id,
          title: reward.name,
          description: reward.description,
          category: reward.category,
          pointCost: reward.points_required,
          image:
            reward.image_url ||
            "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
        }))
      : propRewards || [];

  const categories = [
    "all",
    ...new Set(rewards.map((reward) => reward.category)),
  ];

  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch =
      reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setIsDialogOpen(true);
  };

  const confirmRedemption = async () => {
    if (!selectedReward || !userId) return;

    setRedemptionError(null);
    setRedemptionMessage(null);

    const result = await redeemReward(userId, selectedReward.id, userPoints);

    if (result.success) {
      setRedemptionMessage(
        `Resgate realizado com sucesso! Código: ${result.redemptionCode}`,
      );
      // Update user points in the auth context
      if (result.newPoints !== null) {
        await updateUserPoints(result.newPoints);
      }
      setTimeout(() => {
        setIsDialogOpen(false);
        setRedemptionMessage(null);
      }, 3000);
    } else {
      setRedemptionError(result.error || "Erro ao resgatar recompensa");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Gift className="h-6 w-6 text-emerald-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Catálogo de Recompensas
          </h2>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-amber-500 mr-2" />
          <span className="text-lg font-medium">
            Seus pontos: <span className="text-amber-500">{userPoints}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar recompensas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "Todas as categorias" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Carregando recompensas...</p>
        </div>
      ) : filteredRewards.length === 0 ? (
        <div className="text-center py-12">
          <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500">
            Nenhuma recompensa encontrada
          </h3>
          <p className="text-gray-400 mt-2">
            Tente ajustar seus filtros ou buscar por outro termo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      {reward.category}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-medium text-amber-700">
                      {reward.pointCost} pontos
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={
                      userPoints >= reward.pointCost ? "default" : "outline"
                    }
                    disabled={userPoints < reward.pointCost}
                    onClick={() => handleRedeemClick(reward)}
                  >
                    {userPoints >= reward.pointCost
                      ? "Resgatar Recompensa"
                      : `Faltam ${reward.pointCost - userPoints} pontos`}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Resgate</DialogTitle>
            <DialogDescription>
              Você está prestes a resgatar a seguinte recompensa:
            </DialogDescription>
          </DialogHeader>

          {redemptionMessage && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                {redemptionMessage}
              </AlertDescription>
            </Alert>
          )}

          {redemptionError && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">
                {redemptionError}
              </AlertDescription>
            </Alert>
          )}

          {selectedReward && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded overflow-hidden">
                  <img
                    src={selectedReward.image}
                    alt={selectedReward.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedReward.title}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedReward.description}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Custo:</span>
                  <span className="font-medium text-amber-700">
                    {selectedReward.pointCost} pontos
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Seu saldo após resgate:</span>
                  <span className="font-medium text-amber-700">
                    {userPoints - selectedReward.pointCost} pontos
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Após confirmar, você receberá instruções sobre como utilizar sua
                recompensa por email.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setRedemptionMessage(null);
                setRedemptionError(null);
              }}
              disabled={!!redemptionMessage}
            >
              {redemptionMessage ? "Fechar" : "Cancelar"}
            </Button>
            {!redemptionMessage && (
              <Button onClick={confirmRedemption} disabled={!!redemptionError}>
                Confirmar Resgate
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsCatalog;
