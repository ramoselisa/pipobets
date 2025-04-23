
import { useState, useEffect } from "react";
import { Popcorn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASSWORD = "pipoadmin"; // Change as needed

export interface PendingBet {
  id: string;
  name: string;
  date: string;
  weight: string;
  height: string;
  eyeColor?: string | null;
  hairColor?: string | null;
  submitted: string;
}

export default function ApproveBets() {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);
  const { t } = useLocale();

  // Simple admin password state
  const [auth, setAuth] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem("admin-auth") === "true"
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch predictions from supabase (only unapproved, newest first)
  useEffect(() => {
    if (auth) {
      fetchPendingBets();
    }
    // eslint-disable-next-line
  }, [auth]);

  const fetchPendingBets = async () => {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: t("fetchFailed") || "Failed to load bets",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setPendingBets(
      (data || []).map((pred: any) => ({
        id: pred.id,
        name: pred.name,
        // Use normalized_date if available
        date: pred.normalized_date || pred.date,
        weight: pred.weight,
        height: pred.height,
        eyeColor: pred.eye_color,
        hairColor: pred.hair_color,
        submitted: pred.created_at ? new Date(pred.created_at).toLocaleDateString() : "",
      }))
    );
  };

  const handleApprove = async (id: string) => {
    // Set the "approved" column to true in the database
    const { error } = await supabase
      .from("predictions")
      .update({ approved: true })
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
    // After approve, refetch bets
    fetchPendingBets();
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      sessionStorage.setItem("admin-auth", "true");
    } else {
      setError("Incorrect password.");
      setPassword("");
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Card className="max-w-sm w-full border border-red-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#ea384c]"><Popcorn size={24}/>{t("adminAccess")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="flex flex-col gap-4">
              <label>
                <span className="block mb-2 text-sm font-bold text-[#ea384c]">{t("enterAdminPassword")}</span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded border-red-300 focus:outline-none focus:ring focus:border-[#ea384c]"
                  autoFocus
                />
              </label>
              {error && <div className="text-red-500 text-xs">{error}</div>}
              <Button type="submit" className="bg-[#ea384c] text-white hover:bg-red-700">
                {t("unlock")}
              </Button>
              <Link to="/" className="text-xs text-[#ea384c] underline mt-2">{t("backToHome")}</Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Decorative popcorn banner */}
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
          <p className="text-lg text-white bg-red-500/90 rounded-full px-6 py-2 shadow font-semibold">{t("reviewAndApprove")}</p>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#ea384c]">{t("name")}</TableHead>
                    <TableHead className="text-[#ea384c]">{t("birthDate")}</TableHead>
                    <TableHead className="text-[#ea384c]">{t("eye")}</TableHead>
                    <TableHead className="text-[#ea384c]">{t("hair")}</TableHead>
                    <TableHead className="text-[#ea384c]">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingBets.map(bet => (
                    <TableRow key={bet.id} className="hover:bg-red-50">
                      <TableCell>{bet.name}</TableCell>
                      <TableCell>{bet.date}</TableCell>
                      <TableCell>{bet.eyeColor}</TableCell>
                      <TableCell>{bet.hairColor}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          className="bg-[#ea384c] text-white hover:bg-red-700 transition"
                          onClick={() => handleApprove(bet.id)}
                        >
                          {t("approve")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Red and white stripes at the bottom for cinema feel */}
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
