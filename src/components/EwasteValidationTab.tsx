import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check, X, Eye, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  useEwasteSubmissions,
  EwasteSubmission,
  EwasteStatus,
} from "../hooks/useEwasteSubmissions";
import { EWASTE_POINTS_PER_ITEM } from "../config/constants";

interface EwasteValidationTabProps {
  adminEmail: string;
}

export function EwasteValidationTab({ adminEmail }: EwasteValidationTabProps) {
  const { submissions, loading, approveSubmission, rejectSubmission, getStats } =
    useEwasteSubmissions({ adminMode: true });

  const [statusFilter, setStatusFilter] = useState<EwasteStatus | "all">("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<EwasteSubmission | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [pointsToAward, setPointsToAward] = useState(EWASTE_POINTS_PER_ITEM);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const stats = getStats();

  const filteredSubmissions = submissions.filter((s) => {
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      s.material_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.user_phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleApprove = async () => {
    if (!selectedSubmission) return;
    setActionLoading(true);
    const result = await approveSubmission(
      selectedSubmission.id,
      pointsToAward,
      adminEmail,
    );
    setActionLoading(false);
    if (result.success) {
      setIsReviewOpen(false);
      setSelectedSubmission(null);
      setPointsToAward(EWASTE_POINTS_PER_ITEM);
    }
  };

  const handleReject = async () => {
    if (!selectedSubmission) return;
    setActionLoading(true);
    const result = await rejectSubmission(
      selectedSubmission.id,
      rejectReason || "Foto ou material não atende aos critérios da campanha.",
      adminEmail,
    );
    setActionLoading(false);
    if (result.success) {
      setIsReviewOpen(false);
      setSelectedSubmission(null);
      setRejectReason("");
    }
  };

  const openReview = (submission: EwasteSubmission) => {
    setSelectedSubmission(submission);
    setPointsToAward(EWASTE_POINTS_PER_ITEM);
    setRejectReason("");
    setIsReviewOpen(true);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-syntiro-500"></div>
        <span className="ml-3">Carregando validações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-yellow-600">Pendentes</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
            <p className="text-sm text-green-600">Aprovados</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
            <p className="text-sm text-red-600">Rejeitados</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalPointsAwarded}</p>
            <p className="text-sm text-blue-600">Pontos Distribuídos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por descrição ou telefone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as EwasteStatus | "all")}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="approved">Aprovados</SelectItem>
            <SelectItem value="rejected">Rejeitados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de submissions */}
      {filteredSubmissions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            {statusFilter === "pending"
              ? "Nenhuma validação pendente no momento."
              : "Nenhuma submission encontrada."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              {/* Foto */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={submission.photo_url}
                  alt={submission.material_description}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80";
                  }}
                />
                <div className="absolute top-2 right-2">
                  {statusBadge(submission.status)}
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {submission.material_description}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-2 space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Telefone:</span>{" "}
                  {submission.user_phone}
                </p>
                <p>
                  <span className="font-medium">Enviado em:</span>{" "}
                  {formatDate(submission.created_at)}
                </p>
                <p>
                  <span className="font-medium">Campanha:</span>{" "}
                  {submission.campaign}
                </p>
                {submission.user_id && (
                  <p className="text-green-600 text-xs">
                    Usuário vinculado ao sistema
                  </p>
                )}
                {submission.status === "approved" && (
                  <p className="text-green-700 font-medium">
                    +{submission.points_awarded} pontos
                  </p>
                )}
                {submission.status === "rejected" && submission.admin_notes && (
                  <p className="text-red-600 text-xs">
                    Motivo: {submission.admin_notes}
                  </p>
                )}
              </CardContent>

              <CardFooter className="pt-2">
                {submission.status === "pending" ? (
                  <Button
                    onClick={() => openReview(submission)}
                    className="w-full bg-syntiro-600 hover:bg-syntiro-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Revisar
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => openReview(submission)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de revisão */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSubmission?.status === "pending"
                ? "Revisar Entrega"
                : "Detalhes da Entrega"}
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission?.status === "pending"
                ? "Analise a foto e aprove ou rejeite a entrega."
                : `Status: ${selectedSubmission?.status === "approved" ? "Aprovado" : "Rejeitado"}`}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              {/* Foto ampliada */}
              <div className="rounded-lg overflow-hidden bg-gray-100 max-h-64">
                <img
                  src={selectedSubmission.photo_url}
                  alt={selectedSubmission.material_description}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80";
                  }}
                />
              </div>

              {/* Detalhes */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Material:</span>
                  <p>{selectedSubmission.material_description}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Telefone:</span>
                  <p>{selectedSubmission.user_phone}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Enviado em:</span>
                  <p>{formatDate(selectedSubmission.created_at)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Campanha:</span>
                  <p>{selectedSubmission.campaign}</p>
                </div>
                {selectedSubmission.user_id && (
                  <div className="col-span-2">
                    <span className="font-medium text-green-600">
                      Usuário vinculado ao sistema
                    </span>
                  </div>
                )}
                {selectedSubmission.reviewed_by && (
                  <>
                    <div>
                      <span className="font-medium text-gray-500">
                        Revisado por:
                      </span>
                      <p>{selectedSubmission.reviewed_by}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">
                        Revisado em:
                      </span>
                      <p>
                        {selectedSubmission.reviewed_at
                          ? formatDate(selectedSubmission.reviewed_at)
                          : "-"}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Ações de revisão (apenas para pendentes) */}
              {selectedSubmission.status === "pending" && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <Label htmlFor="points-award">
                      Pontos a conceder
                    </Label>
                    <Input
                      id="points-award"
                      type="number"
                      min={0}
                      value={pointsToAward}
                      onChange={(e) =>
                        setPointsToAward(parseInt(e.target.value) || 0)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reject-reason">
                      Motivo da rejeição (se aplicável)
                    </Label>
                    <Textarea
                      id="reject-reason"
                      placeholder="Descreva o motivo da rejeição..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedSubmission?.status === "pending" && (
            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={actionLoading}
              >
                <X className="h-4 w-4 mr-2" />
                {actionLoading ? "Processando..." : "Rejeitar"}
              </Button>
              <Button
                onClick={handleApprove}
                disabled={actionLoading || pointsToAward <= 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                {actionLoading
                  ? "Processando..."
                  : `Aprovar (+${pointsToAward} pts)`}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
