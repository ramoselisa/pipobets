
import { HeroSection } from "@/components/HeroSection";
import { PredictionsGrid } from "@/components/PredictionsGrid";
import { PredictionForm } from "@/components/PredictionForm";
import { PopcornDecoration } from "@/components/PopcornDecoration";
import { Footer } from "@/components/Footer";
import { mockPredictions } from "@/data/mockPredictions";
import { Popcorn } from "lucide-react";
import { PredictionStats } from "@/components/PredictionStats";
import { Separator } from "@/components/ui/separator";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Decorative popcorn background */}
      <PopcornDecoration />

      {/* Main content */}
      <main className="flex-grow">
        <CountdownTimer />
        <HeroSection />

        {/* Red and white style link to Approve Bets */}
        <div className="flex justify-center my-6">
          <Link
            to="/approve-bets"
            className="px-6 py-2 bg-[#ea384c] text-white font-bold rounded-full shadow flex gap-2 items-center border-2 border-white hover:bg-red-700 transition-all"
            style={{ textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff" }}
          >
            <Popcorn size={22} className="text-white" />
            Approve New Bets
          </Link>
        </div>

        <div className="py-8">
          <div className="container">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/60 to-red-200/60 blur-3xl opacity-30 rounded-full"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-red-200/50">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-center text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                    <Popcorn size={24} className="text-red-500" />
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

        <PredictionStats />

        <Separator className="max-w-[50%] mx-auto my-6 border-red-300" />

        <PredictionsGrid predictions={mockPredictions} />
        <PredictionForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
