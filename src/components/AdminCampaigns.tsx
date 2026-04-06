import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Clock, Image, Search } from "lucide-react";
import {
  useCampaigns,
  type Campaign,
  type CampaignSubmission,
} from "@/hooks/useCampaigns";
import { useAuth } from "@/hooks/useAuth";

/**
 * Limpa a descrição que vem do bot (VisionAgent do Botpress)
 * Extrai apenas a parte útil: o que o objeto é, removendo URLs, headers e metadados
 */
function cleanBotDescription(raw: string): string {
  if (!raw) return "";

  // Remove prefixo "(Image) URL..." até o primeiro "\n" ou "The user replied"
  let text = raw.replace(/^\(Image\)\s*https?:\/\/[^\s]+\s*/i, "");
  text = text.replace(/^The user replied with an image\.\s*Here'?s the image analysis:\s*/i, "");

  // Remove headers markdown (### Context and Details:, etc)
  text = text.replace(/###\s*[^\n]+\n/g, "");

  // Remove marcadores de lista markdown (- **Object**: ...)
  // Extrai o conteúdo de cada item
  const items: string[] = [];
  const itemRegex = /-\s*\*\*(\w+)\*\*:\s*(.+)/g;
  let match;
  while ((match = itemRegex.exec(text)) !== null) {
    items.push(match[2].trim());
  }

  if (items.length > 0) {
    return items[0]; // Retorna apenas o primeiro item (Object)
  }

  // Se não achou items, tenta pegar a primeira frase descritiva
  const firstSentence = text.replace(/\n+/g, " ").trim().split(/\.\s/)[0];
  if (firstSentence && firstSentence.length > 10) {
    return firstSentence + ".";
  }

  // Fallback: retorna texto limpo truncado
  return text.replace(/\n+/g, " ").trim().slice(0, 200);
}

const AdminCampaigns: React.FC = () => {
  const { user } = useAuth();
  const {
    campaigns,
    submissions,
    loading,
    submissionsLoading,
    fetchSubmissions,
    approveSubmission,
    rejectSubmission,
    getCampaignStats,
  } = useCampaigns();

  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<CampaignSubmission | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pointsToAward, setPointsToAward] = useState(25);

  // Fetch submissions when filters change
  useEffect(() => {
    fetchSubmissions(
      selectedCampaign === "all" ? undefined : selectedCampaign,
      statusFilter,
    );
  }, [selectedCampaign, statusFilter, fetchSubmissions]);

  // Get current campaign for points reference
  const currentCampaign = campaigns.find((c) => c.id === selectedCampaign);

  // Filter submissions by search
  const filteredSubmissions = submissions.filter((sub) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      sub.user_name?.toLowerCase().includes(term) ||
      sub.user_email?.toLowerCase().includes(term) ||
      sub.description?.toLowerCase().includes(term)
    );
  });

  // Handle approve
  const handleApprove = async () => {
    if (!selectedSubmission || !user?.id) return;
    const success = await approveSubmission(
      selectedSubmission.id,
      pointsToAward,
      user.id,
    );
    if (success) {
      setIsReviewOpen(false);
      setSelectedSubmission(null);
    }
  };

  // Handle reject
  const handleReject = async () => {
    if (!selectedSubmission || !user?.id) return;
    const success = await rejectSubmission(
      selectedSubmission.id,
      rejectReason,
      user.id,
    );
    if (success) {
      setIsRejectOpen(false);
      setRejectReason("");
      setSelectedSubmission(null);
    }
  };

  // Open review dialog
  const openReview = (sub: CampaignSubmission) => {
    setSelectedSubmission(sub);
    // Default points from campaign config
    const campaign = campaigns.find((c) => c.id === sub.campaign_id);
    setPointsToAward(campaign?.points_per_kg || 25);
    setIsReviewOpen(true);
  };

  // Open reject dialog
  const openReject = (sub: CampaignSubmission) => {
    setSelectedSubmission(sub);
    setRejectReason("");
    setIsRejectOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Aprovado
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Rejeitado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Campaign stats cards
  const renderStats = () => {
    const campaignId =
      selectedCampaign === "all" ? campaigns[0]?.id : selectedCampaign;
    if (!campaignId) return null;

    const stats = getCampaignStats(campaignId);

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total enviados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {stats.pending}
              </p>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats.approved}
              </p>
              <p className="text-sm text-muted-foreground">Aprovados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalPointsAwarded}
              </p>
              <p className="text-sm text-muted-foreground">Pontos creditados</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando campanhas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campaign selector + filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Selecione a campanha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as campanhas</SelectItem>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="approved">Aprovados</SelectItem>
            <SelectItem value="rejected">Rejeitados</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por usuário..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      {renderStats()}

      {/* Submissions list */}
      {submissionsLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">
                Nenhuma submission encontrada
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {statusFilter === "pending"
                  ? "Não há fotos pendentes de validação no momento."
                  : "Altere os filtros para ver outras submissions."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions.map((sub) => (
              <Card key={sub.id} className="overflow-hidden">
                {/* Photo preview */}
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {sub.photo_url ? (
                    <img
                      src={sub.photo_url}
                      alt="Foto do material"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {sub.user_name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {sub.user_email}
                      </CardDescription>
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>
                </CardHeader>

                <CardContent className="pb-2">
                  {sub.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {cleanBotDescription(sub.description)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enviado em {formatDate(sub.created_at)}
                  </p>
                  {sub.status === "approved" && (
                    <p className="text-sm font-medium text-green-600 mt-1">
                      +{sub.points_awarded} pontos creditados
                    </p>
                  )}
                  {sub.status === "rejected" && sub.rejection_reason && (
                    <p className="text-sm text-red-600 mt-1">
                      Motivo: {sub.rejection_reason}
                    </p>
                  )}
                </CardContent>

                {/* Actions for pending submissions */}
                {sub.status === "pending" && (
                  <div className="p-4 pt-0 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => openReview(sub)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => openReject(sub)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Approve Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Aprovar Submission</DialogTitle>
            <DialogDescription>
              Confirme a aprovação e defina os pontos a serem creditados.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4 py-4">
              {/* Photo */}
              {selectedSubmission.photo_url && (
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={selectedSubmission.photo_url}
                    alt="Foto do material"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Usuário:</span>{" "}
                  {selectedSubmission.user_name}
                </p>
                {selectedSubmission.description && (
                  <p className="text-sm">
                    <span className="font-medium">Descrição:</span>{" "}
                    {cleanBotDescription(selectedSubmission.description)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Pontos a creditar</Label>
                <Input
                  id="points"
                  type="number"
                  value={pointsToAward}
                  onChange={(e) => setPointsToAward(parseInt(e.target.value) || 0)}
                  min={1}
                />
                <p className="text-xs text-muted-foreground">
                  Referência da campanha:{" "}
                  {currentCampaign?.points_per_kg || 25} pontos/kg
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              <Check className="h-4 w-4 mr-1" />
              Confirmar Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Rejeitar Submission</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição. O usuário será notificado.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da rejeição</Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ex: Material não identificável na foto, foto muito escura..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <X className="h-4 w-4 mr-1" />
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCampaigns;
