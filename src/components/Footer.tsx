
import { Baby, Popcorn, Calendar } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2">
            <Popcorn size={20} className="text-primary" />
            <span className="text-lg font-bold">PipoBet</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Baby size={16} />
            <span>Baby prediction pool</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>Coming soon: May 2025</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Created with love for the little one on the way. 💕</p>
        </div>
      </div>
    </footer>
  );
}
