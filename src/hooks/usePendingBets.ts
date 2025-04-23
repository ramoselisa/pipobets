
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";
import { PendingBet } from "@/types/predictions";

export const usePendingBets = () => {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();

  const fetchPendingBets = async () => {
    setLoading(true);
    // Get all predictions, not just pending ones
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: t("fetchFailed") || "Failed to load bets",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const transformedData: PendingBet[] = data.map(item => ({
      id: item.id,
      name: item.name,
      date: item.date,
      time: item.time,
      weight: item.weight,
      height: item.height,
      eyeColor: item.eye_color,
      hairColor: item.hair_color,
      gender: item.gender,
      hopeMom: item.hope_mom,
      hopeDad: item.hope_dad,
      resemblance: item.resemblance,
      advice: item.advice,
      status: item.status || (item.approved ? "approved" : "pending"),
      created_at: item.created_at,
    }));

    setPendingBets(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingBets();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("predictions")
      .update({ 
        status: "approved",
        approved: true 
      })
      .eq("id", id);

    if (error) {
      toast({
        title: t("betApprovalFailed") || "Failed to approve bet",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("betApproved"),
      description: t("predictionApproved"),
    });

    fetchPendingBets();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Failed to delete bet",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bet deleted",
      description: "The prediction has been deleted successfully.",
    });

    fetchPendingBets();
  };

  const handleEdit = async (id: string, editForm: PendingBet | null) => {
    if (!editForm) return;

    const { error } = await supabase
      .from("predictions")
      .update({
        name: editForm.name,
        eye_color: editForm.eyeColor,
        hair_color: editForm.hairColor,
        status: editForm.status,
        approved: editForm.status === "approved"
      })
      .eq("id", id);

    if (error) {
      toast({
        title: "Failed to update bet",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bet updated",
      description: "The prediction has been updated successfully.",
    });

    fetchPendingBets();
  };

  return {
    pendingBets,
    loading,
    fetchPendictions: fetchPendingBets,
    fetchPendingBets,
    handleApprove,
    handleDelete,
    handleEdit,
  };
};
