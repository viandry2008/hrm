import React from "react";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface FormFileProps {
  label: string;
  required?: boolean;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export const FormFile: React.FC<FormFileProps> = ({
  label,
  required = false,
  accept = "image/*",
  value,
  onChange,
  className = "",
}) => {
  const inputId = `upload-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* PREVIEW */}
      <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden shadow-sm">
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-10 h-10 text-gray-400" />
        )}
      </div>

      {/* FILE INPUT */}
      <div className="flex-1">
        <Label className="font-semibold text-sm text-gray-700 block mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="flex items-center gap-0">
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            accept={accept}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap hover:bg-gray-200 transition-colors"
          >
            Pilih File
          </label>
          <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate bg-white">
            {value ? value.name : "Tidak ada file yang dipilih"}
          </div>
        </div>
      </div>
    </div>
  );
};