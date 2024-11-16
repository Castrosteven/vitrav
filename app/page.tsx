import { MapPin, Utensils, Camera, Music } from "lucide-react";
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
import Image from "next/image";
import SearchBar from "./components/client_components/search_bar";
import { auth } from "@/lib/auth";

const attractions = [
  {
    id: 1,
    name: "Eiffel Tower",
    description: "Iconic iron lattice tower on the Champ de Mars in Paris.",
    image: "https://placehold.co/200x300",
    category: "Sightseeing",
  },
  {
    id: 2,
    name: "Le Petit Bistro",
    description: "Charming French restaurant offering authentic local cuisine.",
    image: "https://placehold.co/200x300",
    category: "Food",
  },
  {
    id: 3,
    name: "Louvre Museum",
    description: "World's largest art museum and home to many famous works.",
    image: "https://placehold.co/200x300",
    category: "Sightseeing",
  },
  {
    id: 4,
    name: "Jazz Club",
    description: "Intimate venue featuring live jazz performances nightly.",
    image: "https://placehold.co/200x300",
    category: "Entertainment",
  },
];

async function TouristAttractionFinder() {
  //  const data = await getAttractions("Paris", "Sightseeing")
  const session = await auth();
  console.log(session);
  const categories = ["All", "Sightseeing", "Food", "Entertainment"];
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Discover Paris</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* <div className="relative flex-grow">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search attractions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div> */}
        {/* {data} */}
        <SearchBar />
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          {categories.map((category) => (
            <Button
              key={category}
              // variant={selectedCategory === category ? "default" : "outline"}
              // onClick={() => setSelectedCategory(category)}
              className="flex-grow sm:flex-grow-0"
            >
              {category === "Sightseeing" && (
                <Camera className="mr-2 h-4 w-4" />
              )}
              {category === "Food" && <Utensils className="mr-2 h-4 w-4" />}
              {category === "Entertainment" && (
                <Music className="mr-2 h-4 w-4" />
              )}
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {attractions.map((attraction) => (
          <Card key={attraction.id}>
            <CardHeader>
              <CardTitle>{attraction.name}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mr-2">
                  {attraction.category}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                width={48}
                height={48}
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p>{attraction.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MapPin className="mr-2 h-4 w-4" /> View on Map
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* {filteredAttractions.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No attractions found. Try a different search or category.
        </p>
      )} */}
    </div>
  );
}

export default TouristAttractionFinder;
