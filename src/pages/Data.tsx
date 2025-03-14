
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import PageTitle from '@/components/common/PageTitle';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Sample data for demonstration if no real data exists
const sampleInboundShipments = [
  {
    inbound_id: 'INB001',
    sku_code: 'SKU123',
    quantity: 100,
    date_created: new Date().toISOString(),
    inbound_eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location_to: 'Warehouse A',
    location_from: 'Supplier X',
    status: 'In Transit',
    flow_eligible: true,
    unit_of_measure: 'units',
    description: 'Regular shipment',
    notes: 'Expected on time'
  },
  {
    inbound_id: 'INB002',
    sku_code: 'SKU456',
    quantity: 50,
    date_created: new Date().toISOString(),
    inbound_eta: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location_to: 'Warehouse B',
    location_from: 'Supplier Y',
    status: 'Scheduled',
    flow_eligible: false,
    unit_of_measure: 'cartons',
    description: 'Expedited shipment',
    notes: 'High priority'
  }
];

const sampleCapacityConstraints = [
  {
    constraint_id: 'CAP001',
    constraint_type: 'Storage',
    location_code: 'Warehouse A',
    capacity_value: 1000,
    unit_of_measure: 'pallets',
    date_effective: new Date().toISOString(),
    notes: 'Maximum storage capacity'
  },
  {
    constraint_id: 'CAP002',
    constraint_type: 'Processing',
    location_code: 'Warehouse B',
    capacity_value: 500,
    unit_of_measure: 'items/hour',
    date_effective: new Date().toISOString(),
    notes: 'Maximum processing rate'
  }
];

// Function to insert sample data
const insertSampleData = async () => {
  try {
    // Check if tables are empty
    const { data: existingShipments } = await supabase
      .from('Inbound_Shipments')
      .select('inbound_id')
      .limit(1);
      
    const { data: existingConstraints } = await supabase
      .from('Capacity_Constraints')
      .select('constraint_id')
      .limit(1);

    // If no shipments data exists, insert sample shipments
    if (!existingShipments || existingShipments.length === 0) {
      for (const shipment of sampleInboundShipments) {
        await supabase
          .from('Inbound_Shipments')
          .insert(shipment);
      }
      console.log('Sample inbound shipments data inserted');
    }

    // If no constraints data exists, insert sample constraints
    if (!existingConstraints || existingConstraints.length === 0) {
      for (const constraint of sampleCapacityConstraints) {
        await supabase
          .from('Capacity_Constraints')
          .insert(constraint);
      }
      console.log('Sample capacity constraints data inserted');
    }

    return { shipmentsAdded: !existingShipments?.length, constraintsAdded: !existingConstraints?.length };
  } catch (error) {
    console.error('Error inserting sample data:', error);
    return { error };
  }
};

// Function to fetch inbound shipments
const fetchInboundShipments = async () => {
  const { data, error } = await supabase
    .from('Inbound_Shipments')
    .select('*')
    .order('date_created', { ascending: false });
  
  if (error) {
    console.error('Error fetching inbound shipments:', error);
    throw error;
  }
  
  return data || [];
};

// Function to fetch capacity constraints
const fetchCapacityConstraints = async () => {
  const { data, error } = await supabase
    .from('Capacity_Constraints')
    .select('*')
    .order('date_effective', { ascending: false });
  
  if (error) {
    console.error('Error fetching capacity constraints:', error);
    throw error;
  }
  
  return data || [];
};

