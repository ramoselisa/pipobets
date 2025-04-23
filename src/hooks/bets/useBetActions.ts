
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { PendingBet } from "@/types/predictions";

export const useBetActions = (
  setPendingBets: React.Dispatch<React.SetStateAction<PendingBet[]>>
) => {
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
        toast.error("Failed to approve bet", {
          description: error.message
        });
        return false;
      }
      
      setPendingBets((prev: PendingBet[]) => 
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
      
      setPendingBets((prev: PendingBet[]) => 
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
      
      setPendingBets((prev: PendingBet[]) => 
        prev.map(bet => 
          bet.id === id ? {
            ...bet,
            ...editForm
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
    handleApprove,
    handleDelete,
    handleEdit,
  };
};
