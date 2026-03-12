import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { env } from "@/config/environment";

interface EcoPointsMapProps {}

export const EcoPointsMap: React.FC<EcoPointsMapProps> = () => {
  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/place/C%C3%A2mara+Municipal+de+Cuiab%C3%A1/@-15.6014,-56.0979,17z/data=!3m1!4b1!4m6!3m5!1s0x939db1a7a5e9d0d1:0x3f5c3e23d1d93c63!8m2!3d-15.6014!4d-56.0953!16s%2Fg%2F1tfjvs0h";
    window.open(url, "_blank");
  };

  return (
    <Card className="w-full bg-white shadow-syntiro rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Ecoponto Piloto - Câmara Municipal de Cuiabá
          </CardTitle>
          <CardDescription className="text-gray-600">
            Praça Barão de Melgaço, s/n - Centro, Cuiabá - MT, 78020-400
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden">
          {/* Google Maps iframe */}
          {env.googleMapsApiKey ? (
            <iframe
              title="Ecoponto Piloto - Câmara Municipal de Cuiabá"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${env.googleMapsApiKey}&q=Câmara+Municipal+de+Cuiabá,Praça+Barão+de+Melgaço,+s/n+-+Centro,+Cuiabá+-+MT,78020-400`}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Mapa indisponível — chave de API não configurada.</p>
            </div>
          )}

          {/* Google Maps link button */}
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={openGoogleMaps}
              className="px-3 py-2 bg-white text-gray-700 rounded-md shadow-md hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              <ExternalLink size={14} />
              Ver no Google Maps
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoPointsMap;
