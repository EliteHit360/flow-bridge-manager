
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data for the chart
const generateData = () => [
  { name: 'SKU-001', flowThrough: 85, storage: 15 },
  { name: 'SKU-002', flowThrough: 62, storage: 38 },
  { name: 'SKU-003', flowThrough: 73, storage: 27 },
  { name: 'SKU-004', flowThrough: 92, storage: 8 },
  { name: 'SKU-005', flowThrough: 54, storage: 46 },
  { name: 'SKU-006', flowThrough: 78, storage: 22 },
  { name: 'SKU-007', flowThrough: 88, storage: 12 },
];

interface AllocationChartProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const AllocationChart: React.FC<AllocationChartProps> = ({
  className,
  title = "Allocation Distribution by SKU",
  subtitle = "Flow-through vs. storage allocation percentages"
}) => {
  const [data, setData] = useState(generateData());
  const [chartLoaded, setChartLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("p-6 rounded-xl border bg-card shadow-sm chart-container", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className={cn("h-[300px] transition-opacity duration-500", !chartLoaded && "opacity-0")}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            barSize={20}
            stackOffset="expand"
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`} 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, undefined]}
              contentStyle={{ 
                borderRadius: 8, 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e2e8f0' 
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            <Bar 
              dataKey="flowThrough" 
              name="Flow-Through" 
              stackId="a" 
              fill="#9c27b0" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="storage" 
              name="Storage" 
              stackId="a" 
              fill="#e1bee7" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AllocationChart;
