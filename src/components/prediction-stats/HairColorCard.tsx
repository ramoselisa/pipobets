
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Star } from "lucide-react";
import { ChartHeader } from "./ChartHeader";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface Props {
  hairColorData: { name: string; value: number }[];
  t: (key: string) => string;
}

export function HairColorCard({ hairColorData, t }: Props) {
  const { translateHairColor } = useTranslatedValues();
  
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
        {`${translateHairColor(name)}: ${value}`}
      </text>
    );
  };

  const translatedData = hairColorData.map(item => ({
    ...item,
    displayName: translateHairColor(item.name)
  }));

  return (
    <Card>
      <ChartHeader icon={Star} title={t("hairColorPredictions")} />
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
                {translatedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name.toLowerCase().includes("black")
                        ? "#333"
                        : entry.name.toLowerCase().includes("brown")
                        ? "#8B4513"
                        : entry.name.toLowerCase().includes("blonde")
                        ? "#FFD700"
                        : entry.name.toLowerCase().includes("red")
                        ? "#FF6347"
                        : entry.name.toLowerCase().includes("preto")
                        ? "#333"
                        : entry.name.toLowerCase().includes("castanho")
                        ? "#8B4513"
                        : `hsl(${index * 40}, 70%, 60%)`
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
