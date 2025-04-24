
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ApproveBets from "./pages/ApproveBets";
import ReceiveBirthCard from "./pages/ReceiveBirthCard";
import ThankYou from "./pages/ThankYou";
import { LocaleProvider } from "@/i18n/useLocale";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.title = "PipoBet | Baby Prediction Pool";
  }, []);

  return (
    <LocaleProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/approve-bets" element={<ApproveBets />} />
              <Route path="/receive-card" element={<ReceiveBirthCard />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LocaleProvider>
  );
};

export default App;
