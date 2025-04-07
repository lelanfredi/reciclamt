import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import RewardsCatalog from "./RewardsCatalog";
import { LogOut, Award, History, BarChart3, User } from "lucide-react";

interface DashboardProps {
  userName?: string;
  userPoints?: number;
  userEmail?: string;
  userBadges?: Array<{
    id: string;
    name: string;
    icon: string;
    achieved: boolean;
  }>;
  recyclingHistory?: Array<{
    id: string;
    date: string;
    type: string;
    points: number;
  }>;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userName = "João Silva",
  userPoints = 750,
  userEmail = "joao.silva@email.com",
  userBadges = [
    { id: "1", name: "Iniciante", icon: "🌱", achieved: true },
    { id: "2", name: "Reciclador Bronze", icon: "🥉", achieved: true },
    { id: "3", name: "Reciclador Prata", icon: "🥈", achieved: false },
    { id: "4", name: "Reciclador Ouro", icon: "🥇", achieved: false },
    { id: "5", name: "Mestre da Reciclagem", icon: "♻️", achieved: false },
  ],
  recyclingHistory = [
    { id: "1", date: "2023-06-15", type: "Plástico", points: 50 },
    { id: "2", date: "2023-06-10", type: "Papel", points: 30 },
    { id: "3", date: "2023-06-05", type: "Vidro", points: 70 },
    { id: "4", date: "2023-05-28", type: "Metal", points: 100 },
    { id: "5", date: "2023-05-20", type: "Plástico", points: 50 },
    { id: "6", date: "2023-05-15", type: "Papel", points: 30 },
    { id: "7", date: "2023-05-10", type: "Eletrônicos", points: 200 },
    { id: "8", date: "2023-05-05", type: "Vidro", points: 70 },
  ],
  onLogout = () => console.log("Logout clicked"),
}) => {
  const [activeTab, setActiveTab] = useState("progress");

  // Calculate progress to next level
  const nextLevelThreshold = 1000;
  const progressPercentage = Math.min(
    (userPoints / nextLevelThreshold) * 100,
    100,
  );

  // Count achieved badges
  const achievedBadgesCount = userBadges.filter(
    (badge) => badge.achieved,
  ).length;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center justify-center mb-8 mt-4">
          <h2 className="text-2xl font-bold text-primary">ReciclaMT</h2>
        </div>

        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              alt={userName}
            />
            <AvatarFallback>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium">{userName}</h3>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
          <div className="mt-2 flex items-center">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-bold">{userPoints}</span>
            <span className="ml-1 text-muted-foreground">pontos</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant={activeTab === "progress" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("progress")}
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Progresso
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("history")}
          >
            <History className="mr-2 h-5 w-5" />
            Histórico
          </Button>
          <Button
            variant={activeTab === "rewards" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("rewards")}
          >
            <Award className="mr-2 h-5 w-5" />
            Recompensas
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-5 w-5" />
            Perfil
          </Button>
        </nav>

        <Button variant="outline" className="mt-auto" onClick={onLogout}>
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pontos e Nível</CardTitle>
                  <CardDescription>
                    Seu progresso atual no sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Pontos Acumulados
                      </span>
                      <span className="text-2xl font-bold">{userPoints}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso para o próximo nível</span>
                        <span>
                          {userPoints}/{nextLevelThreshold}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conquistas</CardTitle>
                  <CardDescription>Suas medalhas e conquistas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm font-medium">
                      Conquistas desbloqueadas: {achievedBadgesCount}/
                      {userBadges.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {userBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`flex items-center p-3 rounded-lg border ${badge.achieved ? "bg-primary/10" : "bg-muted/50 opacity-60"}`}
                      >
                        <div className="text-2xl mr-3">{badge.icon}</div>
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {badge.achieved ? "Conquistado" : "Bloqueado"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impacto Ambiental</CardTitle>
                <CardDescription>
                  O resultado positivo da sua contribuição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">12kg</p>
                    <p className="text-sm text-muted-foreground">
                      Plástico reciclado
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">8kg</p>
                    <p className="text-sm text-muted-foreground">
                      Papel reciclado
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">5kg</p>
                    <p className="text-sm text-muted-foreground">
                      CO₂ economizado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Reciclagem</CardTitle>
                <CardDescription>
                  Seus registros de reciclagem recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {recyclingHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.date)}
                          </p>
                        </div>
                        <Badge variant="secondary">{item.points} pontos</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <RewardsCatalog userPoints={userPoints} />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil do Usuário</CardTitle>
                <CardDescription>Suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{userName}</h3>
                    <p className="text-muted-foreground">{userEmail}</p>
                    <div className="mt-2 flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-bold">{userPoints}</span>
                      <span className="ml-1 text-muted-foreground">
                        pontos acumulados
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2">Estatísticas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Total de Reciclagens
                      </p>
                      <p className="text-2xl font-bold">
                        {recyclingHistory.length}
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Conquistas
                      </p>
                      <p className="text-2xl font-bold">
                        {achievedBadgesCount}/{userBadges.length}
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Recompensas Resgatadas
                      </p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <Button variant="outline" className="mr-2">
                    Editar Perfil
                  </Button>
                  <Button variant="destructive">Excluir Conta</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
