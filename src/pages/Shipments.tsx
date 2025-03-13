
import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  CircleDashed, 
  Boxes
} from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Mock data for shipments
const mockShipments = [
  {
    id: 'TRK-3821',
    route: 'Northern Route #28',
    status: 'Loading',
    departureTime: '01:30 PM',
    departureDate: 'Today',
    stores: [
      { id: 'ST-103', name: 'Downtown Store', packages: 36 },
      { id: 'ST-108', name: 'Westside Mall', packages: 42 },
    ],
    capacity: {
      used: 78,
      total: 120,
      weight: '860 kg',
      volume: '8.2 m³',
    },
    driver: 'Michael Chen',
    carrier: 'Express Logistics',
    scannedItems: 65,
    totalItems: 78,
  },
  {
    id: 'TRK-3822',
    route: 'Southern Route #14',
    status: 'Scheduled',
    departureTime: '03:15 PM',
    departureDate: 'Today',
    stores: [
      { id: 'ST-110', name: 'Harbor Plaza', packages: 28 },
      { id: 'ST-115', name: 'Southgate Center', packages: 34 },
      { id: 'ST-118', name: 'Riverside Mall', packages: 22 },
    ],
    capacity: {
      used: 84,
      total: 150,
      weight: '940 kg',
      volume: '9.8 m³',
    },
    driver: 'Sarah Johnson',
    carrier: 'Rapid Transport',
    scannedItems: 0,
    totalItems: 84,
  },
  {
    id: 'TRK-3819',
    route: 'Eastern Route #42',
    status: 'Departed',
    departureTime: '11:00 AM',
    departureDate: 'Today',
    stores: [
      { id: 'ST-122', name: 'Eastside Plaza', packages: 45 },
      { id: 'ST-125', name: 'Central Market', packages: 30 },
    ],
    capacity: {
      used: 75,
      total: 120,
      weight: '820 kg',
      volume: '7.8 m³',
    },
    driver: 'David Wilson',
    carrier: 'Alliance Shipping',
    scannedItems: 75,
    totalItems: 75,
  },
  {
    id: 'TRK-3818',
    route: 'Western Route #19',
    status: 'Departed',
    departureTime: '09:45 AM',
    departureDate: 'Today',
    stores: [
      { id: 'ST-130', name: 'Westview Center', packages: 38 },
      { id: 'ST-133', name: 'Pacific Mall', packages: 42 },
      { id: 'ST-135', name: 'Coastal Plaza', packages: 20 },
    ],
    capacity: {
      used: 100,
      total: 120,
      weight: '1100 kg',
      volume: '10.5 m³',
    },
    driver: 'Jennifer Lee',
    carrier: 'Coastal Transport',
    scannedItems: 100,
    totalItems: 100,
  },
  {
    id: 'TRK-3825',
    route: 'Northern Route #30',
    status: 'Scheduled',
    departureTime: '10:15 AM',
    departureDate: 'Tomorrow',
    stores: [
      { id: 'ST-140', name: 'Northgate Mall', packages: 45 },
      { id: 'ST-142', name: 'Highland Center', packages: 38 },
    ],
    capacity: {
      used: 83,
      total: 150,
      weight: '920 kg',
      volume: '8.9 m³',
    },
    driver: 'Robert Brown',
    carrier: 'Express Logistics',
    scannedItems: 0,
    totalItems: 83,
  },
];

