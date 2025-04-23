
import { Card, CardContent } from "@/components/ui/card";
import { wordCloudColors, getFontSize } from "./PredictionStatsUtils";
import { Star } from "lucide-react";
import { ChartHeader } from "./ChartHeader";
import { StatsSummary } from "./StatsSummary";

interface Props {
  t: (key: string) => string;
  wordCloudMom: [string, number][];
  wordCloudDad: [string, number][];
  momTraits: [string, number][];
  dadTraits: [string, number][];
  stats: any;
}

export function WordCloudCard({
  t,
  wordCloudMom,
  wordCloudDad,
  momTraits,
  dadTraits,
  stats,
}: Props) {
  return (
    <Card className="md:col-span-2">
      <ChartHeader icon={Star} title={t("mostWishedTraits")} />
      <CardContent>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-center font-medium mb-2 text-pink-700">
              {t("wishesFromMom")}
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              {wordCloudMom.map(([trait, count], i) => (
                <span
                  key={trait}
                  className="font-bold inline-block"
                  style={{
                    color: wordCloudColors[i % wordCloudColors.length],
                    fontSize: getFontSize(i, 1.1, 2.2),
                    opacity: 0.82 + (count / (momTraits[0]?.[1] ?? 1)) * 0.18,
                    lineHeight: 1,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-center font-medium mb-2 text-fuchsia-700">
              {t("wishesFromDad")}
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              {wordCloudDad.map(([trait, count], i) => (
                <span
                  key={trait}
                  className="font-bold inline-block"
                  style={{
                    color: wordCloudColors[(i * 2) % wordCloudColors.length],
                    fontSize: getFontSize(i, 1.1, 2.2),
                    opacity: 0.82 + (count / (dadTraits[0]?.[1] ?? 1)) * 0.18,
                    lineHeight: 1,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        <StatsSummary
          total={stats.total}
          uniqueDates={Object.keys(stats.dateCount).length}
          t={t}
        />
      </CardContent>
    </Card>
  );
}
