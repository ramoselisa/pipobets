
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
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      // Order by date in ascending order
      .order("date", { ascending: true });

    if (error) {
      toast.error(t("fetchFailed") || "Failed to load bets", {
        description: error.message
      });
      setLoading(false);
      return;
    }

    // Process to determine lost bets
    const currentDate = new Date();
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
      isLost: new Date(`${item.date} ${item.time || '00:00'}`) < currentDate
    }));

    // Sort by date in ascending order
    const sortedData = transformedData.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
      const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
      return dateA.getTime() - dateB.getTime();
    });

    setPendingBets(sortedData);
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

    toast.success(t("betApproved") || "Bet approved", {
      description: t("predictionApproved") || "The prediction has been approved."
    });

    fetchPendingBets();
  };

  const handleDelete = async (id: string) => {
    // Instead of deleting, update the record to have status='deleted' and approved=false
    const { error } = await supabase
      .from("predictions")
      .update({ 
        status: "deleted",
        approved: false 
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete bet", {
        description: error.message
      });
      return;
    }

    toast.success("Bet marked as deleted", {
      description: "The prediction has been marked as deleted."
    });

    fetchPendingBets();
  };

  const handleEdit = async (id: string, editForm: PendingBet | null) => {
    if (!editForm) return;

    // Update all fields that could have been changed
    const { error } = await supabase
      .from("predictions")
      .update({
        name: editForm.name,
        date: editForm.date,
        time: editForm.time,
        weight: editForm.weight,
        height: editForm.height,
        eye_color: editForm.eyeColor,
        hair_color: editForm.hairColor,
        gender: editForm.gender,
        hope_mom: editForm.hopeMom,
        hope_dad: editForm.hopeDad,
        resemblance: editForm.resemblance,
        advice: editForm.advice,
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
    fetchPendictions: fetchPendingBets, // Keeping for backward compatibility
    fetchPendingBets,
    handleApprove,
    handleDelete,
    handleEdit,
  };
};
