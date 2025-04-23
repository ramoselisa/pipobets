
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
      toast.error(t("fetchFailed") || "Failed to load bets", {
        description: error.message
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
      toast.error(t("betApprovalFailed") || "Failed to approve bet", {
        description: error.message
      });
      return;
    }

    toast.success(t("betApproved"), {
      description: t("predictionApproved")
    });

    fetchPendingBets();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete bet", {
        description: error.message
      });
      return;
    }

    toast.success("Bet deleted", {
      description: "The prediction has been deleted successfully."
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
      toast.error("Failed to update bet", {
        description: error.message
      });
      return;
    }

    toast.success("Bet updated", {
      description: "The prediction has been updated successfully."
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
