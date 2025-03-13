
import React, { useState } from 'react';
import { 
  Package, 
  Store, 
  TruckIcon, 
  Boxes, 
  PackageCheck, 
  BarChart3, 
  CalendarClock,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatusBadge from '@/components/common/StatusBadge';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

const Allocation = () => {
  const [sortField, setSortField] = useState('priority');
  const [searchValue, setSearchValue] = useState('');
  
  // Sample data for allocation tasks
  const pendingAllocations = [
    {
      id: 'ALLOC-4782',
      sku: 'SKU-5892',
      name: 'Premium Widget XL',
      totalQty: 48,
      pendingStores: 5,
      priority: 'High',
      dueDate: 'Today, 2:00 PM',
      source: 'Inbound SH-3847',
      status: 'Ready'
    },
    {
      id: 'ALLOC-4783',
      sku: 'SKU-4123',
      name: 'Basic Widget Pack',
      totalQty: 120,
      pendingStores: 8,
      priority: 'Medium',
      dueDate: 'Tomorrow, 10:00 AM',
      source: 'Inbound SH-3848',
      status: 'Ready'
    },
    {
      id: 'ALLOC-4784',
      sku: 'SKU-7741',
      name: 'Deluxe Gadget Pro',
      totalQty: 24,
      pendingStores: 3,
      priority: 'Low',
      dueDate: 'May 15, 3:30 PM',
      source: 'Storage A12-B3',
      status: 'Pending'
    },
  ];
  
  // Sample data for store allocations
  const storeAllocations = [
    {
      storeId: 'ST-101',
      name: 'Downtown Store',
      city: 'New York',
      totalItems: 78,
      flowThroughItems: 62,
      shipment: 'TR-5932',
      departureTime: 'Today, 4:30 PM',
      status: 'Loading'
    },
    {
      storeId: 'ST-205',
      name: 'Westside Mall',
      city: 'Chicago',
      totalItems: 103,
      flowThroughItems: 85,
      shipment: 'TR-5934',
      departureTime: 'Today, 6:00 PM',
      status: 'Allocated'
    },
    {
      storeId: 'ST-318',
      name: 'Eastside Plaza',
      city: 'Boston',
      totalItems: 54,
      flowThroughItems: 37,
      shipment: 'TR-5939',
      departureTime: 'Tomorrow, 8:00 AM',
      status: 'Allocated'
    },
  ];
  
  // Calculate flow-through percentage
  const calculateFlowThrough = (flowThrough, total) => {
    return Math.round((flowThrough / total) * 100);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-6">
          <PageTitle 
            title="Allocation Management" 
            subtitle="Manage flow-through allocations and store shipments"
          />
          
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden mb-6">
            <div className="bg-primary/5 border-b p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PackageCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Current Flow-Through Overview</h3>
              </div>
              
              <StatusBadge status="success" label="Active" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Pending Allocations</h4>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">12</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="text-success">+3</span> since yesterday
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Items to Allocate</h4>
                    <Boxes className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">286</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="text-success">72%</span> flow-through eligible
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Stores Pending</h4>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">18</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="text-warning">5</span> high priority
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Outbound Trucks</h4>
                    <TruckIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">7</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="text-success">3</span> loading now
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Tabs defaultValue="items">
              <div className="border-b px-4">
                <TabsList className="bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="items" 
                    className="px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Item Allocations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="stores" 
                    className="px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Store Shipments
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="items" className="p-6 m-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Pending Item Allocations</h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="search"
                        placeholder="Search by SKU or name..."
                        className="w-[250px] pl-8"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                    
                    <Select value={sortField} onValueChange={setSortField}>
                      <SelectTrigger className="w-[180px]">
                        <div className="flex items-center">
                          <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                          <SelectValue placeholder="Sort by" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">Sort by Priority</SelectItem>
                        <SelectItem value="dueDate">Sort by Due Date</SelectItem>
                        <SelectItem value="quantity">Sort by Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Item Details
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Quantity & Stores
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {pendingAllocations.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm">{item.totalQty} units total</p>
                            <p className="text-xs text-muted-foreground">{item.pendingStores} stores pending</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>
                              <StatusBadge 
                                status={
                                  item.priority === 'High' ? 'error' : 
                                  item.priority === 'Medium' ? 'warning' : 
                                  'info'
                                } 
                                label={item.priority} 
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Due: {item.dueDate}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              {item.source.includes('Inbound') ? (
                                <Package className="h-4 w-4 text-muted-foreground mr-2" />
                              ) : (
                                <Store className="h-4 w-4 text-muted-foreground mr-2" />
                              )}
                              {item.source}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <StatusBadge 
                              status={item.status === 'Ready' ? 'success' : 'neutral'} 
                              label={item.status} 
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button 
                              className={cn(
                                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                item.status === 'Ready' 
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                  : "bg-muted text-muted-foreground"
                              )}
                              disabled={item.status !== 'Ready'}
                            >
                              Allocate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="stores" className="p-6 m-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Store Shipment Allocations</h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="search"
                        placeholder="Search stores..."
                        className="w-[220px] pl-8"
                      />
                    </div>
                    
                    <button className="inline-flex items-center px-3 py-2 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/70 transition-colors">
                      <Filter className="h-3.5 w-3.5 mr-1.5" />
                      Filter
                    </button>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Store
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Flow-Through %
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Shipment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {storeAllocations.map((store) => (
                        <tr key={store.storeId} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-medium text-sm">{store.name}</p>
                            <p className="text-xs text-muted-foreground">{store.storeId} - {store.city}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm">{store.totalItems} total units</p>
                            <p className="text-xs text-muted-foreground">{store.flowThroughItems} flow-through</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden mr-2">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${calculateFlowThrough(store.flowThroughItems, store.totalItems)}%` }} 
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {calculateFlowThrough(store.flowThroughItems, store.totalItems)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <TruckIcon className="h-4 w-4 text-muted-foreground mr-2" />
                              <div>
                                <p className="text-sm">{store.shipment}</p>
                                <p className="text-xs text-muted-foreground">Departs: {store.departureTime}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <StatusBadge 
                              status={
                                store.status === 'Loading' ? 'info' : 
                                store.status === 'Allocated' ? 'success' : 
                                'neutral'
                              } 
                              label={store.status} 
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button className="px-3 py-1 rounded-md text-xs font-medium bg-secondary hover:bg-secondary/70 transition-colors">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Allocation;
