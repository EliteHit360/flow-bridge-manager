
import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';

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
  
  return data;
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
  
  return data;
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
    error: shipmentsError 
  } = useQuery({
    queryKey: ['inbound-shipments'],
    queryFn: fetchInboundShipments
  });

  // Query for capacity constraints
  const { 
    data: capacityConstraints, 
    isLoading: isLoadingConstraints, 
    error: constraintsError 
  } = useQuery({
    queryKey: ['capacity-constraints'],
    queryFn: fetchCapacityConstraints
  });

  return (
    <PageLayout>
      <PageTitle 
        title="Data Tables" 
        subtitle="View and explore warehouse data from Supabase" 
      />

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
                  <span>Error loading inbound shipments data</span>
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
                  <span>Error loading capacity constraints data</span>
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
