
import { Baby, Popcorn, ArrowRight, Gift } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function HeroSection() {
  const { t } = useLocale();
  
  const scrollToPredictionForm = () => {
    const element = document.getElementById('prediction-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background z-0"></div>
      
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <Popcorn size={60} className="text-primary" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <Popcorn size={60} className="text-primary" />
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-full max-w-2xl mx-auto mb-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-200 to-red-300 rounded-3xl -z-10 shadow-lg transform rotate-1 animate-float"></div>
            
            <img 
              src="/lovable-uploads/bcd88a2e-550f-4952-b564-fd41be24b5d4.png" 
              alt="Family moment with cats" 
              className="rounded-2xl shadow-lg object-cover w-full h-[400px] relative z-10"
            />
          </div>
          
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
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button asChild variant="default" size="lg">
              <Link to="/receive-card" className="inline-flex items-center">
                {t("requestBirthCard")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" onClick={scrollToPredictionForm}>
              <span className="inline-flex items-center">
                {t("submitPrediction")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link 
                to="/thank-you"
                className="inline-flex items-center"
              >
                <Gift className="mr-2 h-4 w-4" />
                {t("thankYou")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
