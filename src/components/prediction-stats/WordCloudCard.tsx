
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { wordCloudColors, getFontSize } from "./PredictionStatsUtils";
import { Separator } from "@/components/ui/separator";
import { Users, CalendarDays, Star } from "lucide-react";

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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-primary" />
          {t("mostWishedTraits")}
        </CardTitle>
      </CardHeader>
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

        <Separator className="my-4" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-primary" />
            <span>
              {t("totalPredictions")}: <strong>{stats.total}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1 text-primary" />
            <span>
              {t("uniqueDates")}:{" "}
              <strong>{Object.keys(stats.dateCount).length}</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
