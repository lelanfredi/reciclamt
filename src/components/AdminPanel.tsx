import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, Edit, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  category: string;
  available: boolean;
  imageUrl: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  joinDate: string;
}

const initialRewards: Reward[] = [];

const initialUsers: User[] = [];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("rewards");
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("");
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  // Form state for new/edit reward
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pointsRequired: 0,
    category: "",
    available: true,
    imageUrl: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "pointsRequired" ? parseInt(value) || 0 : value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: name === "available" ? value === "true" : value,
    });
  };

  // Open add reward dialog
  const openAddRewardDialog = () => {
    setFormData({
      name: "",
      description: "",
      pointsRequired: 0,
      category: "",
      available: true,
      imageUrl: "",
    });
    setIsAddRewardOpen(true);
  };

  // Open edit reward dialog
  const openEditRewardDialog = (reward: Reward) => {
    setCurrentReward(reward);
    setFormData({
      name: reward.name,
      description: reward.description,
      pointsRequired: reward.pointsRequired,
      category: reward.category,
      available: reward.available,
      imageUrl: reward.imageUrl,
    });
    setIsEditRewardOpen(true);
  };

  // Add new reward
  const addReward = () => {
    const newReward: Reward = {
      id: `${rewards.length + 1}`,
      ...formData,
    };
    setRewards([...rewards, newReward]);
    setIsAddRewardOpen(false);
  };

  // Update existing reward
  const updateReward = () => {
    if (!currentReward) return;

    const updatedRewards = rewards.map((reward) =>
      reward.id === currentReward.id ? { ...reward, ...formData } : reward,
    );

    setRewards(updatedRewards);
    setIsEditRewardOpen(false);
  };

  // Delete reward
  const deleteReward = (id: string) => {
    setRewards(rewards.filter((reward) => reward.id !== id));
  };

  // Toggle reward availability
  const toggleRewardAvailability = (id: string) => {
    setRewards(
      rewards.map((reward) =>
        reward.id === id ? { ...reward, available: !reward.available } : reward,
      ),
    );
  };

  // Filter rewards based on search term and filters
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch =
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || reward.category === categoryFilter;

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && reward.available) ||
      (availabilityFilter === "unavailable" && !reward.available);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  // Get unique categories for filter
  const categories = Array.from(
    new Set(rewards.map((reward) => reward.category)),
  );

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <Tabs
        defaultValue="rewards"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="rewards">Gerenciar Recompensas</TabsTrigger>
          <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
          <TabsTrigger value="settings">Configurações do Sistema</TabsTrigger>
        </TabsList>

        {/* Rewards Management Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar recompensas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={categoryFilter}
                onValueChange={(value) => setCategoryFilter(value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={availabilityFilter}
                onValueChange={(value) => setAvailabilityFilter(value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="unavailable">Indisponível</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isAddRewardOpen} onOpenChange={setIsAddRewardOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openAddRewardDialog}
                  className="whitespace-nowrap"
                >
                  <Plus className="mr-2 h-4 w-4" /> Nova Recompensa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Recompensa</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da nova recompensa abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pointsRequired" className="text-right">
                      Pontos
                    </Label>
                    <Input
                      id="pointsRequired"
                      name="pointsRequired"
                      type="number"
                      value={formData.pointsRequired}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Categoria
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="available" className="text-right">
                      Disponível
                    </Label>
                    <Select
                      name="available"
                      value={formData.available ? "true" : "false"}
                      onValueChange={(value) =>
                        handleSelectChange("available", value)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl" className="text-right">
                      URL da Imagem
                    </Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={addReward}>
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      reward.imageUrl ||
                      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400&q=80"
                    }
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{reward.name}</CardTitle>
                    <Badge variant={reward.available ? "default" : "outline"}>
                      {reward.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-gray-500">
                    {reward.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{reward.description}</p>
                  <p className="font-bold mt-2">
                    {reward.pointsRequired} pontos
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Dialog
                    open={isEditRewardOpen && currentReward?.id === reward.id}
                    onOpenChange={setIsEditRewardOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditRewardDialog(reward)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Editar Recompensa</DialogTitle>
                        <DialogDescription>
                          Atualize os detalhes da recompensa abaixo.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="edit-name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-description"
                            className="text-right"
                          >
                            Descrição
                          </Label>
                          <Textarea
                            id="edit-description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-pointsRequired"
                            className="text-right"
                          >
                            Pontos
                          </Label>
                          <Input
                            id="edit-pointsRequired"
                            name="pointsRequired"
                            type="number"
                            value={formData.pointsRequired}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-category" className="text-right">
                            Categoria
                          </Label>
                          <Input
                            id="edit-category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-available"
                            className="text-right"
                          >
                            Disponível
                          </Label>
                          <Select
                            name="available"
                            value={formData.available ? "true" : "false"}
                            onValueChange={(value) =>
                              handleSelectChange("available", value)
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Sim</SelectItem>
                              <SelectItem value="false">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-imageUrl" className="text-right">
                            URL da Imagem
                          </Label>
                          <Input
                            id="edit-imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={updateReward}>
                          Salvar Alterações
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRewardAvailability(reward.id)}
                    >
                      {reward.available ? (
                        <X className="h-4 w-4 mr-1" />
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      {reward.available ? "Desativar" : "Ativar"}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta recompensa? Esta
                            ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteReward(reward.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredRewards.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Nenhuma recompensa encontrada.</p>
            </div>
          )}
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium">Nome</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Telefone</th>
                  <th className="py-3 px-4 text-left font-medium">Pontos</th>
                  <th className="py-3 px-4 text-left font-medium">
                    Data de Cadastro
                  </th>
                  <th className="py-3 px-4 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{user.points}</td>
                    <td className="py-3 px-4">
                      {new Date(user.joinDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Nenhum usuário encontrado.</p>
            </div>
          )}
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>
                Gerencie as configurações gerais do sistema ReciclaMT.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="system-name">Nome do Sistema</Label>
                  <Input id="system-name" defaultValue="ReciclaMT" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de Contato</Label>
                  <Input
                    id="contact-email"
                    defaultValue="contato@reciclamt.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points-ratio">
                    Razão de Pontos (kg para pontos)
                  </Label>
                  <Input id="points-ratio" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-redemption">
                    Pontos Mínimos para Resgate
                  </Label>
                  <Input id="min-redemption" type="number" defaultValue="500" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminPanel;
