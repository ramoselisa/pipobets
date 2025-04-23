
import { useState, useEffect } from "react";
import { Popcorn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { BetsTable } from "@/components/admin/BetsTable";
import { PendingBet } from "@/types/predictions";

export default function ApproveBets() {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);
  const { t } = useLocale();
  const [auth, setAuth] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem("admin-auth") === "true"
  );
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PendingBet | null>(null);

  useEffect(() => {
    if (auth) {
      fetchPendingBets();
    }
  }, [auth]);

  const fetchPendingBets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("status", "pending")
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

    // Transform the data to match PendingBet interface
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
      status: item.status,
      created_at: item.created_at,
    }));

    setPendingBets(transformedData);
    setLoading(false);
  };

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

  const handleEditFormChange = (field: keyof PendingBet, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleEdit = async (id: string) => {
    if (editing === id) {
      // Save changes
      if (!editForm) return;

      const { error } = await supabase
        .from("predictions")
        .update({
          name: editForm.name,
          eye_color: editForm.eyeColor,
          hair_color: editForm.hairColor,
          // Add other fields as needed
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

      setEditing(null);
      setEditForm(null);
      fetchPendingBets();
    } else {
      // Start editing
      const bet = pendingBets.find(b => b.id === id);
      if (bet) {
        setEditForm(bet);
        setEditing(id);
      }
    }
  };

  if (!auth) {
    return <AdminAuth onAuth={setAuth} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="h-3 w-full bg-gradient-to-r from-[#ea384c] via-white to-[#ea384c] opacity-80"></div>
          <Popcorn size={48} className="absolute left-4 -top-2 text-red-500 rotate-12" />
          <Popcorn size={40} className="absolute right-8 top-0 text-white bg-red-500 rounded-full p-2 rotate-[-12deg]" />
        </div>
        <div className="relative py-8 flex flex-col items-center z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-600 flex items-center gap-2 drop-shadow-lg mb-2">
            <Popcorn size={32} className="text-[#ea384c]" />
            {t("approveNewBets")}
          </h1>
          <p className="text-lg text-white bg-red-500/90 rounded-full px-6 py-2 shadow font-semibold">
            {t("reviewAndApprove")}
          </p>
          <Link to="/" className="mt-4 text-red-600 hover:underline text-sm">{t("backToHome")}</Link>
        </div>
      </div>

      <main className="container max-w-2xl mx-auto flex-1 flex flex-col justify-center items-center pb-16">
        <Card className="w-full border-2 border-[#ea384c] bg-white shadow-lg rounded-2xl mb-6">
          <CardHeader className="bg-[#ea384c] rounded-t-2xl">
            <CardTitle className="text-white flex items-center gap-2">
              <Popcorn size={20} className="text-white" />
              {t("pendingBets")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingBets.length === 0 ? (
              <div className="py-8 text-center text-[#ea384c]">
                <Popcorn size={40} className="mx-auto mb-2 opacity-70" />
                <p className="font-semibold">{t("noPendingBets")}</p>
              </div>
            ) : (
              <BetsTable
                pendingBets={pendingBets}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onApprove={handleApprove}
                editing={editing}
                editForm={editForm}
                onEditFormChange={handleEditFormChange}
              />
            )}
          </CardContent>
        </Card>
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
