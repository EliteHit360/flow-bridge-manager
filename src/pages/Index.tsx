import React, { useState, useEffect } from 'react';
import { 
  TruckIcon, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Clock, 
  Package, 
  AlertTriangle, 
  BarChart3
} from 'lucide-react';

import PageTitle from '@/components/common/PageTitle';
import MetricsCard from '@/components/dashboard/MetricsCard';
import StatusBadge from '@/components/common/StatusBadge';
import FlowThroughPercentage from '@/components/dashboard/FlowThroughPercentage';
import AllocationChart from '@/components/dashboard/AllocationChart';
import PageLayout from '@/components/layout/PageLayout';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Recent activity sample data
  const recentActivities = [
    { 
      id: 1, 
      type: 'inbound', 
      title: 'Inbound Shipment Received',
      description: 'Shipment #SH-3847 received with 135 units across 5 SKUs',
      time: '10 minutes ago',
      status: 'success' as const,
    },
    { 
      id: 2, 
      type: 'allocation', 
      title: 'Auto-Allocation Completed',
      description: '112 units allocated for flow-through, 23 units to storage',
      time: '8 minutes ago',
      status: 'success' as const,
    },
    { 
      id: 3, 
      type: 'outbound', 
      title: 'Outbound Loading Started',
      description: 'Truck #T-7284 loading started for stores #101, #102, #105',
      time: '3 minutes ago',
      status: 'info' as const,
    },
    { 
      id: 4, 
      type: 'exception', 
      title: 'Allocation Exception',
      description: 'SKU #98735 has 5 units unallocated due to no matching demand',
      time: 'Just now',
      status: 'warning' as const,
    },
  ];
  
  // Upcoming shipments sample data
  const upcomingShipments = [
    { 
      id: 'SH-3854', 
      supplier: 'ABC Distribution', 
      expectedTime: '14:30', 
      items: 246,
      status: 'In Transit' 
    },
    { 
      id: 'SH-3855', 
      supplier: 'XYZ Logistics', 
      expectedTime: '15:45', 
      items: 178,
      status: 'Scheduled' 
    },
    { 
      id: 'SH-3856', 
      supplier: 'Global Shipping Co.', 
      expectedTime: '16:15', 
      items: 320,
      status: 'Delayed' 
    },
  ];

  return (
    <PageLayout>
      <PageTitle 
        title="Flow-Through Dashboard" 
        subtitle="Monitor real-time cross-docking operations and key metrics"
      />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[140px] rounded-xl bg-card border"></div>
          ))}
          <div className="h-[400px] rounded-xl bg-card border md:col-span-2"></div>
          <div className="h-[400px] rounded-xl bg-card border md:col-span-2"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricsCard
              title="Flow-Through Rate"
              value="78%"
              icon={<ArrowDownToLine className="h-5 w-5" />}
              change={{ value: 3.2, type: 'increase' }}
              subtitle="Overall today"
            />
            
            <MetricsCard
              title="Avg. Dwell Time"
              value="42 min"
              icon={<Clock className="h-5 w-5" />}
              change={{ value: 12, type: 'decrease' }}
              subtitle="From receiving to outbound"
            />
            
            <MetricsCard
              title="Open Exceptions"
              value="7"
              icon={<AlertTriangle className="h-5 w-5" />}
              change={{ value: 2, type: 'increase' }}
              subtitle="Requires attention"
              className="border-warning/20"
            />
            
            <MetricsCard
              title="Active Shipments"
              value="12"
              icon={<TruckIcon className="h-5 w-5" />}
              change={{ value: 0, type: 'neutral' }}
              subtitle="Inbound & outbound"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3 grid grid-cols-1 gap-6">
              <AllocationChart />
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              <div className="p-6 rounded-xl border bg-card shadow-sm h-full flex flex-col">
                <h3 className="text-lg font-medium mb-4">Current Performance</h3>
                
                <div className="flex-1 flex items-center justify-center">
                  <FlowThroughPercentage percentage={78} size="lg" />
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Allocation Accuracy</p>
                    <p className="text-lg font-semibold">95.2%</p>
                  </div>
                  
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Truck Utilization</p>
                    <p className="text-lg font-semibold">87.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Recent Activity</h3>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
              </div>
              
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex">
                      <div className="mr-4">
                        {activity.type === 'inbound' && (
                          <div className="h-10 w-10 rounded-full bg-success/10 flex-center text-success">
                            <ArrowDownToLine className="h-5 w-5" />
                          </div>
                        )}
                        {activity.type === 'outbound' && (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex-center text-primary">
                            <ArrowUpFromLine className="h-5 w-5" />
                          </div>
                        )}
                        {activity.type === 'allocation' && (
                          <div className="h-10 w-10 rounded-full bg-secondary flex-center text-foreground">
                            <Package className="h-5 w-5" />
                          </div>
                        )}
                        {activity.type === 'exception' && (
                          <div className="h-10 w-10 rounded-full bg-warning/10 flex-center text-warning">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <StatusBadge status={activity.status} label={activity.time} showDot={false} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Upcoming Inbound Shipments</h3>
                  <button className="text-sm text-primary hover:underline">View Schedule</button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Shipment ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Supplier
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Expected
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {upcomingShipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <div className="font-medium">{shipment.id}</div>
                            <div className="text-xs text-muted-foreground">{shipment.items} items</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {shipment.supplier}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {shipment.expectedTime}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <StatusBadge 
                              status={
                                shipment.status === 'In Transit' ? 'info' : 
                                shipment.status === 'Delayed' ? 'warning' : 
                                'success'
                              } 
                              label={shipment.status} 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Dashboard;
