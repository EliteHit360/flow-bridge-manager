
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  subtitle?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  className,
  change,
  subtitle,
}) => {
  return (
    <div className={cn(
      "p-6 rounded-xl border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-md",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-1 text-xs">
              {change.type === 'increase' ? (
                <ArrowUp className="h-3 w-3 text-success mr-1" />
              ) : change.type === 'decrease' ? (
                <ArrowDown className="h-3 w-3 text-destructive mr-1" />
              ) : (
                <Minus className="h-3 w-3 text-muted-foreground mr-1" />
              )}
              
              <span
                className={cn(
                  "font-medium",
                  change.type === 'increase' && "text-success",
                  change.type === 'decrease' && "text-destructive",
                  change.type === 'neutral' && "text-muted-foreground"
                )}
              >
                {Math.abs(change.value)}%
              </span>
              <span className="ml-1 text-muted-foreground">from last period</span>
            </div>
          )}
          
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
