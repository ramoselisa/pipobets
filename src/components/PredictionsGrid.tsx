
import { PredictionCard, PredictionProps } from "./PredictionCard";

interface PredictionsGridProps {
  predictions: PredictionProps[];
}

export function PredictionsGrid({ predictions }: PredictionsGridProps) {
  return (
    <div className="container py-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">Current Predictions</span>
        <span className="bg-primary text-primary-foreground text-sm py-0.5 px-2 rounded-full">
          {predictions.length}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <PredictionCard key={index} {...prediction} />
        ))}
      </div>
    </div>
  );
}
