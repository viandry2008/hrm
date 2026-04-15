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
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[9998]" />

                <Dialog.Content
                    className="
            fixed z-[9999]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white w-96 rounded-lg shadow-lg p-5
          "
                >
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            {initialData ? "Edit Divisi" : "Tambah Divisi"}
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <Button variant="ghost" size="sm">
                                <Cross2Icon />
                            </Button>
                        </Dialog.Close>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Nama Divisi</label>
                            <Input
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                placeholder="Masukkan nama divisi"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => onClose(false)}
                            disabled={loading}
                        >
                            Batal
                        </Button>

                        <Button
                            className="bg-blue-600 text-white"
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
