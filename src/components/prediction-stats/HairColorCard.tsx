
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Star } from "lucide-react";

interface Props {
  hairColorData: { name: string; value: number }[];
  t: (key: string) => string;
  renderCustomizedLabel: (props: any) => React.ReactNode;
}

export function HairColorCard({ hairColorData, t, renderCustomizedLabel }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-primary" />
          {t("hairColorPredictions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={hairColorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {hairColorData.map((entry, index) => (
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
