
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Index from "./pages/Index";
import Metrics from "./pages/Metrics";
import Rules from "./pages/Rules";
import Receiving from "./pages/Receiving";
import Allocation from "./pages/Allocation";
import Shipments from "./pages/Shipments";
import Exceptions from "./pages/Exceptions";
import Data from "./pages/Data";
import RawData from "./pages/RawData";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <PageLayout>
                <Index />
              </PageLayout>
            } 
          />
          <Route 
            path="/metrics" 
            element={
              <PageLayout>
                <Metrics />
              </PageLayout>
            } 
          />
          <Route 
            path="/rules" 
            element={
              <PageLayout>
                <Rules />
              </PageLayout>
            } 
          />
          <Route 
            path="/receiving" 
            element={
              <PageLayout>
                <Receiving />
              </PageLayout>
            } 
          />
          <Route 
            path="/allocation" 
            element={
              <PageLayout>
                <Allocation />
              </PageLayout>
            } 
          />
          <Route 
            path="/shipments" 
            element={
              <PageLayout>
                <Shipments />
              </PageLayout>
            } 
          />
          <Route 
            path="/exceptions" 
            element={
              <PageLayout>
                <Exceptions />
              </PageLayout>
            } 
          />
          <Route 
            path="/data" 
            element={
              <PageLayout>
                <Data />
              </PageLayout>
            } 
          />
          <Route 
            path="/raw-data" 
            element={
              <PageLayout>
                <RawData />
              </PageLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <PageLayout>
                <NotFound />
              </PageLayout>
            } 
          />
          <Route 
            path="*" 
            element={
              <PageLayout>
                <NotFound />
              </PageLayout>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
