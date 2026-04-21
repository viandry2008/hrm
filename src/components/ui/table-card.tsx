import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TableCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export const TableCard = ({ icon: Icon, title, children }: TableCardProps) => {
  return (
    <Card className="border border-gray-300 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-brand font-semibold">
          <Icon className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};