"use client";

import React from "react";

interface CreditScoreButtonProps {
  score: number;
}

const getCreditScoreStyles = (score: number) => {
  if (score > 800) {
    return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30";
  } else if (score > 500) {
    return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/30";
  } else {
    return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30";
  }
};

const getCreditScoreDotColor = (score: number) => {
  if (score > 800) {
    return "bg-green-500";
  } else if (score > 500) {
    return "bg-yellow-500";
  } else {
    return "bg-red-500";
  }
};

export const CreditScoreButton: React.FC<CreditScoreButtonProps> = ({
  score,
}) => (
  <button
    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${getCreditScoreStyles(
      score
    )}`}
  >
    <span
      className={`w-2 h-2 rounded-full ${getCreditScoreDotColor(score)}`}
    ></span>
    <span>Credit Score: {score}</span>
  </button>
);
