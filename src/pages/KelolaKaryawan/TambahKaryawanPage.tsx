import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Briefcase, FileText, CreditCard, Phone, Car } from "lucide-react";
// import DataPribadiSection from "./Sections/DataPribadiSection";
// import KepegawaianSection from "./Sections/DataKepegawaianSection";
// import DokumenSection from "./Sections/DokumenSection";
// import BankSection from "./Sections/BankSection";
// import KontakSection from "./Sections/KontakSection";
// import KendaraanSection from "./Sections/KendaraanSection";
import { Button } from "@/components/ui/button";
import DataPribadiSection from "@/components/KelolaKaryawan/Sections/DataPribadiSection";
import KepegawaianSection from "@/components/KelolaKaryawan/Sections/DataKepegawaianSection";
import DokumenSection from "@/components/KelolaKaryawan/Sections/DokumenSection";
import BankSection from "@/components/KelolaKaryawan/Sections/BankSection";
import KontakSection from "@/components/KelolaKaryawan/Sections/KontakSection";
import KendaraanSection from "@/components/KelolaKaryawan/Sections/KendaraanSection";

const TambahKaryawanPage = () => {
    const [formData, setFormData] = useState<any>({});

    const updateForm = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        console.log("DATA KARYAWAN:", formData);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-5">Tambah Karyawan</h1>

            <Tabs defaultValue="data-pribadi" className="w-full">
                <TabsList className="grid grid-cols-6 w-full bg-blue-100 rounded-md">
                    <TabsTrigger value="data-pribadi" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <User className="w-4 h-4 mr-2" /> Data Pribadi
                    </TabsTrigger>

                    <TabsTrigger value="kepegawaian" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <Briefcase className="w-4 h-4 mr-2" /> Kepegawaian
                    </TabsTrigger>

                    <TabsTrigger value="dokumen" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <FileText className="w-4 h-4 mr-2" /> Dokumen
                    </TabsTrigger>

                    <TabsTrigger value="bank" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <CreditCard className="w-4 h-4 mr-2" /> Bank
                    </TabsTrigger>

                    <TabsTrigger value="kontak" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <Phone className="w-4 h-4 mr-2" /> Kontak
                    </TabsTrigger>

                    <TabsTrigger value="kendaraan" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <Car className="w-4 h-4 mr-2" /> Kendaraan
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="data-pribadi">
                    <DataPribadiSection formData={formData} updateForm={updateForm} />
                </TabsContent>

                <TabsContent value="kepegawaian">
                    <KepegawaianSection formData={formData} updateForm={updateForm} />
                </TabsContent>

                <TabsContent value="dokumen">
                    <DokumenSection formData={formData} updateForm={updateForm} />
                </TabsContent>

                <TabsContent value="bank">
                    <BankSection formData={formData} updateForm={updateForm} />
                </TabsContent>

                <TabsContent value="kontak">
                    <KontakSection formData={formData} updateForm={updateForm} />
                </TabsContent>

                <TabsContent value="kendaraan">
                    <KendaraanSection formData={formData} updateForm={updateForm} />
                </TabsContent>
            </Tabs>

            <div className="mt-5 flex justify-end">
                <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                    Simpan Data
                </Button>
            </div>
        </div>
    );
};

export default TambahKaryawanPage;
