
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Metrics from "./pages/Metrics";
import Rules from "./pages/Rules";
import Receiving from "./pages/Receiving";
import Allocation from "./pages/Allocation";
import Shipments from "./pages/Shipments";
import Exceptions from "./pages/Exceptions";
import Data from "./pages/Data";
import RawData from "./pages/RawData"; // Add the new RawData page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/receiving" element={<Receiving />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/exceptions" element={<Exceptions />} />
          <Route path="/data" element={<Data />} />
          <Route path="/raw-data" element={<RawData />} /> {/* Add the new route */}
          <Route path="/reports" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
