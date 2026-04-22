import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DivisionFormModalProps = {
    open: boolean;
    onClose: (open: boolean) => void;
    onSubmit: (payload: { id?: number; name: string }) => void;
    loading?: boolean;
    initialData?: { id: number; name: string } | null;
};

export const DivisionFormModal = ({
    open,
    onClose,
    onSubmit,
    loading = false,
    initialData = null,
}: DivisionFormModalProps) => {
    const [departmentName, setDepartmentName] = useState("");

    useEffect(() => {
        if (initialData) {
            setDepartmentName(initialData.name);
        } else {
            setDepartmentName("");
        }
    }, [initialData, open]);

    const handleSubmit = () => {
        onSubmit({
            id: initialData?.id,
            name: departmentName.trim(),
        });
    };

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold text-[#0F2A4D]">
                            {initialData ? "Edit Divisi" : "Tambah Divisi"}
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                                <Cross2Icon />
                            </Button>
                        </Dialog.Close>
                    </div>

                    <div className="space-y-4">
                        <Input
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            placeholder="Nama divisi"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                        <Button variant="outline" onClick={() => onClose(false)} disabled={loading}>
                            Batal
                        </Button>

                        <Button
                            className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
                            onClick={handleSubmit}
                            disabled={loading || !departmentName.trim()}
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
