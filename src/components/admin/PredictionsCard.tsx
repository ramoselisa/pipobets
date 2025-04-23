
import { Popcorn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BetsTable } from "@/components/admin/BetsTable";
import { useLocale } from "@/i18n/useLocale";
import { PendingBet } from "@/types/predictions";

interface PredictionsCardProps {
  pendingBets: PendingBet[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  editing: string | null;
  editForm: PendingBet | null;
  onEditFormChange: (field: keyof PendingBet, value: string) => void;
}

export function PredictionsCard({
  pendingBets,
  onEdit,
  onDelete,
  onApprove,
  editing,
  editForm,
  onEditFormChange,
}: PredictionsCardProps) {
  const { t } = useLocale();

  return (
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
            onEdit={onEdit}
            onDelete={onDelete}
            onApprove={onApprove}
            editing={editing}
            editForm={editForm}
            onEditFormChange={onEditFormChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
