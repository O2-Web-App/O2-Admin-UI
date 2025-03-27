import React from "react";

const getRankLabel = (rank: string | number) => {
  switch (rank) {
    case "1":
    case 1:
      return (
        <span className="flex justify-center items-center gap-1">
          <span className="text-title">🥇</span>
        </span>
      );
    case "2":
    case 2:
      return (
        <span className="flex items-center gap-1">
          <span className="text-title">🥈</span>
        </span>
      );
    case "3":
    case 3:
      return (
        <span className="flex items-center gap-1">
          <span className="text-title">🥉</span>
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1">
          <span className="text-sm">🏅</span>
          <span>Rank {rank}</span>
        </span>
      );
  }
};

export default getRankLabel;
