
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

  // Helper function to get an appropriate color for each eye color
  const getColorForEyeColor = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName === "blue" || lowerName === "azul") return "#1E40AF";
    if (lowerName === "green" || lowerName === "verde") return "#10B981";
    if (lowerName === "hazel" || lowerName === "castanho claro") return "#D4A76A";
    if (lowerName === "black" || lowerName === "preto") return "#1F2937";
    if (lowerName.includes("darkbrown") || lowerName.includes("dark brown") || lowerName.includes("castanho escuro")) return "#513737";
    if (lowerName.includes("mediumbrown") || lowerName.includes("medium brown") || lowerName.includes("castanho")) return "#8B4513";
    return "#8B4513"; // default for brown
  };

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
                    fill={getColorForEyeColor(entry.name)}
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
