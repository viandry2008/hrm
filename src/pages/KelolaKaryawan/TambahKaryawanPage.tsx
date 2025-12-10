import { useState } from "react";
import { Button } from "@/components/ui/button";
import AkunSection from "@/components/KelolaKaryawan/Sections/AkunSection";
import DataPribadiSection from "@/components/KelolaKaryawan/Sections/DataPribadiSection";
import DataKepegawaianSection from "@/components/KelolaKaryawan/Sections/DataKepegawaianSection";
import DokumenSection from "@/components/KelolaKaryawan/Sections/DokumenSection";
import BankSection from "@/components/KelolaKaryawan/Sections/BankSection";
import KontakSection from "@/components/KelolaKaryawan/Sections/KontakSection";
import KendaraanSection from "@/components/KelolaKaryawan/Sections/KendaraanSection";
import InformasiGajiSection from "@/components/KelolaKaryawan/Sections/InformasiGajiSection";

const TambahKaryawanPage = () => {
    const [formData, setFormData] = useState<any>({});

    const updateForm = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        console.log("DATA KARYAWAN:", formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Tambah Karyawan</h1>

            <div className="space-y-6">
                <AkunSection formData={formData} updateForm={updateForm} />
                <DataPribadiSection formData={formData} updateForm={updateForm} />
                <DataKepegawaianSection formData={formData} updateForm={updateForm} />
                <InformasiGajiSection formData={formData} updateForm={updateForm} />
                <DokumenSection formData={formData} updateForm={updateForm} />
                <BankSection formData={formData} updateForm={updateForm} />
                <KontakSection formData={formData} updateForm={updateForm} />
                <KendaraanSection formData={formData} updateForm={updateForm} />
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                    Simpan
                </Button>
            </div>
        </div>
    );
};

export default TambahKaryawanPage;
