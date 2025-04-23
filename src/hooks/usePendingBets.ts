
import { useEffect, useCallback } from "react";
import { useBetsState } from "./bets/useBetsState";
import { useFetchBets } from "./bets/useFetchBets";
import { useBetActions } from "./bets/useBetActions";

export const usePendingBets = () => {
  const { pendingBets, setPendingBets, loading, setLoading } = useBetsState();
  const { fetchPendingBets } = useFetchBets(setLoading, setPendingBets);
  
  // Pass the fetchPendingBets function to useBetActions to allow for data refresh
  const { handleApprove, handleDelete, handleEdit } = useBetActions(setPendingBets, fetchPendingBets);

  useEffect(() => {
    fetchPendingBets();
  }, [fetchPendingBets]);

  return {
    pendingBets,
    loading,
    fetchPendingBets,
    handleApprove,
    handleDelete,
    handleEdit,
  };
};
