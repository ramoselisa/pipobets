
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CalendarDays } from "lucide-react";
import { ChartHeader } from "./ChartHeader";

interface Props {
  dateData: { name: string; value: number }[];
  lostCount: number;
  t: (key: string) => string;
}

export function DateDistributionCard({ dateData, lostCount, t }: Props) {
  return (
    <Card>
      <ChartHeader icon={CalendarDays} title={t("dateDistribution")} />
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {lostCount > 0 && (
            <p className="font-medium">
              <span className="text-red-500">{lostCount}</span> {t("lostBets")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
