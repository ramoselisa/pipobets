
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CalendarDays } from "lucide-react";
import { ChartHeader } from "./ChartHeader";
import { useLocale } from "@/i18n/useLocale";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface Props {
  dateData: { name: string; value: number }[];
  lostCount: number;
  t: (key: string) => string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { t, locale } = useLocale();
  const { translateDate } = useTranslatedValues();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="text-sm">{translateDate(label)}</p>
        <p className="text-sm font-semibold">
          {locale === 'pt' ? 'Apostas: ' : 'Bets: '}{payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBar = (props: any) => {
  const currentDate = new Date();
  const dateStr = props.payload.name;
  const barDate = new Date(dateStr);
  
  // If the date has passed, use a gray color
  const fill = barDate < currentDate ? '#C8C8C9' : '#8884d8';
  
  return <Bar {...props} fill={fill} />;
};

export function DateDistributionCard({ dateData, lostCount, t }: Props) {
  const { translateDate } = useTranslatedValues();

  const formattedData = dateData.map(item => ({
    ...item,
    formattedName: translateDate(item.name)
  }));

  return (
    <Card>
      <ChartHeader icon={CalendarDays} title={t("dateDistribution")} />
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                fontSize={12}
                tickFormatter={translateDate}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" shape={<CustomBar />} />
            </BarChart>
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