// Filter options for the shipments
const filterOptions = [
  { label: 'All Shipments', value: 'all' },
  { label: 'Loading', value: 'loading' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Departed', value: 'departed' },
];

const Shipments = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<typeof mockShipments[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter shipments based on active filter and search query
  const filteredShipments = mockShipments.filter((shipment) => {
    // Filter by status
    if (activeFilter !== 'all' && shipment.status.toLowerCase() !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        shipment.id.toLowerCase().includes(query) ||
        shipment.route.toLowerCase().includes(query) ||
        shipment.driver.toLowerCase().includes(query) ||
        shipment.carrier.toLowerCase().includes(query) ||
        shipment.stores.some(store => 
          store.id.toLowerCase().includes(query) || 
          store.name.toLowerCase().includes(query)
        )
      );
    }
    
    return true;
  });

  const handleShipmentSelect = (shipment: typeof mockShipments[0]) => {
    setSelectedShipment(shipment);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-6">
          <PageTitle 
            title="Shipments & Load Management" 
            subtitle="Monitor outbound shipments, truck capacity, and loading status"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 bg-card rounded-xl border shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Outbound Shipments</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="search"
                      placeholder="Search shipments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 w-[200px] md:w-[250px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="flex border-b mb-4">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                      activeFilter === option.value
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setActiveFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Route & Stores</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Departure
                          <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No shipments found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredShipments.map((shipment) => (
                        <TableRow 
                          key={shipment.id} 
                          className={cn(
                            "cursor-pointer hover:bg-muted/50 transition-colors",
                            selectedShipment?.id === shipment.id && "bg-muted/50"
                          )}
                          onClick={() => handleShipmentSelect(shipment)}
                        >
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{shipment.route}</p>
                              <p className="text-xs text-muted-foreground">
                                {shipment.stores.length} store{shipment.stores.length > 1 ? 's' : ''}, {shipment.totalItems} items
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-1.5" />
                              <span className="mr-2">{shipment.departureDate}</span>
                              <Clock className="h-4 w-4 text-muted-foreground mr-1.5" />
                              <span>{shipment.departureTime}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge 
                              status={
                                shipment.status === 'Loading' ? 'info' : 
                                shipment.status === 'Scheduled' ? 'neutral' : 
                                'success'
                              } 
                              label={shipment.status} 
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>{shipment.capacity.used}/{shipment.capacity.total} packages</span>
                                <span className="text-muted-foreground">{Math.round((shipment.capacity.used / shipment.capacity.total) * 100)}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full",
                                    (shipment.capacity.used / shipment.capacity.total) > 0.9 
                                      ? "bg-warning" 
                                      : "bg-primary"
                                  )}
                                  style={{ width: `${(shipment.capacity.used / shipment.capacity.total) * 100}%` }} 
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShipmentSelect(shipment);
                              }}
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="col-span-1 bg-card rounded-xl border shadow-sm p-4">
              {selectedShipment ? (
                <div className="animate-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Shipment Details</h3>
                    
                    <StatusBadge 
                      status={
                        selectedShipment.status === 'Loading' ? 'info' : 
                        selectedShipment.status === 'Scheduled' ? 'neutral' : 
                        'success'
                      } 
                      label={selectedShipment.status} 
                    />
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{selectedShipment.id}</h4>
                          <p className="text-sm text-muted-foreground">{selectedShipment.route}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Departure Time</p>
                          <p className="font-medium">{selectedShipment.departureDate}, {selectedShipment.departureTime}</p>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Carrier</p>
                          <p className="font-medium">{selectedShipment.carrier}</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-muted-foreground">Driver</p>
                        <p className="font-medium">{selectedShipment.driver}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Loading Progress</h4>
                      
                      {selectedShipment.status === 'Departed' ? (
                        <div className="bg-success/10 border border-success/30 rounded-lg p-3 mb-4 flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                          <div>
                            <p className="font-medium">Fully Loaded & Departed</p>
                            <p className="text-xs text-muted-foreground">All {selectedShipment.scannedItems} items scanned and loaded</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>
                              <span className="font-medium">{selectedShipment.scannedItems}</span> 
                              <span className="text-muted-foreground">/{selectedShipment.totalItems} items scanned</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {Math.round((selectedShipment.scannedItems / selectedShipment.totalItems) * 100)}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(selectedShipment.scannedItems / selectedShipment.totalItems) * 100}%` }} 
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Truck Capacity</p>
                          <p className="text-xs">
                            <span className="font-medium">{Math.round((selectedShipment.capacity.used / selectedShipment.capacity.total) * 100)}%</span> used
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Packages</p>
                            <p>{selectedShipment.capacity.used}/{selectedShipment.capacity.total}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Weight</p>
                            <p>{selectedShipment.capacity.weight}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Volume</p>
                            <p>{selectedShipment.capacity.volume}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Destination Stores</h4>
                      
                      <div className="space-y-2">
                        {selectedShipment.stores.map((store) => (
                          <div key={store.id} className="bg-muted/50 rounded-lg p-3 flex items-center">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Package className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{store.name}</p>
                              <p className="text-xs text-muted-foreground">{store.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{store.packages}</p>
                              <p className="text-xs text-muted-foreground">packages</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedShipment.status !== 'Departed' && (
                      <div className="pt-2">
                        <Button className="w-full">
                          {selectedShipment.status === 'Loading' ? (
                            <>
                              <CheckCircle2 className="mr-1" />
                              Mark Loading Complete
                            </>
                          ) : (
                            <>
                              <CircleDashed className="mr-1" />
                              Start Loading Process
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Boxes className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Shipment Selected</h3>
                  <p className="text-muted-foreground">
                    Select a shipment from the list to view details and loading status
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
              <h3 className="text-lg font-medium">Shipment Calendar & Planning</h3>
            </div>
            
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Shipment calendar and planning features will be available in a future update.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shipments;
