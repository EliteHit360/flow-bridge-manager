
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
  showDot?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  className,
  showDot = true
}) => {
  const statusClasses = {
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-destructive/10 text-destructive border border-destructive/20",
    info: "bg-primary/10 text-primary border border-primary/20",
    neutral: "bg-muted text-muted-foreground border border-muted-foreground/30",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", 
      statusClasses[status], 
      className
    )}>
      {showDot && (
        <span 
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5", 
            status === 'success' && "bg-success",
            status === 'warning' && "bg-warning",
            status === 'error' && "bg-destructive",
            status === 'info' && "bg-primary",
            status === 'neutral' && "bg-muted-foreground"
          )}
        />
      )}
      {label}
    </span>
  );
};

export default StatusBadge;
