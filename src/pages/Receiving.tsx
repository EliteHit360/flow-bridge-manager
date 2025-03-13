
import React, { useState } from 'react';
import { 
  Truck, 
  Scan, 
  Package, 
  BarChart3, 
  PackageCheck, 
  Store, 
  ListChecks, 
  Loader2,
  Search
} from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatusBadge from '@/components/common/StatusBadge';
import { cn } from '@/lib/utils';

const Receiving = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [scanning, setScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<null | {
    id: string;
    name: string;
    quantity: number;
    allocation: {
      flowThrough: number;
      storage: number;
    };
    stores: {
      id: string;
      name: string;
      quantity: number;
      door: string;
    }[];
  }>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setScanning(false);
      setScannedItem({
        id: 'SKU-5892',
        name: 'Premium Widget XL',
        quantity: 24,
        allocation: {
          flowThrough: 18,
          storage: 6,
        },
        stores: [
          { id: 'ST-101', name: 'Downtown Store', quantity: 6, door: 'Door #3' },
          { id: 'ST-205', name: 'Westside Mall', quantity: 8, door: 'Door #3' },
          { id: 'ST-318', name: 'Eastside Plaza', quantity: 4, door: 'Door #5' },
        ],
      });
    }, 1500);
  };
  
  // Pending shipments data
  const pendingShipments = [
    {
      id: 'SH-3847',
      supplier: 'ABC Distribution',
      expected: '10:30 AM',
      items: 135,
      status: 'Arrived',
      poNumber: 'PO-58721',
    },
    {
      id: 'SH-3848',
      supplier: 'Global Supply Co.',
      expected: '11:45 AM',
      items: 246,
      status: 'In Transit',
      poNumber: 'PO-58734',
    },
    {
      id: 'SH-3850',
      supplier: 'Premium Goods Inc.',
      expected: '01:15 PM',
      items: 89,
      status: 'Scheduled',
      poNumber: 'PO-58740',
    },
  ];
  
  // Processed shipments data
  const processedShipments = [
    {
      id: 'SH-3845',
      supplier: 'XYZ Logistics',
      received: '09:12 AM',
      items: 178,
      flowThrough: 143,
      storage: 35,
      completedBy: 'John D.',
    },
    {
      id: 'SH-3846',
      supplier: 'Fast Freight Co.',
      received: 'Yesterday, 04:30 PM',
      items: 112,
      flowThrough: 98,
      storage: 14,
      completedBy: 'Emma S.',
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-6">
          <PageTitle 
            title="Receiving & Flow-Through Sorting" 
            subtitle="Process inbound shipments and allocate items for flow-through"
          />
          
          <div className="grid grid-cols-1 gap-6">
            {/* Scanner Section */}
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Scan className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Scan Inbound Items</h3>
                </div>
                
                <div className="text-xs opacity-80">
                  Dock: <span className="font-semibold">Bay 3</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="max-w-3xl mx-auto">
                  {scannedItem ? (
                    <div className="animate-in">
                      <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                          <PackageCheck className="h-6 w-6 text-success mr-3" />
                          <div>
                            <h4 className="font-medium">Item Scanned Successfully</h4>
                            <p className="text-sm text-muted-foreground">Allocation has been determined for this item</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-xs text-muted-foreground">Item ID</p>
                          <p className="font-medium">{scannedItem.id}</p>
                        </div>
                        
                        <div className="bg-muted rounded-lg p-4 md:col-span-2">
                          <p className="text-xs text-muted-foreground">Item Name</p>
                          <p className="font-medium">{scannedItem.name}</p>
                        </div>
                      </div>
                      
                      <h4 className="font-medium mb-3">Allocation Results</h4>
                      
                      <div className="bg-accent rounded-lg overflow-hidden mb-6">
                        <div className="grid grid-cols-2 divide-x">
                          <div className="p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Flow-Through Allocation</p>
                            <p className="text-2xl font-semibold">{scannedItem.allocation.flowThrough}</p>
                            <p className="text-xs text-muted-foreground">
                              ({Math.round((scannedItem.allocation.flowThrough / scannedItem.quantity) * 100)}% of total)
                            </p>
                          </div>
                          
                          <div className="p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Storage Allocation</p>
                            <p className="text-2xl font-semibold">{scannedItem.allocation.storage}</p>
                            <p className="text-xs text-muted-foreground">
                              ({Math.round((scannedItem.allocation.storage / scannedItem.quantity) * 100)}% of total)
                            </p>
                          </div>
                        </div>
                        
                        <div className="h-2 bg-muted">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(scannedItem.allocation.flowThrough / scannedItem.quantity) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {scannedItem.allocation.flowThrough > 0 && (
                        <>
                          <h4 className="font-medium mb-3">Flow-Through Destination Stores</h4>
                          
                          <div className="rounded-lg border overflow-hidden mb-6">
                            <table className="min-w-full divide-y">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Store
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Outbound Door
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y">
                                {scannedItem.stores.map((store) => (
                                  <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <p className="font-medium text-sm">{store.name}</p>
                                      <p className="text-xs text-muted-foreground">{store.id}</p>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                      {store.quantity} units
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                                        {store.door}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                      
                      {scannedItem.allocation.storage > 0 && (
                        <div className="bg-secondary rounded-lg p-4 flex items-center">
                          <Store className="h-5 w-5 text-muted-foreground mr-3" />
                          <div>
                            <h4 className="font-medium">Storage Location</h4>
                            <p className="text-sm">Store {scannedItem.allocation.storage} units in Aisle B, Rack 12</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-6">
                        <button 
                          className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
                          onClick={() => setScannedItem(null)}
                        >
                          Cancel
                        </button>
                        
                        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                          Confirm Allocation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      {scanning ? (
                        <div className="inline-flex flex-col items-center">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <p className="mt-4 text-lg font-medium">Scanning Item...</p>
                          <p className="text-muted-foreground">Please wait while we process the scan</p>
                        </div>
                      ) : (
                        <div className="inline-flex flex-col items-center">
                          <div className="h-20 w-20 rounded-full bg-muted flex-center mb-4">
                            <Scan className="h-10 w-10 text-muted-foreground" />
                          </div>
                          <p className="text-lg font-medium">Ready to Scan</p>
                          <p className="text-muted-foreground mb-6">Scan the barcode on the inbound item or package</p>
                          
                          <button
                            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium flex items-center hover:bg-primary/90 transition-colors"
                            onClick={handleScan}
                          >
                            <Scan className="h-5 w-5 mr-2" />
                            Simulate Scan
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Shipments Section */}
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    className={cn(
                      "px-6 py-3 font-medium text-sm border-b-2 transition-colors",
                      activeTab === 'pending' 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setActiveTab('pending')}
                  >
                    Pending Shipments
                  </button>
                  
                  <button
                    className={cn(
                      "px-6 py-3 font-medium text-sm border-b-2 transition-colors",
                      activeTab === 'processed' 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setActiveTab('processed')}
                  >
                    Processed Shipments
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {activeTab === 'pending' ? 'Today\'s Pending Shipments' : 'Recently Processed Shipments'}
                  </h3>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="search"
                      placeholder="Search shipments..."
                      className="h-9 w-[200px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                
                {activeTab === 'pending' ? (
                  <div className="rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Shipment Details
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Supplier
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Expected Arrival
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
                        {pendingShipments.map((shipment) => (
                          <tr key={shipment.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-medium text-sm">{shipment.id}</p>
                              <p className="text-xs text-muted-foreground">PO: {shipment.poNumber}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {shipment.supplier}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <Truck className="h-4 w-4 text-muted-foreground mr-2" />
                                {shipment.expected}
                              </div>
                              <p className="text-xs text-muted-foreground">{shipment.items} items</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <StatusBadge 
                                status={
                                  shipment.status === 'Arrived' ? 'success' : 
                                  shipment.status === 'In Transit' ? 'info' : 
                                  'neutral'
                                } 
                                label={shipment.status} 
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <button 
                                className={cn(
                                  "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                  shipment.status === 'Arrived' 
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                    : "bg-muted text-muted-foreground"
                                )}
                                disabled={shipment.status !== 'Arrived'}
                              >
                                Process
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Shipment Details
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Supplier
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Received
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Allocation
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {processedShipments.map((shipment) => (
                          <tr key={shipment.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-medium text-sm">{shipment.id}</p>
                              <p className="text-xs text-muted-foreground">By: {shipment.completedBy}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {shipment.supplier}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <Package className="h-4 w-4 text-muted-foreground mr-2" />
                                {shipment.received}
                              </div>
                              <p className="text-xs text-muted-foreground">{shipment.items} items</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center space-x-1 text-xs">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                                  <PackageCheck className="h-3 w-3 mr-1" />
                                  {shipment.flowThrough} flow
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted font-medium">
                                  <Store className="h-3 w-3 mr-1" />
                                  {shipment.storage} store
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${(shipment.flowThrough / shipment.items) * 100}%` }} 
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <button className="inline-flex items-center px-3 py-1 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/70 transition-colors">
                                <ListChecks className="h-3 w-3 mr-1" />
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Receiving;
