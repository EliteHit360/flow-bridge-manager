
import React, { useState } from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  Search, 
  ArrowUpDown, 
  ChevronRight,
  Tag,
  CheckCircle2,
  PackageX,
  Package
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

// Mock data for exceptions
const mockExceptions = [
  {
    id: 'EX-1847',
    type: 'Quantity Variance',
    status: 'Open',
    priority: 'High',
    timestamp: '10:30 AM',
    details: {
      shipmentId: 'SH-3847',
      poNumber: 'PO-58721',
      description: 'Received quantity less than expected: SKU #A10293 (Premium Widget)',
      expected: 24,
      received: 18,
      difference: -6,
      impact: 'Partial allocation to Store #ST-103, missing 6 units',
      suggestedAction: 'Adjust store allocation or contact supplier for shortage claim'
    }
  },
  {
    id: 'EX-1848',
    type: 'Damaged Items',
    status: 'Open',
    priority: 'Medium',
    timestamp: '11:45 AM',
    details: {
      shipmentId: 'SH-3848',
      poNumber: 'PO-58734',
      description: 'Received damaged goods: SKU #B20157 (Deluxe Gadget)',
      expected: 12,
      damaged: 3,
      usable: 9,
      impact: 'Reduced allocation to Store #ST-115, QA check required',
      suggestedAction: 'Process return for damaged items, allocate usable units'
    }
  },
  {
    id: 'EX-1849',
    type: 'Missing Documentation',
    status: 'Open',
    priority: 'Low',
    timestamp: '01:15 PM',
    details: {
      shipmentId: 'SH-3850',
      poNumber: 'Unknown',
      description: 'Inbound shipment missing proper documentation',
      impact: 'Cannot process receipt without PO verification',
      suggestedAction: 'Contact supplier for proper documentation or verify against system records'
    }
  },
  {
    id: 'EX-1845',
    type: 'Allocation Failure',
    status: 'Resolved',
    priority: 'High',
    timestamp: 'Yesterday, 02:30 PM',
    resolvedBy: 'Emma S.',
    resolution: 'Updated store demand data and successfully reallocated',
    details: {
      shipmentId: 'SH-3845',
      poNumber: 'PO-58710',
      description: 'System failed to allocate SKU #C30281 despite available demand',
      impact: 'Delayed cross-dock processing for 2 hours',
      originalAction: 'Investigate store demand data inconsistency'
    }
  },
  {
    id: 'EX-1846',
    type: 'Incorrect SKU',
    status: 'Resolved',
    priority: 'Medium',
    timestamp: 'Yesterday, 04:45 PM',
    resolvedBy: 'John D.',
    resolution: 'Corrected SKU in system and properly allocated',
    details: {
      shipmentId: 'SH-3846',
      poNumber: 'PO-58712',
      description: 'Supplier shipped SKU #D40372 but ASN listed #D40375',
      impact: 'Manual verification required',
      originalAction: 'Update system with correct SKU information'
    }
  }
];

// Filter options for the exceptions
const filterOptions = [
  { label: 'All Exceptions', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' }
];

// Priority options for sorting
const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };

