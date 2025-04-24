
import { Baby, Popcorn, ArrowRight, Gift } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";

export function HeroSection() {
  const { t } = useLocale();
  const { locale } = useParams<{ locale: string }>();
  
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background z-0"></div>
      
      <div className="absolute -top-4 -left-4 right-4 bottom-4 rotate-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 -rotate-2 bg-gradient-to-l from-primary/20 to-primary/10 rounded-3xl"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20 rounded-3xl transform -rotate-3"></div>
            <img 
              src="/public/lovable-uploads/8e1e391c-e636-4d06-8f29-975767520d5c.png"
              alt="Family photo with cats"
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 transform rotate-12">
              <Popcorn size={40} className="text-primary" />
            </div>
            <div className="absolute -top-4 -left-4 transform -rotate-12">
              <Popcorn size={40} className="text-primary" />
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
              <Link to={`/${locale}/receive-card`} className="inline-flex items-center">
                {t("requestBirthCard")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#prediction-form" className="inline-flex items-center">
                {t("submitPrediction")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link 
                to={`/${locale}/thank-you`}
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
