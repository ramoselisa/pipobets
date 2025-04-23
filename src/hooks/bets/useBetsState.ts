
import { useState } from "react";
import { PendingBet } from "@/types/predictions";

export const useBetsState = () => {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);
  const [loading, setLoading] = useState(false);

  return {
    pendingBets,
    setPendingBets,
    loading,
    setLoading,
  };
};
