import React, { useState } from "react";
import { Button } from "./ui/button";
import { seedDatabase } from "../scripts/seedDatabase";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function SeedDatabaseButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await seedDatabase();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Erro ao popular banco de dados");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSeedDatabase}
        disabled={loading}
        className="bg-syntiro-500 hover:bg-syntiro-600"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Populando..." : "Popular Banco de Dados"}
      </Button>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Banco de dados populado com sucesso! Recompensas e ecopontos foram
            adicionados.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-sm text-gray-600">
        Este botão adiciona dados de exemplo (recompensas e ecopontos) ao banco
        de dados. Use apenas uma vez para configurar os dados iniciais.
      </p>
    </div>
  );
}
