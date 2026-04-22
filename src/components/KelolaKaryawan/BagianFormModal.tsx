import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDepartments } from "@/api/division/division.query";

type BagianFormModalProps = {
    open: boolean;
    onClose: (open: boolean) => void;
    onSubmit: (payload: { id?: number; name: string; department_id: number }) => void;
    loading?: boolean;
    initialData?: { id: number; name: string; department_id: number } | null;
};

export const BagianFormModal = ({
    open,
    onClose,
    onSubmit,
    loading = false,
    initialData = null,
}: BagianFormModalProps) => {
    const [sectionName, setSectionName] = useState("");
    const [departmentId, setDepartmentId] = useState<number | null>(null);

    const { data: departmentData, isLoading: isLoadingDepartment } = useGetDepartments({
        search: "",
        page: 1,
        limit: 1000,
    });

    const departments = departmentData?.data ?? [];

    useEffect(() => {
        if (initialData) {
            setSectionName(initialData.name);
            setDepartmentId(initialData.department_id);
        } else {
            setSectionName("");
            setDepartmentId(null);
        }
    }, [initialData, open]);

    const handleSubmit = () => {
        if (!sectionName.trim() || !departmentId) return;
        onSubmit({
            id: initialData?.id,
            name: sectionName.trim(),
            department_id: departmentId,
        });
    };

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold text-[#0F2A4D]">
                            {initialData ? "Edit Bagian" : "Tambah Bagian"}
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                                <Cross2Icon />
                            </Button>
                        </Dialog.Close>
                    </div>

                    <div className="space-y-3">
                        <Input
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                            placeholder="Nama bagian"
                            className="focus:border-[#1E4F85]"
                        />

                        <Select
                            value={departmentId?.toString()}
                            onValueChange={(v) => setDepartmentId(Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        isLoadingDepartment ? "Loading divisi..." : "Pilih divisi"
                                    }
                                />
                            </SelectTrigger>

                            <SelectContent className="z-[10000]">
                                {departments.map((dept) => (
                                    <SelectItem key={dept.id} value={String(dept.id)}>
                                        {dept.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                        <Button variant="outline" onClick={() => onClose(false)}>
                            Batal
                        </Button>

                        <Button
                            className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
                            onClick={handleSubmit}
                            disabled={loading || !sectionName.trim() || !departmentId}
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};