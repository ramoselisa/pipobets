
import { Baby, Popcorn } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

export function HeroSection() {
  const { t } = useLocale();
  
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background z-0"></div>
      
      {/* Decorative popcorn elements */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <Popcorn size={60} className="text-primary" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <Popcorn size={60} className="text-primary" />
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-lg mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Baby size={40} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary">Pipo</span>Bet
          </h1>
          
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground">
            {t("heroMainText")}
          </p>
          
          <div className="flex items-center gap-2 text-sm px-4 py-2 bg-muted rounded-full">
            <Popcorn size={16} className="text-primary" />
            <span>{t("heroSubText")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
