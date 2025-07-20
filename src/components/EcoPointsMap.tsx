import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface EcoPointsMapProps {}

export const EcoPointsMap: React.FC<EcoPointsMapProps> = () => {
  const openGoogleMaps = () => {
    const url =
      "https://www.google.com/maps/place/Assembleia+Legislativa+do+Estado+de+Mato+Grosso/@-15.5692,-56.0838,17z/data=!3m1!4b1!4m6!3m5!1s0x939db1a7a5e9d0d1:0x3f5c3e23d1d93c63!8m2!3d-15.5692!4d-56.0812!16s%2Fg%2F1tfjvs0h";
    window.open(url, "_blank");
  };

  return (
    <Card className="w-full bg-white shadow-syntiro rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Ecoponto Piloto - Assembleia Legislativa de Mato Grosso
          </CardTitle>
          <CardDescription className="text-gray-600">
            Av. André Maggi, 6 - Centro Político Administrativo, Cuiabá - MT,
            78049-901
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden">
          {/* Google Maps iframe */}
          <iframe
            title="Ecoponto Piloto - ALMT"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Assembleia+Legislativa+de+Mato+Grosso,Av.+André+Maggi,+6+-+Centro+Político+Administrativo,+Cuiabá+-+MT,78049-901"
          />

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
