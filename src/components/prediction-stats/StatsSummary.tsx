
import { Users, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface StatsSummaryProps {
  total: number;
  uniqueDates: number;
  t: (key: string) => string;
}

export function StatsSummary({ total, uniqueDates, t }: StatsSummaryProps) {
  return (
    <>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-primary" />
          <span>
            {t("totalPredictions")}: <strong>{total}</strong>
          </span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-1 text-primary" />
          <span>
            {t("uniqueDates")}: <strong>{uniqueDates}</strong>
          </span>
        </div>
      </div>
    </>
  );
}
