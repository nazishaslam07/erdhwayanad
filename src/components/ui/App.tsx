import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import Index from "./Index";

// Lazy load non-critical routes for faster initial load
const ExpressionOfInterest = lazy(() => import("./ExpressionOfInterest"));
const LifeAtErdh = lazy(() => import("./LifeAtErdh"));
const Philosophy = lazy(() => import("./Philosophy"));
const Stewards = lazy(() => import("../stewards/Stewards"));
const Land = lazy(() => import("./Land"));
const Infographic = lazy(() => import("./Infographic"));
const NotFound = lazy(() => import("./NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <p className="font-heading text-2xl text-foreground mb-2">
        <span className="font-bold">erdh</span>{" "}
        <span className="font-body text-sm">1.0</span>
      </p>
      <div className="w-8 h-px bg-primary mx-auto animate-pulse" />
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/express-interest" element={<ExpressionOfInterest />} />
              <Route path="/life" element={<LifeAtErdh />} />
              <Route path="/philosophy" element={<Philosophy />} />
              <Route path="/stewards" element={<Stewards />} />
              <Route path="/land" element={<Land />} />
              <Route path="/infographic" element={<Infographic />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
