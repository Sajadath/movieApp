import React from "react";
import { motion } from "framer-motion";

type CircularProgressBarProps = {
  rating: number;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  rating,
}) => {
  const normalizedRating = Math.min(Math.max(rating, 0), 10); // Ensure rating is between 0 and 10
  const circumference = 2 * Math.PI * 45; // Circle with radius 45
  const progress = (normalizedRating / 10) * 100;

  // Determine color based on rating
  let color = "red";
  if (normalizedRating > 3 && normalizedRating <= 5) {
    color = "orange";
  } else if (normalizedRating > 5 && normalizedRating <= 7) {
    color = "yellow";
  } else if (normalizedRating > 7) {
    color = "green";
  }

  return (
    <div className="flex items-center justify-center overflow-visible">
      <div className="relative h-15 w-15 overflow-visible">
        {/* Progress Circle */}
        <svg
          className="absolute top-0 left-0 overflow-visible"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="10"
          />
          {/* Foreground Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset:
                circumference - (circumference * progress) / 100,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`neon-shadow-${color}`}
          />
        </svg>

        {/* Rating Text */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {normalizedRating}/10
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
