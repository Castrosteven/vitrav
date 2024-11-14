"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingModal from "../components/server_components/Modals/booking-modal";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock data for a single attraction
const attraction = {
  id: 1,
  name: "Eiffel Tower",
  description:
    "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance arch to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognizable structures in the world.",
  image: "/placeholder.svg?height=400&width=600",
  category: "Sightseeing",
  address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
  openingHours: "9:00 AM - 12:45 AM",
  phone: "+33 892 70 12 39",
  website: "https://www.toureiffel.paris/en",
  rating: 4.6,
  reviews: 140253,
  price: "€26.10",
  latitude: 48.8584,
  longitude: 2.2945,
};

export default function AttractionDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to all attractions
        </Button>
        <BookingModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{attraction.name}</h1>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{attraction.category}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{attraction.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({attraction.reviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>
          <Button>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Image
            width={48}
            height={48}
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p className="text-gray-700">{attraction.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Opening Hours: {attraction.openingHours}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Phone: {attraction.phone}</span>
                </li>
                <li className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-gray-500" />
                  <a
                    href={attraction.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Official Website
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{attraction.address}</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="map" className="mt-4">
              <div className="bg-gray-200 h-[300px] rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Map placeholder - Integration with Google Maps or similar
                  service required
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Book your visit</h3>
              <p className="text-2xl font-bold mb-4">{attraction.price}</p>

              <Button
                onClick={() => {
                  router.push("/book");
                }}
                className="w-full mb-4"
              >
                Book Now
              </Button>
              <p className="text-sm text-gray-500 mb-4">
                Free cancellation available
              </p>
              <h4 className="font-semibold mb-2">What&apos;s included:</h4>
              <ul className="text-sm space-y-1">
                <li>• Skip-the-line access</li>
                <li>• Guided tour (optional)</li>
                <li>• Access to all levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
