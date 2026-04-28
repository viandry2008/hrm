import React from "react";

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-center space-x-2 p-3 bg-brand text-white rounded-t-lg">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};