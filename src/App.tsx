
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import RicevutePage from "./pages/RicevutePage";
import PazientiPage from "./pages/PazientiPage";
import CorrispettiviPage from "./pages/CorrispettiviPage";
import ImpostazioniPage from "./pages/ImpostazioniPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          } />
          <Route path="/ricevute" element={
            <AppLayout>
              <RicevutePage />
            </AppLayout>
          } />
          <Route path="/pazienti" element={
            <AppLayout>
              <PazientiPage />
            </AppLayout>
          } />
          <Route path="/corrispettivi" element={
            <AppLayout>
              <CorrispettiviPage />
            </AppLayout>
          } />
          <Route path="/impostazioni" element={
            <AppLayout>
              <ImpostazioniPage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
