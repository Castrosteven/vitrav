"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data for the attraction
const attraction = {
  name: "Eiffel Tower",
  price: 26.1,
  currency: "EUR",
};

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);

  const totalPrice = (adultTickets + childTickets * 0.5) * attraction.price;

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => prev + 1);
  };

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => Math.max(0, prev - 1));
  };

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking:", {
      date,
      time,
      adultTickets,
      childTickets,
      totalPrice,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book your visit to {attraction.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date, time, and number of tickets.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="time" className="text-right">
              Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="time"
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !time && "text-muted-foreground"
                  )}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time || <span>Select a time</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {availableTimes.map((t) => (
                    <Button
                      key={t}
                      onClick={() => setTime(t)}
                      variant={time === t ? "default" : "outline"}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Adults</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement(setAdultTickets)}
                disabled={adultTickets === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{adultTickets}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(setAdultTickets)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Children</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement(setChildTickets)}
                disabled={childTickets === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{childTickets}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(setChildTickets)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between items-center">
            <div className="text-lg font-semibold">
              Total: {attraction.currency} {totalPrice.toFixed(2)}
            </div>
            <Button onClick={handleBooking} disabled={!date || !time}>
              Book Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
