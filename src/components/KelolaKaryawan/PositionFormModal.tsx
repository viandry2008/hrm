import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PositionFormModalProps = {
    open: boolean;
    onClose: (open: boolean) => void;
    onSubmit: (payload: { id?: number; position_name: string }) => void;
    loading?: boolean;
    initialData?: { id: number; position_name: string } | null;
};

export const PositionFormModal = ({
    open,
    onClose,
    onSubmit,
    loading = false,
    initialData = null,
}: PositionFormModalProps) => {
    const [positionName, setPositionName] = useState("");

    useEffect(() => {
        if (initialData) {
            setPositionName(initialData.position_name);
        } else {
            setPositionName("");
        }
    }, [initialData, open]);

    const handleSubmit = () => {
        onSubmit({
            id: initialData?.id,
            position_name: positionName.trim(),
        });
    };

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[9998]" />

                {/* Modal Content */}
                <Dialog.Content
                    className="
            fixed z-[9999]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white w-96 rounded-lg shadow-lg p-5
          "
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            {initialData ? "Edit Jabatan" : "Tambah Jabatan"}
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <Button variant="ghost" size="sm">
                                <Cross2Icon />
                            </Button>
                        </Dialog.Close>
                    </div>

                    {/* Body */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Nama Jabatan</label>
                            <Input
                                value={positionName}
                                onChange={(e) => setPositionName(e.target.value)}
                                placeholder="Masukkan nama jabatan"
                            />
                        </div>
                    </div>

                    {/* Footer */}
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
                            disabled={loading || !positionName.trim()}
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
