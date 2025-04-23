
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { UserCheck } from "lucide-react";
import { ChartHeader } from "./ChartHeader";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface Props {
  resemblanceData: { name: string; value: number }[];
  t: (key: string) => string;
}

export function ResemblanceCard({ resemblanceData, t }: Props) {
  const { translateResemblance } = useTranslatedValues();
  
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
        {`${translateResemblance(name)}: ${value}`}
      </text>
    );
  };

  const translatedData = resemblanceData.map(item => ({
    ...item,
    displayName: translateResemblance(item.name)
  }));

  return (
    <Card>
      <ChartHeader icon={UserCheck} title={t("resemblancePredictions")} />
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell key="cell-0" fill="#D6BCFA" />
                <Cell key="cell-1" fill="#8B5CF6" />
                <Cell key="cell-2" fill="#9b87f5" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