const Exceptions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedException, setSelectedException] = useState<typeof mockExceptions[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');

  // Filter exceptions based on active filter and search query
  const filteredExceptions = mockExceptions.filter((exception) => {
    // Filter by status
    if (activeFilter !== 'all' && exception.status.toLowerCase() !== activeFilter.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        exception.id.toLowerCase().includes(query) ||
        exception.type.toLowerCase().includes(query) ||
        exception.details.shipmentId?.toLowerCase().includes(query) ||
        exception.details.poNumber?.toLowerCase().includes(query) ||
        exception.details.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Sort exceptions by status and priority
  const sortedExceptions = [...filteredExceptions].sort((a, b) => {
    // First sort by status (Open first)
    if (a.status !== b.status) {
      return a.status === 'Open' ? -1 : 1;
    }
    
    // Then sort by priority
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  const handleExceptionSelect = (exception: typeof mockExceptions[0]) => {
    setSelectedException(exception);
    setResolutionNote('');
  };

  const handleResolveException = () => {
    // In a real app, this would call an API to update the exception
    console.log('Resolving exception:', selectedException?.id);
    console.log('Resolution note:', resolutionNote);
    
    // For demo purposes, show success message and clear selection
    setSelectedException(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-6">
          <PageTitle 
            title="Exceptions Management" 
            subtitle="Monitor and resolve flow-through exceptions and issues"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-card rounded-xl border shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Exception Queue</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="search"
                      placeholder="Search exceptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 w-[200px] md:w-[250px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
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
                      <TableHead className="w-[90px]">ID</TableHead>
                      <TableHead>Exception</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Priority
                          <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Time
                          <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedExceptions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No exceptions found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedExceptions.map((exception) => (
                        <TableRow 
                          key={exception.id} 
                          className={cn(
                            "cursor-pointer hover:bg-muted/50 transition-colors",
                            selectedException?.id === exception.id && "bg-muted/50"
                          )}
                          onClick={() => handleExceptionSelect(exception)}
                        >
                          <TableCell className="font-medium">{exception.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{exception.type}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[240px]">
                                {exception.details.shipmentId && `${exception.details.shipmentId} - `}
                                {exception.details.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge 
                              status={
                                exception.priority === 'High' ? 'error' : 
                                exception.priority === 'Medium' ? 'warning' : 
                                'info'
                              } 
                              label={exception.priority} 
                              showDot={true}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-1.5" />
                              <span>{exception.timestamp}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge 
                              status={exception.status === 'Open' ? 'warning' : 'success'} 
                              label={exception.status} 
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExceptionSelect(exception);
                              }}
                            >
                              <ChevronRight className="h-4 w-4" />
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
              {selectedException ? (
                <div className="animate-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium">Exception Details</h3>
                    </div>
                    
                    <StatusBadge 
                      status={selectedException.status === 'Open' ? 'warning' : 'success'} 
                      label={selectedException.status} 
                    />
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={cn(
                          "h-12 w-12 rounded-full flex items-center justify-center",
                          selectedException.priority === 'High' ? "bg-destructive/10" : 
                          selectedException.priority === 'Medium' ? "bg-warning/10" : 
                          "bg-primary/10"
                        )}>
                          <AlertTriangle className={cn(
                            "h-6 w-6",
                            selectedException.priority === 'High' ? "text-destructive" : 
                            selectedException.priority === 'Medium' ? "text-warning" : 
                            "text-primary"
                          )} />
                        </div>
                        <div>
                          <h4 className="font-medium">{selectedException.id}</h4>
                          <p className="text-sm text-muted-foreground">{selectedException.type}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Time Reported</p>
                          <p className="font-medium">{selectedException.timestamp}</p>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Priority</p>
                          <p className="font-medium">{selectedException.priority}</p>
                        </div>
                      </div>
                      
                      {selectedException.resolvedBy && (
                        <div className="bg-success/10 border border-success/30 rounded-lg p-3 mb-4">
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-success mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">Resolved by {selectedException.resolvedBy}</p>
                              <p className="text-sm">{selectedException.resolution}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Exception Information</h4>
                      
                      <div className="bg-muted/50 rounded-lg p-3 mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Description</p>
                        <p className="text-sm">{selectedException.details.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {selectedException.details.shipmentId && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Shipment ID</p>
                            <p className="font-medium">{selectedException.details.shipmentId}</p>
                          </div>
                        )}
                        
                        {selectedException.details.poNumber && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">PO Number</p>
                            <p className="font-medium">{selectedException.details.poNumber}</p>
                          </div>
                        )}
                      </div>
                      
                      {(selectedException.details.expected !== undefined || 
                        selectedException.details.received !== undefined || 
                        selectedException.details.damaged !== undefined) && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-muted-foreground mb-2">Quantity Information</p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            {selectedException.details.expected !== undefined && (
                              <div>
                                <p className="text-xs text-muted-foreground">Expected</p>
                                <p className="font-medium">{selectedException.details.expected}</p>
                              </div>
                            )}
                            
                            {selectedException.details.received !== undefined && (
                              <div>
                                <p className="text-xs text-muted-foreground">Received</p>
                                <p className="font-medium">{selectedException.details.received}</p>
                              </div>
                            )}
                            
                            {selectedException.details.difference !== undefined && (
                              <div>
                                <p className="text-xs text-muted-foreground">Difference</p>
                                <p className={cn(
                                  "font-medium",
                                  selectedException.details.difference < 0 ? "text-destructive" : "text-success"
                                )}>
                                  {selectedException.details.difference > 0 ? '+' : ''}
                                  {selectedException.details.difference}
                                </p>
                              </div>
                            )}
                            
                            {selectedException.details.damaged !== undefined && (
                              <div>
                                <p className="text-xs text-muted-foreground">Damaged</p>
                                <p className="font-medium text-destructive">{selectedException.details.damaged}</p>
                              </div>
                            )}
                            
                            {selectedException.details.usable !== undefined && (
                              <div>
                                <p className="text-xs text-muted-foreground">Usable</p>
                                <p className="font-medium">{selectedException.details.usable}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 mb-3">
                        <div className="flex">
                          <Tag className="h-5 w-5 text-warning mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Business Impact</p>
                            <p className="text-sm">{selectedException.details.impact}</p>
                          </div>
                        </div>
                      </div>
                      
                      {selectedException.details.suggestedAction && (
                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                          <p className="text-sm font-medium mb-1">Suggested Action</p>
                          <p className="text-sm">{selectedException.details.suggestedAction}</p>
                        </div>
                      )}
                      
                      {selectedException.status === 'Open' && (
                        <div className="mt-5">
                          <label className="block text-sm font-medium mb-2">
                            Resolution Notes
                          </label>
                          <textarea
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Enter resolution details..."
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                          />
                          
                          <div className="flex justify-end mt-3">
                            <Button 
                              className="w-full"
                              onClick={handleResolveException}
                              disabled={!resolutionNote.trim()}
                            >
                              <CheckCircle2 className="mr-1" />
                              Mark as Resolved
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <PackageX className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Exception Selected</h3>
                  <p className="text-muted-foreground">
                    Select an exception from the list to view details and take action
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Exceptions;
