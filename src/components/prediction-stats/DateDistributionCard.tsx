
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarDays } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

interface Props {
  dateData: { name: string; value: number }[];
  lostCount: number;
  t: (key: string) => string;
  renderCustomizedLabel: (props: any) => React.ReactNode;
}

export function DateDistributionCard({ dateData, lostCount, t, renderCustomizedLabel }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-primary" />
          {t("dateDistribution")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 15 + 200}, 70%, 60%)`} />
                ))}
              </Pie>
            </PieChart>
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
