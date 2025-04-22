
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { UserCheck } from "lucide-react";

interface Props {
  resemblanceData: { name: string; value: number }[];
  t: (key: string) => string;
  renderCustomizedLabel: (props: any) => React.ReactNode;
}

export function ResemblanceCard({ resemblanceData, t, renderCustomizedLabel }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <UserCheck className="h-5 w-5 mr-2 text-primary" />
          {t("resemblancePredictions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={resemblanceData}
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
