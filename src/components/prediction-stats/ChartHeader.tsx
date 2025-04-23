
import { CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ChartHeaderProps {
  icon: LucideIcon;
  title: string;
}

export function ChartHeader({ icon: Icon, title }: ChartHeaderProps) {
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center">
        <Icon className="h-5 w-5 mr-2 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
  );
}
