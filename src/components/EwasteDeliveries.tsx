import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEwasteSubmissions } from "@/hooks/useEwasteSubmissions";

interface EwasteDeliveriesProps {
  userId?: string;
  userPhone?: string;
}

const EwasteDeliveries: React.FC<EwasteDeliveriesProps> = ({
  userId,
  userPhone,
}) => {
  const { submissions, loading } = useEwasteSubmissions({
    userId,
    userPhone,
  });

  const statusConfig: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Aguardando validação",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-4 w-4" />,
    },
    approved: {
      label: "Aprovado",
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    rejected: {
      label: "Rejeitado",
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="h-4 w-4" />,
    },
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-syntiro-500 mx-auto mb-4"></div>
          <p>Carregando entregas...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Minhas Entregas de Eletrônicos
        </CardTitle>
        <CardDescription>
          Acompanhe o status das suas entregas na campanha de reciclagem
          eletrônica. Envie fotos pelo WhatsApp para registrar novas entregas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Smartphone className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhuma entrega registrada ainda</p>
            <p className="text-sm mt-1">
              Envie uma foto do seu eletrônico pelo WhatsApp para participar da
              campanha!
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {submissions.map((submission) => {
                const status =
                  statusConfig[submission.status] || statusConfig.pending;
                return (
                  <div
                    key={submission.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-white"
                  >
                    {/* Thumbnail da foto */}
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={submission.photo_url}
                        alt={submission.material_description}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm truncate">
                          {submission.material_description}
                        </p>
                        <Badge className={`${status.color} flex-shrink-0 text-xs`}>
                          {status.icon}
                          <span className="ml-1">{status.label}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(submission.created_at)}
                      </p>
                      {submission.status === "approved" && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          +{submission.points_awarded} pontos recebidos
                        </p>
                      )}
                      {submission.status === "rejected" &&
                        submission.admin_notes && (
                          <p className="text-xs text-red-500 mt-1">
                            {submission.admin_notes}
                          </p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default EwasteDeliveries;
