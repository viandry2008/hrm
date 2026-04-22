import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  borderColor?: 'green' | 'red' | 'blue' | 'yellow' | 'orange';
}

const borderColorMap = {
  green: 'border-green-500',
  red: 'border-red-500',
  blue: 'border-blue-500',
  yellow: 'border-yellow-500',
  orange: 'border-orange-500',
};

const iconColorMap = {
  green: 'text-green-500',
  red: 'text-red-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  orange: 'text-orange-500',
};

const subtitleColorMap = {
  green: 'text-green-600',
  red: 'text-red-600',
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  orange: 'text-orange-600',
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  borderColor = 'green',
}: StatCardProps) => {
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