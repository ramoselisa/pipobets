
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Popcorn } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

const ADMIN_PASSWORD = "pipoadmin";

interface AdminAuthProps {
  onAuth: (isAuthenticated: boolean) => void;
}

export function AdminAuth({ onAuth }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      onAuth(true);
      setError(null);
    } else {
      setError(t("invalidPassword"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Card className="max-w-sm w-full border border-red-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#ea384c]">
            <Popcorn size={24}/>{t("adminAccess")}
          </CardTitle>
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
