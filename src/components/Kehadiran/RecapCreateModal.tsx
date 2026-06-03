import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { X } from "lucide-react";

import { useGetEmployees } from "@/api/employee/employee.query";
import { useGetCategories } from "@/api/category/category.query";
import { useCreateAttendanceRecap } from "@/api/attendance/attendance.query";

interface RecapCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const RecapCreateModal = ({
    open,
    onOpenChange,
}: RecapCreateModalProps) => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
    const [categoryId, setCategoryId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [employeeSearch, setEmployeeSearch] = useState("");
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

    const { data: employeesResp } = useGetEmployees({
        search: employeeSearch,
        limit: 100,
    });

    const { data: categoriesResp } = useGetCategories({
        limit: 100,
    });

    const { mutate: createRecap, isPending } =
        useCreateAttendanceRecap(() => {
            handleReset();
            onOpenChange(false);
        });

    const employees = employeesResp?.data || [];
    const categories = categoriesResp?.data || [];

    const handleAddEmployee = (empId: number) => {
        if (!selectedEmployeeIds.includes(empId)) {
            setSelectedEmployeeIds((prev) => [...prev, empId]);
        }

        setEmployeeSearch("");
        setShowEmployeeDropdown(false);
    };

    const handleRemoveEmployee = (empId: number) => {
        setSelectedEmployeeIds((prev) =>
            prev.filter((id) => id !== empId)
        );
    };

    const handleReset = () => {
        setSelectedEmployeeIds([]);
        setCategoryId("");
        setStartDate("");
        setEndDate("");
        setEmployeeSearch("");
    };

    const handleSubmit = () => {
        if (
            !categoryId ||
            selectedEmployeeIds.length === 0 ||
            !startDate ||
            !endDate
        ) {
            alert(
                "Mohon lengkapi semua field termasuk memilih minimal satu karyawan"
            );
            return;
        }

        createRecap({
            category_id: Number(categoryId),
            employee_ids: selectedEmployeeIds,
            start_date: startDate,
            end_date: endDate,
        });
    };

    const selectedEmployees = employees.filter((emp: any) =>
        selectedEmployeeIds.includes(emp.id)
    );

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                        <Dialog.Title className="text-lg font-semibold text-[#0F2A4D]">
                            Buat Rekap Absensi
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-gray-100"
                            >
                                <Cross2Icon />
                            </Button>
                        </Dialog.Close>
                    </div>

                    <div className="space-y-4">
                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Kategori Karyawan{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <Select
                                value={categoryId}
                                onValueChange={setCategoryId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">-- Semua Shift --</SelectItem>
                                    <SelectItem value="null">Non Shift</SelectItem>
                                    {categories.map((cat: any) => (
                                        <SelectItem
                                            key={cat.id}
                                            value={String(cat.id)}
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Karyawan */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Nama Karyawan{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            {selectedEmployees.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2 border rounded-lg p-3 bg-slate-50">
                                    {selectedEmployees.map((employee: any) => (
                                        <div
                                            key={employee.id}
                                            className="flex items-center gap-2 px-3 py-1 rounded-full border bg-white text-sm"
                                        >
                                            <span>
                                                {employee.full_name}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveEmployee(
                                                        employee.id
                                                    )
                                                }
                                            >
                                                <X className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="relative">
                                <Input
                                    placeholder="Cari nama karyawan..."
                                    value={employeeSearch}
                                    onChange={(e) =>
                                        setEmployeeSearch(
                                            e.target.value
                                        )
                                    }
                                    onFocus={() =>
                                        setShowEmployeeDropdown(true)
                                    }
                                />

                                {showEmployeeDropdown &&
                                    employeeSearch && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20 max-h-52 overflow-y-auto">
                                            {employees
                                                .filter(
                                                    (emp: any) =>
                                                        !selectedEmployeeIds.includes(
                                                            emp.id
                                                        )
                                                )
                                                .map((emp: any) => (
                                                    <button
                                                        key={emp.id}
                                                        type="button"
                                                        onClick={() =>
                                                            handleAddEmployee(
                                                                emp.id
                                                            )
                                                        }
                                                        className="w-full text-left px-4 py-2 hover:bg-slate-100"
                                                    >
                                                        {emp.full_name} (
                                                        {
                                                            emp.employee_code
                                                        }
                                                        )
                                                    </button>
                                                ))}

                                            {employees.length === 0 && (
                                                <div className="px-4 py-2 text-gray-500">
                                                    Data tidak ditemukan
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Tanggal */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Dari Tanggal
                                </label>

                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Sampai Tanggal
                                </label>

                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => {
                                handleReset();
                                onOpenChange(false);
                            }}
                            disabled={isPending}
                        >
                            Batal
                        </Button>

                        <Button
                            className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending
                                ? "Membuat..."
                                : "Buat Rekap"}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};