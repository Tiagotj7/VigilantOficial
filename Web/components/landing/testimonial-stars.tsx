"use client";

import { Star } from "lucide-react";

interface TestimonialStarsProps {
  total?: number;
}

export default function TestimonialStars({
  total = 5,
}: TestimonialStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}