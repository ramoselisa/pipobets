
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye } from "lucide-react";
import { ChartHeader } from "./ChartHeader";

interface Props {
  eyeColorData: { name: string; value: number }[];
  t: (key: string) => string;
}

export function EyeColorCard({ eyeColorData, t }: Props) {
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
      <ChartHeader icon={Eye} title={t("eyeColorPredictions")} />
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={eyeColorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {eyeColorData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name.toLowerCase().includes("blue")
                        ? "#1E40AF"
                        : entry.name.toLowerCase().includes("brown")
                        ? "#8B4513"
                        : entry.name.toLowerCase().includes("green")
                        ? "#10B981"
                        : entry.name.toLowerCase().includes("hazel")
                        ? "#92400E"
                        : entry.name.toLowerCase().includes("black")
                        ? "#1F2937"
                        : entry.name.toLowerCase().includes("castanho")
                        ? "#8B4513"
                        : entry.name.toLowerCase().includes("escuro")
                        ? "#1F2937"
                        : `hsl(${index * 40}, 70%, 55%)`
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
