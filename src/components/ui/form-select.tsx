import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormSelectProps {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  className?: string;
  id?: string;
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  required = false,
  placeholder,
  value,
  onValueChange,
  loading = false,
  emptyMessage = "Tidak ada data tersedia",
  options,
  className = "",
  id,
  error,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="font-semibold text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        onValueChange={onValueChange}
        value={value}
      >
        <SelectTrigger id={id} className={`h-[42px] bg-white text-sm ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder={loading ? "Loading..." : placeholder} />
        </SelectTrigger>
        <SelectContent className="text-sm">
          {loading ? (
            <SelectItem value="loading" disabled>Loading...</SelectItem>
          ) : options.length === 0 ? (
            <SelectItem value="empty" disabled>{emptyMessage}</SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};