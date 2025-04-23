
import { useEffect } from "react";
import { useBetsState } from "./bets/useBetsState";
import { useFetchBets } from "./bets/useFetchBets";
import { useBetActions } from "./bets/useBetActions";

export const usePendingBets = () => {
  const { pendingBets, setPendingBets, loading, setLoading } = useBetsState();
  const { fetchPendingBets } = useFetchBets(setLoading, setPendingBets);
  const { handleApprove, handleDelete, handleEdit } = useBetActions(setPendingBets);

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
