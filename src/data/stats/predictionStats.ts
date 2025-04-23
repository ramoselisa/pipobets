
import { PredictionProps } from "@/components/PredictionCard";

export const getPredictionStats = (predictions: PredictionProps[]) => {
  const dateCount: Record<string, number> = {};
  const resemblanceCount: Record<string, number> = { "Mommy": 0, "Daddy": 0, "Other": 0 };
  const traits: { mom: Record<string, number>, dad: Record<string, number> } = { mom: {}, dad: {} };
  const hairColorCount: Record<string, number> = {};
  const eyeColorCount: Record<string, number> = {};
  const lostCount = predictions.filter(p => p.isLost).length;
  
  predictions.forEach(prediction => {
    // Count dates
    if (prediction.date) {
      dateCount[prediction.date] = (dateCount[prediction.date] || 0) + 1;
    }
    
    // Count resemblance
    if (prediction.resemblance) {
      if (prediction.resemblance.toLowerCase().includes("mom")) {
        resemblanceCount["Mommy"]++;
      } else if (prediction.resemblance.toLowerCase().includes("dad")) {
        resemblanceCount["Daddy"]++;
      } else {
        resemblanceCount["Other"]++;
      }
    }
    
    // Count traits
    if (prediction.hopeMom) {
      traits.mom[prediction.hopeMom] = (traits.mom[prediction.hopeMom] || 0) + 1;
    }
    if (prediction.hopeDad) {
      traits.dad[prediction.hopeDad] = (traits.dad[prediction.hopeDad] || 0) + 1;
    }
    
    // Count hair colors
    if (prediction.hairColor) {
      hairColorCount[prediction.hairColor] = (hairColorCount[prediction.hairColor] || 0) + 1;
    }
    
    // Count eye colors
    if (prediction.eyeColor) {
      eyeColorCount[prediction.eyeColor] = (eyeColorCount[prediction.eyeColor] || 0) + 1;
    }
  });
  
  return {
    dateCount,
    resemblanceCount,
    traits,
    hairColorCount,
    eyeColorCount,
    total: predictions.length,
    lostCount
  };
};
