
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Clock, 
  TruckIcon, 
  CheckCircle2, 
  AlertTriangle,
  CalendarIcon,
  ArrowDownToLine, 
  ArrowUpFromLine
} from 'lucide-react';

import PageTitle from '@/components/common/PageTitle';
import MetricsCard from '@/components/dashboard/MetricsCard';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import MetricsChart from '@/components/metrics/MetricsChart';
import MetricsTimeSelector from '@/components/metrics/MetricsTimeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricsTable from '@/components/metrics/MetricsTable';

const Metrics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-4 md:p-6 container mx-auto max-w-screen-2xl">
          <PageTitle 
            title="Performance Metrics" 
            subtitle="Monitor key metrics and performance indicators for flow-through operations"
          />
          
          <div className="mb-6 flex items-center justify-between">
            <MetricsTimeSelector value={timeRange} onChange={(value) => setTimeRange(value as 'day' | 'week' | 'month')} />
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[140px] rounded-xl bg-card border"></div>
              ))}
              <div className="h-[400px] rounded-xl bg-card border md:col-span-2 lg:col-span-2"></div>
              <div className="h-[400px] rounded-xl bg-card border md:col-span-2 lg:col-span-2"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <MetricsCard
                  title="Flow-Through Rate"
                  value="78.2%"
                  icon={<ArrowDownToLine className="h-5 w-5" />}
                  change={{ value: 3.2, type: 'increase' }}
                  subtitle="Overall"
                />
                
                <MetricsCard
                  title="Avg. Dwell Time"
                  value="42 min"
                  icon={<Clock className="h-5 w-5" />}
                  change={{ value: 12, type: 'decrease' }}
                  subtitle="From receipt to dispatch"
                />
                
                <MetricsCard
                  title="Fulfillment Accuracy"
                  value="95.5%"
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  change={{ value: 1.8, type: 'increase' }}
                  subtitle="Store orders met"
                />
                
                <MetricsCard
                  title="Truck Utilization"
                  value="87.5%"
                  icon={<TruckIcon className="h-5 w-5" />}
                  change={{ value: 2.4, type: 'increase' }}
                  subtitle="Capacity utilized"
                />
              </div>
              
              <Tabs defaultValue="charts" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="charts" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <MetricsChart 
                      title="Flow-Through % by Category"
                      type="bar"
                      heightClass="h-[350px]"
                    />
                    
                    <MetricsChart 
                      title="Dwell Time Trend"
                      type="line"
                      heightClass="h-[350px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <MetricsChart 
                      title="Fulfillment Accuracy by Store"
                      type="bar"
                      heightClass="h-[350px]"
                    />
                    
                    <MetricsChart 
                      title="Truck Utilization by Route"
                      type="bar"
                      heightClass="h-[350px]"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <MetricsTable />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="rounded-xl border bg-card shadow-sm p-4 md:p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Performance Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium">Flow-Through Rate is improving</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your flow-through rate has increased by 3.2% compared to the previous period, 
                          which is contributing to reduced handling costs and faster replenishment.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium">Action required for Electronics category</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Electronics category has a flow-through rate 15% below target. 
                          Consider reviewing allocation rules or inbound scheduling for this category.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dwell time reduced significantly</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Average dwell time decreased from 54 minutes to 42 minutes, 
                          a 22% improvement that enhances inventory velocity and store fulfillment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Metrics;
