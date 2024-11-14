"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  attractionName: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  attractionName,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the review data to your backend
    console.log("Review submitted:", { rating, review });
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    onClose();
    setRating(0);
    setReview("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave a Review for {attractionName}</DialogTitle>
          <DialogDescription>
            Share your experience with other travelers. Your feedback is
            valuable!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmitReview} disabled={rating === 0}>
            <Send className="mr-2 h-4 w-4" />
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
