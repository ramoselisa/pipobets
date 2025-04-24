
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye } from "lucide-react";
import { ChartHeader } from "./ChartHeader";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface Props {
  eyeColorData: { name: string; value: number }[];
  t: (key: string) => string;
}

export function EyeColorCard({ eyeColorData, t }: Props) {
  const { translateEyeColor } = useTranslatedValues();
  
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
        {`${translateEyeColor(name)}: ${value}`}
      </text>
    );
  };

  const translatedData = eyeColorData.map(item => ({
    ...item,
    displayName: translateEyeColor(item.name)
  }));

  return (
    <Card>
      <ChartHeader icon={Eye} title={t("eyeColorPredictions")} />
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
                      entry.name === "black" ? "#333" :
                      entry.name === "darkBrown" ? "#5D4037" :
                      entry.name === "mediumBrown" ? "#795548" :
                      entry.name === "hazel" ? "#8D6E63" :
                      entry.name === "blue" ? "#1E40AF" :
                      entry.name === "green" ? "#10B981" :
                      `hsl(${index * 40}, 70%, 60%)`
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
