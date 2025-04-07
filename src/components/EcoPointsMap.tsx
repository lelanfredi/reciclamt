import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Trash2, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EcoPoint {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  openingHours: string;
  acceptedMaterials: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface EcoPointsMapProps {
  ecoPoints?: EcoPoint[];
}

export const EcoPointsMap: React.FC<EcoPointsMapProps> = ({
  ecoPoints = [
    {
      id: "1",
      name: "Ecoponto Jardim das Américas",
      address: "Av. Fernando Corrêa da Costa, 2367",
      neighborhood: "Jardim das Américas",
      city: "Cuiabá",
      state: "MT",
      openingHours: "Segunda a Sábado, 8h às 17h",
      acceptedMaterials: ["Plástico", "Papel", "Vidro", "Metal"],
      coordinates: {
        lat: -15.6014,
        lng: -56.0979,
      },
    },
    {
      id: "2",
      name: "Ecoponto CPA",
      address: "Rua das Palmeiras, 1000",
      neighborhood: "CPA",
      city: "Cuiabá",
      state: "MT",
      openingHours: "Segunda a Sexta, 8h às 18h",
      acceptedMaterials: ["Plástico", "Papel", "Metal", "Eletrônicos"],
      coordinates: {
        lat: -15.5689,
        lng: -56.0643,
      },
    },
    {
      id: "3",
      name: "Ecoponto Centro",
      address: "Praça Alencastro, s/n",
      neighborhood: "Centro",
      city: "Cuiabá",
      state: "MT",
      openingHours: "Segunda a Sexta, 7h às 17h",
      acceptedMaterials: ["Plástico", "Papel", "Vidro", "Metal", "Óleo"],
      coordinates: {
        lat: -15.5989,
        lng: -56.0949,
      },
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<"map" | "list">("map");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEcoPoint, setSelectedEcoPoint] = useState<EcoPoint | null>(
    null,
  );

  const filteredEcoPoints = ecoPoints.filter(
    (ecoPoint) =>
      ecoPoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ecoPoint.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ecoPoint.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openGoogleMaps = (ecoPoint: EcoPoint) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${ecoPoint.coordinates.lat},${ecoPoint.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="w-full bg-white shadow-syntiro rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Ecopontos em Cuiabá
            </CardTitle>
            <CardDescription className="text-gray-600">
              Locais para descarte correto de materiais recicláveis
            </CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
            <Input
              placeholder="Buscar por bairro ou endereço"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "map" | "list")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-syntiro-100 p-1 rounded-xl">
            <TabsTrigger
              value="map"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-syntiro-700 data-[state=active]:shadow-sm"
            >
              Mapa
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-syntiro-700 data-[state=active]:shadow-sm"
            >
              Lista
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="mt-0">
            <div className="relative w-full h-[450px] bg-cream-50 rounded-xl overflow-hidden">
              {/* Placeholder for the actual Google Maps integration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 z-10">Mapa carregando...</p>
                {/* In a real implementation, you would use a library like @react-google-maps/api */}
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?w=800&q=80"
                  alt="Mapa de Cuiabá"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                {/* Pins for each ecopoint */}
                {filteredEcoPoints.map((ecoPoint) => (
                  <div
                    key={ecoPoint.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      top: `${Math.random() * 60 + 20}%`, // Random position for demo
                      left: `${Math.random() * 60 + 20}%`, // Random position for demo
                    }}
                    onClick={() => setSelectedEcoPoint(ecoPoint)}
                  >
                    <div className="bg-syntiro-500 text-white p-2 rounded-full shadow-md hover:bg-syntiro-600 transition-colors">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-syntiro whitespace-nowrap">
                      {ecoPoint.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected ecopoint details */}
              {selectedEcoPoint && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-syntiro z-30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedEcoPoint.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedEcoPoint.address},{" "}
                        {selectedEcoPoint.neighborhood}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openGoogleMaps(selectedEcoPoint)}
                      className="bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-lg"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Como chegar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {filteredEcoPoints.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Nenhum ecoponto encontrado com os termos da busca.
                  </p>
                </div>
              ) : (
                filteredEcoPoints.map((ecoPoint) => (
                  <div
                    key={ecoPoint.id}
                    className="border border-syntiro-200 rounded-xl p-5 hover:bg-syntiro-50/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {ecoPoint.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-2">
                          <MapPin className="h-4 w-4 mr-2 text-syntiro-500" />
                          <p className="text-sm">
                            {ecoPoint.address}, {ecoPoint.neighborhood},{" "}
                            {ecoPoint.city}-{ecoPoint.state}
                          </p>
                        </div>
                        <div className="flex items-center text-gray-600 mt-2">
                          <Clock className="h-4 w-4 mr-2 text-syntiro-500" />
                          <p className="text-sm">{ecoPoint.openingHours}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {ecoPoint.acceptedMaterials.map((material) => (
                            <Badge
                              key={material}
                              variant="outline"
                              className="bg-syntiro-50 text-syntiro-700 border-syntiro-200 rounded-lg py-1 px-2"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => openGoogleMaps(ecoPoint)}
                        className="bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-lg whitespace-nowrap"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Como chegar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EcoPointsMap;
