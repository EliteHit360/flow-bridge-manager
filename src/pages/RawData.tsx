
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

// Function to fetch SKU Master data
const fetchSkuMaster = async () => {
  try {
    const { data, error } = await supabase
      .from('SKU_Master')
      .select('*')
      .order('sku_code', { ascending: true });
    
    if (error) {
      console.error('Error fetching SKU master data:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch SKU master data:', error);
    throw error;
  }
};

// Function to fetch Store Orders
const fetchStoreOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('Store_Orders')
      .select('*')
      .order('date_created', { ascending: false });
    
    if (error) {
      console.error('Error fetching store orders:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch store orders:', error);
    throw error;
  }
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

const RawData: React.FC = () => {
  // Query for SKU Master data
  const { 
    data: skuMasterData, 
    isLoading: isLoadingSkuMaster, 
    error: skuMasterError,
    refetch: refetchSkuMaster
  } = useQuery({
    queryKey: ['sku-master'],
    queryFn: fetchSkuMaster
  });

  // Query for Store Orders
  const { 
    data: storeOrders, 
    isLoading: isLoadingStoreOrders, 
    error: storeOrdersError,
    refetch: refetchStoreOrders
  } = useQuery({
    queryKey: ['store-orders'],
    queryFn: fetchStoreOrders
  });

  useEffect(() => {
    // Check if there's data from Supabase
    if (skuMasterData?.length || storeOrders?.length) {
      toast.success('Successfully loaded raw data from Supabase');
    }
  }, [skuMasterData, storeOrders]);

  const handleRefresh = () => {
    refetchSkuMaster();
    refetchStoreOrders();
    toast.info('Refreshing data...');
  };

  return (
    <PageLayout>
      <PageTitle 
        title="Raw Data" 
        subtitle="View SKU Master and Store Orders data from Supabase" 
      />

      <div className="mb-6 flex justify-end">
        <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="sku-master" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="sku-master">SKU Master</TabsTrigger>
          <TabsTrigger value="store-orders">Store Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="sku-master">
          <Card>
            <CardHeader>
              <CardTitle>SKU Master</CardTitle>
              <CardDescription>
                Product catalog and SKU information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {skuMasterError ? (
                <div className="flex items-center gap-2 p-4 text-red-500 bg-red-50 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error loading SKU data: {(skuMasterError as Error).message}</span>
                </div>
              ) : isLoadingSkuMaster ? (
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
                        <TableHead>SKU Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Dimensions</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Flow Eligible</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {skuMasterData && skuMasterData.length > 0 ? (
                        skuMasterData.map((sku) => (
                          <TableRow key={sku.sku_code}>
                            <TableCell className="font-medium">{sku.sku_code}</TableCell>
                            <TableCell>{sku.description || 'N/A'}</TableCell>
                            <TableCell>{sku.category || 'N/A'}</TableCell>
                            <TableCell>{sku.dimensions || 'N/A'}</TableCell>
                            <TableCell>{formatDate(sku.date_added)}</TableCell>
                            <TableCell>{sku.unit_of_measure || 'N/A'}</TableCell>
                            <TableCell>{sku.flow_eligible ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{sku.notes || 'N/A'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No SKU data found
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

        <TabsContent value="store-orders">
          <Card>
            <CardHeader>
              <CardTitle>Store Orders</CardTitle>
              <CardDescription>
                All store orders in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {storeOrdersError ? (
                <div className="flex items-center gap-2 p-4 text-red-500 bg-red-50 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error loading store orders data: {(storeOrdersError as Error).message}</span>
                </div>
              ) : isLoadingStoreOrders ? (
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
                        <TableHead>Order ID</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>To Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Flow Eligible</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storeOrders && storeOrders.length > 0 ? (
                        storeOrders.map((order) => (
                          <TableRow key={order.order_id}>
                            <TableCell className="font-medium">{order.order_id}</TableCell>
                            <TableCell>{order.sku_code || 'N/A'}</TableCell>
                            <TableCell>{order.quantity || 'N/A'}</TableCell>
                            <TableCell>{formatDate(order.date_created)}</TableCell>
                            <TableCell>{formatDate(order.due_date)}</TableCell>
                            <TableCell>{order.location_to || 'N/A'}</TableCell>
                            <TableCell>{order.status || 'N/A'}</TableCell>
                            <TableCell>{order.priority_level || 'N/A'}</TableCell>
                            <TableCell>{order.flow_eligible ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                            No store orders found
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

export default RawData;
