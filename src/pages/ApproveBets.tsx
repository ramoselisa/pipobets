
import { useState, useEffect } from "react";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PredictionsCard } from "@/components/admin/PredictionsCard";
import { usePendingBets } from "@/hooks/usePendingBets";
import { PendingBet } from "@/types/predictions";

export default function ApproveBets() {
  const [auth, setAuth] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem("admin-auth") === "true"
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PendingBet | null>(null);
  
  const { 
    pendingBets,
    handleApprove,
    handleDelete,
    handleEdit,
    fetchPendingBets
  } = usePendingBets();

  // Refresh data when the component mounts
  useEffect(() => {
    if (auth) {
      console.log("ApproveBets: Fetching pending bets on mount");
      fetchPendingBets();
    }
  }, [auth]);

  const handleEditFormChange = (field: keyof PendingBet, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleEditClick = async (id: string) => {
    if (editing === id) {
      // If we're already editing this row, save the changes
      console.log("Saving changes for bet:", id, editForm);
      if (editForm) {
        await handleEdit(id, editForm);
      }
      setEditing(null);
      setEditForm(null);
    } else {
      // Start editing this row
      const bet = pendingBets.find(b => b.id === id);
      if (bet) {
        console.log("Starting edit for bet:", id, bet);
        setEditForm({...bet});
        setEditing(id);
      }
    }
  };

  const handleApproveClick = async (id: string) => {
    console.log("Approving bet:", id);
    await handleApprove(id);
  };

  const handleDeleteClick = async (id: string) => {
    console.log("Deleting bet:", id);
    await handleDelete(id);
  };

  if (!auth) {
    return <AdminAuth onAuth={setAuth} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdminHeader />
      <main className="container max-w-2xl mx-auto flex-1 flex flex-col justify-center items-center pb-16">
        <PredictionsCard
          pendingBets={pendingBets}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onApprove={handleApproveClick}
          editing={editing}
          editForm={editForm}
          onEditFormChange={handleEditFormChange}
        />
      </main>
      <div className="w-full h-8 bg-gradient-to-r from-[#ea384c] via-white to-[#ea384c] flex items-center justify-center">
        <div className="flex gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`h-6 w-3 rounded-sm ${i % 2 === 0 ? "bg-white" : "bg-[#ea384c]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
