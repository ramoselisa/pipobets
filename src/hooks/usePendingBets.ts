
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/sonner";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";
import { PendingBet } from "@/types/predictions";

export const usePendingBets = () => {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();

  const fetchPendingBets = useCallback(async () => {
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
  }, [t]);

  useEffect(() => {
    fetchPendingBets();
  }, [fetchPendingBets]);

  const handleApprove = async (id: string) => {
    console.log(`Approving bet with ID: ${id}`);
    try {
      // Update the database record with status='approved' and approved=true
      const { error } = await supabase
        .from("predictions")
        .update({ 
          status: "approved",
          approved: true 
        })
        .eq("id", id);

      if (error) {
        console.error("Error approving bet:", error);
        toast.error("Failed to approve bet", {
          description: error.message
        });
        return false;
      }
      
      // Update local state
      setPendingBets(prev => 
        prev.map(bet => 
          bet.id === id ? { ...bet, status: "approved" } : bet
        )
      );
      
      toast.success("Bet approved successfully");
      return true;
    } catch (err) {
      console.error("Unexpected error approving bet:", err);
      toast.error("An unexpected error occurred");
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    console.log(`Marking bet with ID: ${id} as deleted`);
    try {
      // Update the database record with status='deleted' and approved=false
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
        return false;
      }
      
      // Update local state
      setPendingBets(prev => 
        prev.map(bet => 
          bet.id === id ? { ...bet, status: "deleted" } : bet
        )
      );
      
      toast.success("Bet deleted successfully");
      return true;
    } catch (err) {
      console.error("Unexpected error deleting bet:", err);
      toast.error("An unexpected error occurred");
      return false;
    }
  };

  const handleEdit = async (id: string, editForm: PendingBet) => {
    if (!editForm) {
      console.error("No edit form provided");
      return false;
    }
    
    console.log(`Updating bet with ID: ${id}`, editForm);
    try {
      // Prepare the data for update - map the frontend field names to database column names
      const updateData = {
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
      };
      
      console.log("Update data being sent to database:", updateData);
      
      // Update all fields that could have been changed
      const { error } = await supabase
        .from("predictions")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating bet:", error);
        toast.error("Failed to update bet", {
          description: error.message
        });
        return false;
      }
      
      // Update local state
      setPendingBets(prev => 
        prev.map(bet => 
          bet.id === id ? {
            ...bet,
            name: editForm.name,
            date: editForm.date,
            time: editForm.time,
            weight: editForm.weight,
            height: editForm.height,
            eyeColor: editForm.eyeColor,
            hairColor: editForm.hairColor,
            gender: editForm.gender,
            hopeMom: editForm.hopeMom,
            hopeDad: editForm.hopeDad,
            resemblance: editForm.resemblance,
            advice: editForm.advice,
            status: editForm.status
          } : bet
        )
      );
      
      toast.success("Bet updated successfully");
      return true;
    } catch (err) {
      console.error("Unexpected error updating bet:", err);
      toast.error("An unexpected error occurred");
      return false;
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
