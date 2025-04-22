
import { HeroSection } from "@/components/HeroSection";
import { PredictionsGrid } from "@/components/PredictionsGrid";
import { PredictionForm } from "@/components/PredictionForm";
import { PopcornDecoration } from "@/components/PopcornDecoration";
import { Footer } from "@/components/Footer";
import { UploadXLSXButton } from "@/components/UploadXLSXButton";
import { mockPredictions } from "@/data/mockPredictions";
import { Popcorn } from "lucide-react";
import { PredictionStats } from "@/components/PredictionStats";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Decorative popcorn background */}
      <PopcornDecoration />
      
      {/* Main content */}
      <main className="flex-grow">
        <HeroSection />
        
        <div className="py-8">
          <div className="container">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-primary/60 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-primary/20">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-center text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                    <Popcorn size={24} className="text-primary" />
                    <span>About PipoBet</span>
                  </h2>
                  <p className="text-center text-muted-foreground">
                    Join our fun baby prediction pool! Guess the birth date, weight, height, hair color, 
                    eye color, traits, and more for the upcoming little one. The closest prediction wins bragging rights and a special surprise!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mb-8">
          <div className="max-w-md mx-auto">
            <UploadXLSXButton />
          </div>
        </div>
        
        <PredictionStats />
        
        <Separator className="max-w-[50%] mx-auto my-6" />
        
        <PredictionsGrid predictions={mockPredictions} />
        <PredictionForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
