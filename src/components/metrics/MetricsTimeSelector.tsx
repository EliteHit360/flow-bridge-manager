
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MetricsTimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MetricsTimeSelector: React.FC<MetricsTimeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div className="flex items-center">
        <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
        <span className="text-sm font-medium">Time Range:</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant={value === 'day' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChange('day')}
        >
          Today
        </Button>
        <Button 
          variant={value === 'week' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChange('week')}
        >
          This Week
        </Button>
        <Button 
          variant={value === 'month' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChange('month')}
        >
          This Month
        </Button>
      </div>
      
      <div className="ml-auto">
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Compare with" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="previous">Previous Period</SelectItem>
            <SelectItem value="target">Target</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MetricsTimeSelector;
