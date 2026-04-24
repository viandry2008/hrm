import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  borderColor?: 'green' | 'red' | 'blue' | 'yellow' | 'orange' | 'blue' | 'old_blue';
  variant?: 'border' | 'filled';
}

const borderColorMap = {
  green: 'border-green-500',
  red: 'border-red-500',
  old_blue: 'border-blue-800',
  blue: 'border-blue-600',
  yellow: 'border-yellow-500',
  orange: 'border-orange-500',
};

const filledBgColorMap = {
  green: 'bg-green-700',
  red: 'bg-red-600',
  old_blue: 'bg-blue-600',
  blue: 'bg-blue-400',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
};

const iconColorMap = {
  green: 'text-green-500',
  red: 'text-red-500',
  old_blue: 'text-blue-500',
  blue: 'text-blue-400',
  yellow: 'text-yellow-500',
  orange: 'text-orange-500',
};

const filledIconColorMap = {
  green: 'text-white',
  red: 'text-white',
  old_blue: 'text-white',
  blue: 'text-white',
  yellow: 'text-white',
  orange: 'text-white',
};

const subtitleColorMap = {
  green: 'text-green-600',
  red: 'text-red-600',
  old_blue: 'text-blue-600',
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  orange: 'text-orange-600',
};

const filledSubtitleColorMap = {
  green: 'text-green-100',
  red: 'text-red-100',
  old_blue: 'text-blue-100',
  blue: 'text-blue-100',
  yellow: 'text-yellow-100',
  orange: 'text-orange-100',
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  borderColor = 'green',
  variant = 'border',
}: StatCardProps) => {
  if (variant === 'filled') {
    return (
      <Card className={`${filledBgColorMap[borderColor]} shadow-md text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              {subtitle && (
                <div className={`flex items-center gap-1 text-sm ${filledSubtitleColorMap[borderColor]}`}>
                  <span>{subtitle}</span>
                </div>
              )}
            </div>
            <Icon className={`h-10 w-10 text-white`} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white border-l-4 ${borderColorMap[borderColor]} shadow-md`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <div className={`flex items-center gap-1 text-sm ${subtitleColorMap[borderColor]}`}>
                <span>{subtitle}</span>
              </div>
            )}
          </div>
          <Icon className={`h-10 w-10 ${iconColorMap[borderColor]}`} />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardGridProps {
  children: React.ReactNode;
}

const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
};

export const StatCardGrid = ({ children }: StatCardGridProps) => {
  const childCount = React.Children.count(children);
  const gridCols = gridColsMap[childCount] || gridColsMap[4];

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {children}
    </div>
  );
};