
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FlowThroughPercentageProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
}

const FlowThroughPercentage: React.FC<FlowThroughPercentageProps> = ({
  percentage,
  size = 'md',
  className,
  showLabel = true,
  animate = true,
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  
  // Animation effect
  useEffect(() => {
    if (!animate) {
      setDisplayPercentage(percentage);
      return;
    }
    
    let start = 0;
    const end = percentage;
    const duration = 1500;
    const startTime = performance.now();
    
    const updatePercentage = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.round(progress * end);
      
      setDisplayPercentage(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updatePercentage);
      }
    };
    
    requestAnimationFrame(updatePercentage);
  }, [percentage, animate]);
  
  // Size configurations
  const sizeClasses = {
    sm: {
      container: "h-20 w-20",
      circle: "h-16 w-16",
      text: "text-lg",
      label: "text-xs mt-1",
    },
    md: {
      container: "h-32 w-32",
      circle: "h-28 w-28",
      text: "text-2xl",
      label: "text-sm mt-2",
    },
    lg: {
      container: "h-40 w-40",
      circle: "h-36 w-36",
      text: "text-3xl",
      label: "text-base mt-2",
    },
  };
  
  // Calculate the circle properties
  const radius = size === 'sm' ? 30 : size === 'md' ? 52 : 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;
  
  const gradientColors = {
    low: [
      { offset: "0%", color: "#ef4444" }, // red
      { offset: "100%", color: "#f97316" }, // orange
    ],
    medium: [
      { offset: "0%", color: "#f97316" }, // orange
      { offset: "100%", color: "#22c55e" }, // green
    ],
    high: [
      { offset: "0%", color: "#22c55e" }, // green
      { offset: "100%", color: "#0ea5e9" }, // blue
    ],
  };
  
  const getGradientColors = () => {
    if (percentage < 40) return gradientColors.low;
    if (percentage < 75) return gradientColors.medium;
    return gradientColors.high;
  };
  
  const gradientId = `flow-through-gradient-${size}`;
  
  return (
    <div className={cn("flex flex-col items-center justify-center", sizeClasses[size].container, className)}>
      <div className="relative flex-center">
        <svg className={cn("transform -rotate-90", sizeClasses[size].circle)} viewBox={`0 0 ${radius * 2 + 8} ${radius * 2 + 8}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {getGradientColors().map((stop, index) => (
                <stop key={index} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/20"
          />
          
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex-center flex-col">
          <span className={cn("font-semibold", sizeClasses[size].text)}>{displayPercentage}%</span>
          {showLabel && <span className={cn("text-muted-foreground", sizeClasses[size].label)}>Flow-Through</span>}
        </div>
      </div>
    </div>
  );
};

export default FlowThroughPercentage;
