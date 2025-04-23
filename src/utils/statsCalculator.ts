
import { PredictionProps } from "@/components/PredictionCard";

interface Stats {
  total: number;
  resemblanceCount: { mommy: number; daddy: number; other: number };
  hairColorCount: Record<string, number>;
  eyeColorCount: Record<string, number>;
  dateCount: Record<string, number>;
  lostCount: number;
  traitsFromMom: Record<string, number>;
  traitsFromDad: Record<string, number>;
}

export function calculateStats(predictions: PredictionProps[]): Stats {
  const resemblanceCount = { mommy: 0, daddy: 0, other: 0 };
  const hairColorCount: Record<string, number> = {};
  const eyeColorCount: Record<string, number> = {};
  const dateCount: Record<string, number> = {};
  const traitsFromMom: Record<string, number> = {};
  const traitsFromDad: Record<string, number> = {};
  let lostCount = 0;

  predictions.forEach((pred) => {
    if (pred.isLost) {
      lostCount++;
    }
    
    if (pred.resemblance) {
      const key = pred.resemblance.toLowerCase();
      if (key.includes("mom")) {
        resemblanceCount.mommy++;
      } else if (key.includes("dad")) {
        resemblanceCount.daddy++;
      } else {
        resemblanceCount.other++;
      }
    }

    if (pred.hairColor) {
      hairColorCount[pred.hairColor] = (hairColorCount[pred.hairColor] || 0) + 1;
    }

    if (pred.eyeColor) {
      eyeColorCount[pred.eyeColor] = (eyeColorCount[pred.eyeColor] || 0) + 1;
    }

    if (pred.date) {
      dateCount[pred.date] = (dateCount[pred.date] || 0) + 1;
    }

    if (pred.hopeMom) {
      const traits = pred.hopeMom.split(',').map(t => t.trim());
      traits.forEach(trait => {
        if (trait) {
          traitsFromMom[trait] = (traitsFromMom[trait] || 0) + 1;
        }
      });
    }

    if (pred.hopeDad) {
      const traits = pred.hopeDad.split(',').map(t => t.trim());
      traits.forEach(trait => {
        if (trait) {
          traitsFromDad[trait] = (traitsFromDad[trait] || 0) + 1;
        }
      });
    }
  });

  return {
    total: predictions.length,
    resemblanceCount,
    hairColorCount,
    eyeColorCount,
    dateCount,
    lostCount,
    traitsFromMom,
    traitsFromDad,
  };
}
