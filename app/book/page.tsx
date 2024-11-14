"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
// import { toast } from "@/components/ui/use-toast";

// Mock data for the attraction
const attraction = {
  name: "Eiffel Tower",
  image: "/placeholder.svg?height=200&width=300",
  address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
  price: {
    adult: 26.1,
    child: 13.05,
  },
  currency: "EUR",
};

export default function BookingPage() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);
  const [guidedTour, setGuidedTour] = useState(false);
  const [fastTrackEntry, setFastTrackEntry] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const guidedTourPrice = 15;
  const fastTrackPrice = 10;

  const calculateTotal = () => {
    const ticketTotal =
      adultTickets * attraction.price.adult +
      childTickets * attraction.price.child;
    const optionsTotal =
      (guidedTour ? guidedTourPrice : 0) +
      (fastTrackEntry ? fastTrackPrice : 0);
    return ticketTotal + optionsTotal;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", {
      date,
      time,
      adultTickets,
      childTickets,
      guidedTour,
      fastTrackEntry,
      paymentMethod,
    });
    toast({
      title: "Booking Confirmed!",
      description: "Your reservation has been successfully processed.",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Please review and confirm your booking information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Select value={time} onValueChange={setTime} required>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="adults">Adult Tickets</Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      value={adultTickets}
                      onChange={(e) =>
                        setAdultTickets(parseInt(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="children">Child Tickets</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      value={childTickets}
                      onChange={(e) =>
                        setChildTickets(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Additional Options</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="guided-tour"
                      checked={guidedTour}
                      onCheckedChange={(checked) =>
                        setGuidedTour(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="guided-tour"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Guided Tour (+{attraction.currency} {guidedTourPrice})
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fast-track"
                      checked={fastTrackEntry}
                      onCheckedChange={(checked) =>
                        setFastTrackEntry(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="fast-track"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fast Track Entry (+{attraction.currency} {fastTrackPrice})
                    </label>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                width={48}
                height={48}
                src={attraction.image}
                alt={attraction.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold">{attraction.name}</h3>
                <p className="text-sm text-gray-500">{attraction.address}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{date || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{time || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Adult Tickets:</span>
                <span>
                  {adultTickets} x {attraction.currency}{" "}
                  {attraction.price.adult}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Child Tickets:</span>
                <span>
                  {childTickets} x {attraction.currency}{" "}
                  {attraction.price.child}
                </span>
              </div>
              {guidedTour && (
                <div className="flex justify-between">
                  <span>Guided Tour:</span>
                  <span>
                    {attraction.currency} {guidedTourPrice}
                  </span>
                </div>
              )}
              {fastTrackEntry && (
                <div className="flex justify-between">
                  <span>Fast Track Entry:</span>
                  <span>
                    {attraction.currency} {fastTrackPrice}
                  </span>
                </div>
              )}
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>
                {attraction.currency} {calculateTotal().toFixed(2)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              <Info className="inline-block w-4 h-4 mr-1" />
              Your booking is protected by our secure payment system.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
