
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  actions?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className, actions }) => {
  return (
    <div className={cn("mb-8 animate-in flex items-center justify-between", className)}>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-muted-foreground text-balance">{subtitle}</p>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageTitle;
