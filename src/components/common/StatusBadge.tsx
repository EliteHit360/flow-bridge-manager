
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
    success: "status-badge-success",
    warning: "status-badge-warning",
    error: "status-badge-error",
    info: "status-badge-info",
    neutral: "bg-muted text-muted-foreground border border-muted-foreground/30",
  };

  return (
    <span className={cn("status-badge", statusClasses[status], className)}>
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
