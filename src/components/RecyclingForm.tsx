import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Recycle } from "lucide-react";
import { useRecycling } from "@/hooks/useRecycling";
import { useAuth } from "@/hooks/useAuth";

const recyclingSchema = z.object({
  material_type: z.string().min(1, "Selecione o tipo de material"),
  weight_kg: z
    .number()
    .min(0.1, "Peso deve ser maior que 0.1kg")
    .max(100, "Peso deve ser menor que 100kg"),
  location: z.string().optional(),
});

type RecyclingFormValues = z.infer<typeof recyclingSchema>;

interface RecyclingFormProps {
  onSuccess?: (data: { pointsEarned: number; newTotalPoints: number }) => void;
}

export function RecyclingForm({ onSuccess }: RecyclingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { user, updateUserPoints } = useAuth();
  const { addRecyclingActivity } = useRecycling(user?.id);

  const form = useForm<RecyclingFormValues>({
    resolver: zodResolver(recyclingSchema),
    defaultValues: {
      material_type: "",
      weight_kg: 0,
      location: "",
    },
  });

  const materialTypes = ["Plástico", "Papel", "Vidro", "Metal", "Eletrônicos"];

  const onSubmit = async (data: RecyclingFormValues) => {
    if (!user) {
      setSubmitError("Você precisa estar logado para registrar reciclagem");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      const result = await addRecyclingActivity({
        material_type: data.material_type,
        weight_kg: data.weight_kg,
        location: data.location,
      });

      if (result.success) {
        setSubmitMessage(
          `Reciclagem registrada com sucesso! Você ganhou ${result.pointsEarned} pontos.`,
        );

        // Update user points in auth context
        if (result.newTotalPoints) {
          await updateUserPoints(result.newTotalPoints);
        }

        // Call success callback
        if (onSuccess) {
          onSuccess({
            pointsEarned: result.pointsEarned,
            newTotalPoints: result.newTotalPoints,
          });
        }

        // Reset form
        form.reset();

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitMessage(null), 5000);
      } else {
        setSubmitError(result.error || "Erro ao registrar reciclagem");
      }
    } catch (error: any) {
      setSubmitError(
        error.message || "Erro inesperado ao registrar reciclagem",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center">
            <Recycle className="h-6 w-6 text-syntiro-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Registrar Reciclagem
          </CardTitle>
          <CardDescription className="text-gray-600">
            Registre sua atividade de reciclagem e ganhe pontos
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitMessage && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {submitMessage}
              </AlertDescription>
            </Alert>
          )}

          {submitError && (
            <Alert className="mb-4 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {submitError}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="material_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Material</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {materialTypes.map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight_kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100"
                        placeholder="Ex: 2.5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ecoponto Shopping Cuiabá"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-syntiro-500 hover:bg-syntiro-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Reciclagem"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecyclingForm;
