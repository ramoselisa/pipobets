
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
    <BrowserRouter>
      <LocaleProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Navigate to="/en" replace />} />
              <Route path="/:locale" element={<Index />} />
              <Route path="/:locale/approve-bets" element={<ApproveBets />} />
              <Route path="/:locale/receive-card" element={<ReceiveBirthCard />} />
              <Route path="/:locale/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </LocaleProvider>
    </BrowserRouter>
  );
};

export default App;
