
import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";
import { shuffle } from "@/components/prediction-stats/PredictionStatsUtils";
import { DateDistributionCard } from "@/components/prediction-stats/DateDistributionCard";
import { ResemblanceCard } from "@/components/prediction-stats/ResemblanceCard";
import { HairColorCard } from "@/components/prediction-stats/HairColorCard";
import { EyeColorCard } from "@/components/prediction-stats/EyeColorCard";
import { WordCloudCard } from "@/components/prediction-stats/WordCloudCard";
import { PredictionProps } from "@/components/PredictionCard";
import { calculateStats } from "@/utils/statsCalculator";

interface PredictionStatsProps {
  predictions: PredictionProps[];
}

export function PredictionStats({ predictions }: PredictionStatsProps) {
  const { t } = useLocale();
  const [stats, setStats] = useState(() => calculateStats(predictions));

  useEffect(() => {
    setStats(calculateStats(predictions));
  }, [predictions]);

  // Prepare data for charts
  const resemblanceData = [
    { name: "mommy", value: stats.resemblanceCount.mommy },
    { name: "daddy", value: stats.resemblanceCount.daddy },
    { name: "other", value: stats.resemblanceCount.other },
  ];

  const hairColorData = Object.entries(stats.hairColorCount).map(
    ([name, value]) => ({ name, value })
  );

  const eyeColorData = Object.entries(stats.eyeColorCount).map(
    ([name, value]) => ({ name, value })
  );

  const dateData = Object.entries(stats.dateCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  // Convert traits data to arrays sorted by frequency
  const momTraits = Object.entries(stats.traitsFromMom)
    .sort((a, b) => b[1] - a[1]) as [string, number][];
    
  const dadTraits = Object.entries(stats.traitsFromDad)
    .sort((a, b) => b[1] - a[1]) as [string, number][];

  // Take only top traits for word cloud
  const wordCloudMom = shuffle(momTraits.slice(0, 10));
  const wordCloudDad = shuffle(dadTraits.slice(0, 10));

  return (
    <section className="py-10 bg-gradient-to-b from-white to-pink-50/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("statsTitle")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <DateDistributionCard 
            dateData={dateData} 
            lostCount={stats.lostCount} 
            t={t}
          />
          
          <ResemblanceCard 
            resemblanceData={resemblanceData} 
            t={t}
          />
          
          <HairColorCard 
            hairColorData={hairColorData} 
            t={t}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EyeColorCard 
            eyeColorData={eyeColorData} 
            t={t}
          />
          
          <WordCloudCard 
            t={t} 
            wordCloudMom={wordCloudMom} 
            wordCloudDad={wordCloudDad} 
            momTraits={momTraits} 
            dadTraits={dadTraits} 
            stats={stats}
          />
        </div>
      </div>
    </section>
  );
}
