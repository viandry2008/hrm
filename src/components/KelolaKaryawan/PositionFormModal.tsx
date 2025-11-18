import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PositionFormModalProps = {
    open: boolean;
    onClose: () => void;
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

    // ketika edit → isi default value
    useEffect(() => {
        if (initialData) setPositionName(initialData.position_name);
        else setPositionName("");
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit({
            id: initialData?.id,
            position_name: positionName,
        });

        setPositionName("");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Jabatan" : "Tambah Jabatan"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Nama Jabatan</label>
                        <Input
                            value={positionName}
                            onChange={(e) => setPositionName(e.target.value)}
                            placeholder="Masukkan nama jabatan"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
