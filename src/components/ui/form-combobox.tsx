import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface FormComboboxProps {
    label: string;
    required?: boolean;
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    onSearch?: (search: string) => void;
    loading?: boolean;
    emptyMessage?: string;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    className?: string;
}

export const FormCombobox: React.FC<FormComboboxProps> = ({
    label,
    required = false,
    placeholder,
    value,
    onValueChange,
    onSearch,
    loading = false,
    emptyMessage = "Tidak ada data tersedia",
    options,
    className = "",
}) => {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label className="font-semibold text-sm text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="h-[42px] justify-between bg-white text-sm"
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : selectedOption
                                ? selectedOption.label
                                : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput
                            placeholder="Cari..."
                            onValueChange={onSearch}
                        />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => {
                                            onValueChange(option.value === value ? "" : option.value);
                                            setOpen(false);
                                        }}
                                        disabled={option.disabled}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};