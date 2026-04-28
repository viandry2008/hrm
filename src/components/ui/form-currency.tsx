import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormCurrencyProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: number | string;
  onChange: (value: number) => void;
  className?: string;
}

const formatRupiah = (value: any) => {
  if (!value) return "";
  const number = typeof value === "number"
    ? value
    : parseInt(value.replace(/[^\d]/g, ""));

  if (isNaN(number)) return "";
  return number.toLocaleString("id-ID");
};

const parseNumber = (value: string) => {
  return parseInt(value.replace(/[^\d]/g, "")) || 0;
};

export const FormCurrency: React.FC<FormCurrencyProps> = ({
  label,
  required = false,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="font-semibold text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          Rp
        </span>
        <Input
          type="text"
          placeholder={placeholder}
          value={formatRupiah(value)}
          onChange={(e) => onChange(parseNumber(e.target.value))}
          className="h-[42px] bg-white text-sm pl-10"
        />
      </div>
    </div>
  );
};