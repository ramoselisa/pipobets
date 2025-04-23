
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
    try {
      console.log("Fetching pending bets...");
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching bets:", error);
        toast.error(t("fetchFailed") || "Failed to load bets", {
          description: error.message
        });
        return;
      }

      // Process to determine lost bets
      const currentDate = new Date();
      const transformedData: PendingBet[] = data.map(item => ({
        id: item.id,
        name: item.name,
        date: item.date,
        time: item.time || "",
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

      console.log("Fetched and transformed data:", transformedData);
      setPendingBets(transformedData);
    } catch (err) {
      console.error("Unexpected error fetching bets:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBets();
  }, []);

  const handleApprove = async (id: string) => {
    console.log(`Approving bet with ID: ${id}`);
    try {
      const { error } = await supabase
        .from("predictions")
        .update({ 
          status: "approved",
          approved: true 
        })
        .eq("id", id);

      if (error) {
        console.error("Error approving bet:", error);
        toast.error(t("betApprovalFailed") || "Failed to approve bet", {
          description: error.message
        });
        return;
      }

      toast.success(t("betApproved") || "Bet approved", {
        description: t("predictionApproved") || "The prediction has been approved."
      });

      // Refresh the data
      await fetchPendingBets();
    } catch (err) {
      console.error("Unexpected error approving bet:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    console.log(`Marking bet with ID: ${id} as deleted`);
    try {
      // Instead of deleting, update the record to have status='deleted' and approved=false
      const { error } = await supabase
        .from("predictions")
        .update({ 
          status: "deleted",
          approved: false 
        })
        .eq("id", id);

      if (error) {
        console.error("Error marking bet as deleted:", error);
        toast.error("Failed to delete bet", {
          description: error.message
        });
        return;
      }

      toast.success("Bet marked as deleted", {
        description: "The prediction has been marked as deleted."
      });

      // Refresh the data
      await fetchPendingBets();
    } catch (err) {
      console.error("Unexpected error deleting bet:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleEdit = async (id: string, editForm: PendingBet | null) => {
    if (!editForm) {
      console.error("No edit form provided");
      return;
    }
    
    console.log(`Updating bet with ID: ${id}`, editForm);
    try {
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
        console.error("Error updating bet:", error);
        toast.error("Failed to update bet", {
          description: error.message
        });
        return;
      }

      toast.success("Bet updated", {
        description: "The prediction has been updated successfully."
      });

      // Refresh the data
      await fetchPendingBets();
    } catch (err) {
      console.error("Unexpected error updating bet:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return {
    pendingBets,
    loading,
    fetchPendingBets,
    handleApprove,
    handleDelete,
    handleEdit,
  };
};
