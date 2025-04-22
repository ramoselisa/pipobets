
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye } from "lucide-react";

interface Props {
  eyeColorData: { name: string; value: number }[];
  t: (key: string) => string;
  renderCustomizedLabel: (props: any) => React.ReactNode;
}

export function EyeColorCard({ eyeColorData, t, renderCustomizedLabel }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Eye className="h-5 w-5 mr-2 text-primary" />
          {t("eyeColorPredictions")}
        </CardTitle>
      </CardHeader>
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
