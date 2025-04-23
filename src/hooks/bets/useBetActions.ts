
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { PendingBet } from "@/types/predictions";

export const useBetActions = (
  setPendingBets: React.Dispatch<React.SetStateAction<PendingBet[]>>
) => {
  const handleApprove = async (id: string) => {
    console.log(`Approving bet with ID: ${id}`);
    try {
      // Make sure we're sending the correct data structure to Supabase
      const updateData = { 
        status: "approved",
        approved: true 
      };
      
      console.log("Sending approve update to database:", updateData);
      
      const { data, error } = await supabase
        .from("predictions")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error approving bet:", error);
        toast.error("Failed to approve bet", {
          description: error.message
        });
        return false;
      }
      
      console.log("Approval response from database:", data);
      
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
      // Make sure we're sending the correct data structure to Supabase
      const updateData = { 
        status: "deleted",
        approved: false 
      };
      
      console.log("Sending delete update to database:", updateData);
      
      const { data, error } = await supabase
        .from("predictions")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error marking bet as deleted:", error);
        toast.error("Failed to delete bet", {
          description: error.message
        });
        return false;
      }
      
      console.log("Delete response from database:", data);
      
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
      // Format the data correctly for the Supabase database structure
      const updateData = {
        name: editForm.name,
        date: editForm.date,
        time: editForm.time || null,
        weight: editForm.weight,
        height: editForm.height,
        eye_color: editForm.eyeColor || null,
        hair_color: editForm.hairColor || null,
        gender: editForm.gender || null,
        hope_mom: editForm.hopeMom || null,
        hope_dad: editForm.hopeDad || null,
        resemblance: editForm.resemblance || null,
        advice: editForm.advice || null,
        status: editForm.status || "pending",
        approved: editForm.status === "approved"
      };
      
      console.log("Update data being sent to database:", updateData);
      
      const { data, error } = await supabase
        .from("predictions")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating bet:", error);
        toast.error("Failed to update bet", {
          description: error.message
        });
        return false;
      }
      
      console.log("Edit response from database:", data);
      
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
