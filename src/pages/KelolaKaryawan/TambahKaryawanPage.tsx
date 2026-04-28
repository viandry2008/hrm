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

interface FormData {
  // Akun fields
  username?: string;
  email?: string;
  password?: string;
  role?: string;

  // Data Pribadi fields
  foto?: File;
  nama?: string;
  telepon?: string;
  tempatLahir?: string;
  tanggallahir?: string;
  jeniskelamin?: string;
  alamatKTP?: string;
  alamatDomisili?: string;
  pendidikan?: string;
  agama?: string;
  namaSuamiIstri?: string;
  namaAnak?: string;
  jumlahAnak?: string;
  namaBapak?: string;
  namaIbu?: string;

  // Data Kepegawaian fields
  idKaryawan?: string;
  divisi?: string;
  jabatan?: string;
  bagian?: string;
  lokasi?: string;
  tanggalBergabung?: string;
  tanggalKontrak?: string;
  selesaiKontrak?: string;
  grup?: string;
  kategori?: string;
  marital?: string;
  referensi?: string;
  noSio?: string;
  akun?: string;
  statusKerja?: string;
  punyaNPWP?: string;

  // Bank fields
  namaPemilik?: string;
  nomorRekening?: string;
  bank?: string;

  // Dokumen fields
  ktp?: File;
  nomorKTP?: string;
  kartuKeluarga?: File;
  noKartuKeluarga?: string;
  npwp?: File;
  npwpNumber?: string;
  kpj?: File;
  nomorKPJ?: string;
  jkn?: File;
  nomorJKN?: string;
  cv?: File;
  pendukungLain?: File;

  // Kontak fields
  namaDarurat?: string;
  hubunganDarurat?: string;
  nomorTeleponDarurat?: string;

  // Kendaraan fields
  sim?: File;
  nomorSIM?: string;
  stnk?: File;
  nomorSTNK?: string;
  gambarDepan?: File;
  gambarBelakang?: File;
  gambarSamping?: File;

  // Gaji fields
  gaji_pokok?: number;
  tunjangan_jabatan?: number;
  tunjangan_project?: number;
  tunjangan_makan?: number;
  tunjangan_transport?: number;
  tunjangan_lain?: number;
}

const TambahKaryawanPage = () => {
    const [formData, setFormData] = useState<FormData>({});

    const updateForm = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
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