// Format the date in a readable format
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const Data: React.FC = () => {
  // Query for inbound shipments
  const { 
    data: inboundShipments, 
    isLoading: isLoadingShipments, 
    error: shipmentsError,
    refetch: refetchShipments
  } = useQuery({
    queryKey: ['inbound-shipments'],
    queryFn: fetchInboundShipments
  });

  // Query for capacity constraints
  const { 
    data: capacityConstraints, 
    isLoading: isLoadingConstraints, 
    error: constraintsError,
    refetch: refetchConstraints
  } = useQuery({
    queryKey: ['capacity-constraints'],
    queryFn: fetchCapacityConstraints
  });

  // Check if data exists and seed if necessary
  useEffect(() => {
    const checkAndSeedData = async () => {
      // If queries are done loading and no data was found
      if (!isLoadingShipments && !isLoadingConstraints && 
          (!inboundShipments?.length || !capacityConstraints?.length)) {
        
        const { shipmentsAdded, constraintsAdded, error } = await insertSampleData();
        
        if (error) {
          toast.error('Could not add sample data');
        } else {
          if (shipmentsAdded || constraintsAdded) {
            toast.success('Sample data added for demonstration');
            // Refetch data to show the newly added samples
            refetchShipments();
            refetchConstraints();
          }
        }
      }
    };
    
    checkAndSeedData();
  }, [isLoadingShipments, isLoadingConstraints, inboundShipments, capacityConstraints, refetchShipments, refetchConstraints]);

  const handleRefresh = () => {
    refetchShipments();
    refetchConstraints();
    toast.info('Refreshing data...');
  };

  return (
    <PageLayout>
      <PageTitle 
        title="Data Tables" 
        subtitle="View and explore warehouse data from Supabase" 
      />

      <div className="mb-6 flex justify-end">
        <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="inbound-shipments" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="inbound-shipments">Inbound Shipments</TabsTrigger>
          <TabsTrigger value="capacity-constraints">Capacity Constraints</TabsTrigger>
        </TabsList>

        <TabsContent value="inbound-shipments">
          <Card>
            <CardHeader>
              <CardTitle>Inbound Shipments</CardTitle>
              <CardDescription>
                All inbound shipments in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {shipmentsError ? (
                <div className="flex items-center gap-2 p-4 text-red-500 bg-red-50 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error loading inbound shipments data: {shipmentsError.message}</span>
                </div>
              ) : isLoadingShipments ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>To Location</TableHead>
                        <TableHead>From Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Flow Eligible</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inboundShipments && inboundShipments.length > 0 ? (
                        inboundShipments.map((shipment) => (
                          <TableRow key={shipment.inbound_id}>
                            <TableCell className="font-medium">{shipment.inbound_id}</TableCell>
                            <TableCell>{shipment.sku_code || 'N/A'}</TableCell>
                            <TableCell>{shipment.quantity || 'N/A'} {shipment.unit_of_measure || ''}</TableCell>
                            <TableCell>{formatDate(shipment.date_created)}</TableCell>
                            <TableCell>{formatDate(shipment.inbound_eta)}</TableCell>
                            <TableCell>{shipment.location_to || 'N/A'}</TableCell>
                            <TableCell>{shipment.location_from || 'N/A'}</TableCell>
                            <TableCell>{shipment.status || 'N/A'}</TableCell>
                            <TableCell>{shipment.flow_eligible ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                            No inbound shipments found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity-constraints">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Constraints</CardTitle>
              <CardDescription>
                Warehouse capacity constraints and limitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {constraintsError ? (
                <div className="flex items-center gap-2 p-4 text-red-500 bg-red-50 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error loading capacity constraints data: {constraintsError.message}</span>
                </div>
              ) : isLoadingConstraints ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {capacityConstraints && capacityConstraints.length > 0 ? (
                        capacityConstraints.map((constraint) => (
                          <TableRow key={constraint.constraint_id}>
                            <TableCell className="font-medium">{constraint.constraint_id}</TableCell>
                            <TableCell>{constraint.constraint_type || 'N/A'}</TableCell>
                            <TableCell>{constraint.location_code || 'N/A'}</TableCell>
                            <TableCell>{constraint.capacity_value || 'N/A'}</TableCell>
                            <TableCell>{constraint.unit_of_measure || 'N/A'}</TableCell>
                            <TableCell>{formatDate(constraint.date_effective)}</TableCell>
                            <TableCell>{constraint.notes || 'N/A'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No capacity constraints found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Data;
