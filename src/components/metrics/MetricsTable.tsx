
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/common/StatusBadge';

// Sample data
const metricsHistory = [
  {
    id: 1,
    date: '2023-06-01',
    flowThrough: 78.5,
    dwellTime: 42,
    fulfillment: 95.3,
    truckUtilization: 87.5,
    exceptions: 5,
    trend: 'increase',
  },
  {
    id: 2,
    date: '2023-05-24',
    flowThrough: 75.2,
    dwellTime: 48,
    fulfillment: 93.8,
    truckUtilization: 85.1,
    exceptions: 7,
    trend: 'neutral',
  },
  {
    id: 3,
    date: '2023-05-17',
    flowThrough: 73.8,
    dwellTime: 52,
    fulfillment: 92.5,
    truckUtilization: 84.2,
    exceptions: 9,
    trend: 'decrease',
  },
  {
    id: 4,
    date: '2023-05-10',
    flowThrough: 76.1,
    dwellTime: 50,
    fulfillment: 94.0,
    truckUtilization: 86.3,
    exceptions: 6,
    trend: 'increase',
  },
  {
    id: 5,
    date: '2023-05-03',
    flowThrough: 74.0,
    dwellTime: 54,
    fulfillment: 91.2,
    truckUtilization: 83.8,
    exceptions: 10,
    trend: 'neutral',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

const MetricsTable = () => {
  return (
    <div>
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="text-lg font-medium">Historical Performance</h3>
        <Button variant="outline" size="sm">Export Data</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Flow-Through %
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Dwell Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Fulfillment
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Truck Utilization
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Exceptions
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metricsHistory.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{formatDate(row.date)}</TableCell>
              <TableCell>{row.flowThrough.toFixed(1)}%</TableCell>
              <TableCell>{row.dwellTime} min</TableCell>
              <TableCell>{row.fulfillment.toFixed(1)}%</TableCell>
              <TableCell>{row.truckUtilization.toFixed(1)}%</TableCell>
              <TableCell>{row.exceptions}</TableCell>
              <TableCell>
                <StatusBadge 
                  status={
                    row.trend === 'increase' ? 'success' : 
                    row.trend === 'decrease' ? 'warning' : 
                    'neutral'
                  }
                  label={
                    row.trend === 'increase' ? 'Improving' : 
                    row.trend === 'decrease' ? 'Declining' : 
                    'Stable'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MetricsTable;
