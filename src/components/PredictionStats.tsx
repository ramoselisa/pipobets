
import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";
import { mockPredictions } from "@/data/mockPredictions";
import { shuffle } from "@/components/prediction-stats/PredictionStatsUtils";
import { DateDistributionCard } from "@/components/prediction-stats/DateDistributionCard";
import { ResemblanceCard } from "@/components/prediction-stats/ResemblanceCard";
import { HairColorCard } from "@/components/prediction-stats/HairColorCard";
import { EyeColorCard } from "@/components/prediction-stats/EyeColorCard";
import { WordCloudCard } from "@/components/prediction-stats/WordCloudCard";

export function PredictionStats() {
  const { t } = useLocale();
  const [stats, setStats] = useState({
    total: 0,
    resemblanceCount: { mommy: 0, daddy: 0, other: 0 },
    hairColorCount: {},
    eyeColorCount: {},
    dateCount: {},
    lostCount: 0,
    traitsFromMom: {},
    traitsFromDad: {},
  });

  useEffect(() => {
    const resemblanceCount = { mommy: 0, daddy: 0, other: 0 };
    const hairColorCount = {};
    const eyeColorCount = {};
    const dateCount = {};
    let lostCount = 0;
    const traitsFromMom = {};
    const traitsFromDad = {};

    // Calculate statistics from predictions
    mockPredictions.forEach((pred) => {
      // Count resemblance predictions
      if (pred.resemblance) {
        resemblanceCount[pred.resemblance] = 
          (resemblanceCount[pred.resemblance] || 0) + 1;
      }

      // Count hair color predictions
      if (pred.hairColor) {
        hairColorCount[pred.hairColor] = 
          (hairColorCount[pred.hairColor] || 0) + 1;
      }

      // Count eye color predictions
      if (pred.eyeColor) {
        eyeColorCount[pred.eyeColor] = 
          (eyeColorCount[pred.eyeColor] || 0) + 1;
      }

      // Count birth date predictions
      if (pred.birthDate) {
        const dateKey = new Date(pred.birthDate).toLocaleDateString();
        dateCount[dateKey] = (dateCount[dateKey] || 0) + 1;
      }

      // Count lost bets
      if (pred.status === "lost") {
        lostCount++;
      }

      // Count traits from mom
      if (pred.traitsFromMom) {
        pred.traitsFromMom.split(",").forEach((trait) => {
          const trimmed = trait.trim();
          if (trimmed) {
            traitsFromMom[trimmed] = (traitsFromMom[trimmed] || 0) + 1;
          }
        });
      }

      // Count traits from dad
      if (pred.traitsFromDad) {
        pred.traitsFromDad.split(",").forEach((trait) => {
          const trimmed = trait.trim();
          if (trimmed) {
            traitsFromDad[trimmed] = (traitsFromDad[trimmed] || 0) + 1;
          }
        });
      }
    });

    setStats({
      total: mockPredictions.length,
      resemblanceCount,
      hairColorCount,
      eyeColorCount,
      dateCount,
      lostCount,
      traitsFromMom,
      traitsFromDad,
    });
  }, []);

  // Prepare data for charts
  const resemblanceData = [
    { name: t("resemblance.mommy"), value: stats.resemblanceCount.mommy },
    { name: t("resemblance.daddy"), value: stats.resemblanceCount.daddy },
    { name: t("resemblance.other"), value: stats.resemblanceCount.other },
  ];

  const hairColorData = Object.entries(stats.hairColorCount).map(
    ([name, value]) => ({ name, value: value as number })
  );

  const eyeColorData = Object.entries(stats.eyeColorCount).map(
    ([name, value]) => ({ name, value: value as number })
  );

  const dateData = Object.entries(stats.dateCount)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  // Convert traits data to arrays sorted by frequency
  const momTraits = Object.entries(stats.traitsFromMom).sort(
    (a, b) => b[1] - a[1]
  );
  const dadTraits = Object.entries(stats.traitsFromDad).sort(
    (a, b) => b[1] - a[1]
  );

  // Take only top traits for word cloud
  const wordCloudMom = shuffle(momTraits.slice(0, 10));
  const wordCloudDad = shuffle(dadTraits.slice(0, 10));

  // Custom label renderer for pie charts
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
            renderCustomizedLabel={renderCustomizedLabel} 
          />
          
          <ResemblanceCard 
            resemblanceData={resemblanceData} 
            t={t} 
            renderCustomizedLabel={renderCustomizedLabel} 
          />
          
          <HairColorCard 
            hairColorData={hairColorData} 
            t={t} 
            renderCustomizedLabel={renderCustomizedLabel} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EyeColorCard 
            eyeColorData={eyeColorData} 
            t={t} 
            renderCustomizedLabel={renderCustomizedLabel} 
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
