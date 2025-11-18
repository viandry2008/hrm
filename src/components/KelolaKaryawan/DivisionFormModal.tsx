import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DivisionFormModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: { id?: number; department_name: string }) => void;
    loading?: boolean;
    initialData?: { id: number; department_name: string } | null;
};

export const DivisionFormModal = ({
    open,
    onClose,
    onSubmit,
    loading = false,
    initialData = null,
}: DivisionFormModalProps) => {
    const [departmentName, setDepartmentName] = useState("");

    // ketika edit → isi default value
    useEffect(() => {
        if (initialData) setDepartmentName(initialData.department_name);
        else setDepartmentName("");
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit({
            id: initialData?.id,
            department_name: departmentName,
        });

        setDepartmentName("");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Divisi" : "Tambah Divisi"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Nama Divisi</label>
                        <Input
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            placeholder="Masukkan nama divisi"
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
