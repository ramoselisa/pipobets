
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarDays } from "lucide-react";
import { ChartHeader } from "./ChartHeader";

interface Props {
  dateData: { name: string; value: number }[];
  lostCount: number;
  t: (key: string) => string;
}

export function DateDistributionCard({ dateData, lostCount, t }: Props) {
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name}: ${value}`}
      </text>
    );
  };

  return (
    <Card>
      <ChartHeader icon={CalendarDays} title={t("dateDistribution")} />
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
