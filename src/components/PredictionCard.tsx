
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Popcorn } from "lucide-react";

export interface PredictionProps {
  name: string;
  date: string;
  weight: string;
  height: string;
  gender: string;
  note?: string;
}

export function PredictionCard({
  name,
  date,
  weight,
  height,
  gender,
  note,
}: PredictionProps) {
  // Color based on gender prediction
  const genderColor = gender.toLowerCase() === "boy" 
    ? "bg-blue-100 text-blue-800" 
    : gender.toLowerCase() === "girl" 
    ? "bg-pink-100 text-pink-800" 
    : "bg-purple-100 text-purple-800";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50 group animate-pop">
      <CardHeader className="pb-2 bg-gradient-to-r from-secondary/30 to-transparent group-hover:from-secondary/50 transition-colors">
        <CardTitle className="flex items-center justify-between">
          <span className="group-hover:text-primary transition-colors">{name}</span>
          <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${genderColor}`}>
            {gender}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="absolute top-0 right-0 -mt-8 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Popcorn className="h-6 w-6 text-primary animate-float" />
        </div>
        
        <div className="flex items-center mb-2 text-primary">
          <CalendarDays className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">{date}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="rounded-md bg-secondary p-2 text-center group-hover:bg-secondary/80 transition-colors">
            <div className="text-xs text-muted-foreground">Weight</div>
            <div className="font-medium">{weight}</div>
          </div>
          <div className="rounded-md bg-secondary p-2 text-center group-hover:bg-secondary/80 transition-colors">
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="font-medium">{height}</div>
          </div>
        </div>
        
        {note && (
          <div className="mt-2 text-sm italic text-muted-foreground border-t pt-2 border-dashed border-primary/20">
            "{note}"
          </div>
        )}
      </CardContent>
    </Card>
  );
}
