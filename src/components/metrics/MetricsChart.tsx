
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Sample data generator functions
const generateBarData = () => [
  { name: 'Apparel', value: 85, target: 90 },
  { name: 'Home Goods', value: 76, target: 80 },
  { name: 'Electronics', value: 65, target: 75 },
  { name: 'Groceries', value: 92, target: 85 },
  { name: 'Beauty', value: 78, target: 80 },
  { name: 'Toys', value: 68, target: 75 },
  { name: 'Sports', value: 81, target: 85 },
];

const generateLineData = () => [
  { name: 'Mon', value: 45, avg: 50 },
  { name: 'Tue', value: 52, avg: 50 },
  { name: 'Wed', value: 48, avg: 50 },
  { name: 'Thu', value: 38, avg: 50 },
  { name: 'Fri', value: 42, avg: 50 },
  { name: 'Sat', value: 35, avg: 50 },
  { name: 'Sun', value: 30, avg: 50 },
];

interface MetricsChartProps {
  title: string;
  subtitle?: string;
  type: 'bar' | 'line';
  className?: string;
  heightClass?: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({
  title,
  subtitle,
  type,
  className,
  heightClass = 'h-[300px]',
}) => {
  const [data, setData] = useState(type === 'bar' ? generateBarData() : generateLineData());
  const [chartLoaded, setChartLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("p-6 rounded-xl border bg-card shadow-sm", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className={cn(heightClass, "transition-opacity duration-500", !chartLoaded && "opacity-0")}>
        <ChartContainer
          config={{
            value: { theme: { light: "#9c27b0", dark: "#d05ce3" } },
            target: { theme: { light: "#e1bee7", dark: "#6a0080" } },
            avg: { theme: { light: "#e1bee7", dark: "#6a0080" } },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {type === 'bar' ? (
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                barSize={20}
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
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '10px' }}
                />
                <Bar 
                  dataKey="value" 
                  name="Actual" 
                  fill="var(--color-value)" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="target" 
                  name="Target" 
                  fill="var(--color-target)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            ) : (
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}m`} 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Dwell Time" 
                  stroke="var(--color-value)" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  name="Average" 
                  stroke="var(--color-avg)" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MetricsChart;
