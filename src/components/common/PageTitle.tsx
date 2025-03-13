
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn("mb-8 animate-in", className)}>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-balance">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
