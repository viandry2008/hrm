import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateEmployee } from "@/api/employee/employee.query";
import AkunSection from "@/components/KelolaKaryawan/Sections/AkunSection";
import DataPribadiSection from "@/components/KelolaKaryawan/Sections/DataPribadiSection";
import DataKepegawaianSection from "@/components/KelolaKaryawan/Sections/DataKepegawaianSection";
import DokumenSection from "@/components/KelolaKaryawan/Sections/DokumenSection";
import BankSection from "@/components/KelolaKaryawan/Sections/BankSection";
import KontakSection from "@/components/KelolaKaryawan/Sections/KontakSection";
import KendaraanSection from "@/components/KelolaKaryawan/Sections/KendaraanSection";
import InformasiGajiSection from "@/components/KelolaKaryawan/Sections/InformasiGajiSection";
import Swal from "sweetalert2";

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
    // jumlahAnak?: string;
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
    bankName?: string;

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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const createEmployeeMutation = useCreateEmployee(() => {
        setFormData({});
    });

    const updateForm = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const buildFormDataPayload = (data: FormData) => {
        const formPayload = new FormData();
        const cleanNumber = (value?: string) => value?.replace(/\D/g, "") || "";
        const parseIntString = (value?: string) => {
            if (!value) return null;
            const parsed = parseInt(value, 10);
            return Number.isNaN(parsed) ? null : parsed;
        };
        const genderMap: Record<string, string> = {
            "Laki - Laki": "Male",
            Perempuan: "Female",
        };
        const statusMap: Record<string, string> = {
            Aktif: "Active",
            "Tidak Aktif": "Inactive",
        };
        const appendIfValue = (key: string, value: any) => {
            if (value !== undefined && value !== null && value !== "") {
                formPayload.append(key, String(value));
            }
        };

        appendIfValue("employee_code", data.idKaryawan);
        appendIfValue("full_name", data.nama);
        appendIfValue("name", data.nama);
        appendIfValue("username", data.username);
        appendIfValue("email", data.email);
        appendIfValue("password", data.password);
        appendIfValue("role_id", parseIntString(data.role));
        appendIfValue("phone_number", cleanNumber(data.telepon));
        appendIfValue("gender", data.jeniskelamin ? genderMap[data.jeniskelamin] ?? data.jeniskelamin : undefined);
        appendIfValue("department_id", parseIntString(data.divisi));
        appendIfValue("position_id", parseIntString(data.jabatan));
        appendIfValue("company_id", 1);
        appendIfValue("grade_id", parseIntString(data.kategori));
        appendIfValue("bank_id", parseIntString(data.bank));
        appendIfValue("bank_name", data.bankName);
        appendIfValue("bank_account_number", cleanNumber(data.nomorRekening));
        appendIfValue("bank_account_holder_name", data.namaPemilik);
        appendIfValue("national_id", data.nomorKTP);
        appendIfValue("family_card_number", data.noKartuKeluarga);
        appendIfValue("address_ktp", data.alamatKTP);
        appendIfValue("address_domicile", data.alamatDomisili);
        appendIfValue("employment_status", data.statusKerja ? statusMap[data.statusKerja] ?? data.statusKerja : undefined);
        appendIfValue("employee_type", "Permanent");
        appendIfValue("join_date", data.tanggalBergabung);
        appendIfValue("birth_date", data.tanggallahir);
        appendIfValue("birth_place", data.tempatLahir);
        appendIfValue("spouse_name", data.namaSuamiIstri);
        appendIfValue("children_names", data.namaAnak);
        appendIfValue("father_name", data.namaBapak);
        appendIfValue("mother_name", data.namaIbu);
        appendIfValue("emergency_name", data.namaDarurat);
        appendIfValue("emergency_relation", data.hubunganDarurat);
        appendIfValue("emergency_phone", cleanNumber(data.nomorTeleponDarurat));
        appendIfValue("basic_salary", data.gaji_pokok);
        appendIfValue("position_allowance", data.tunjangan_jabatan);
        appendIfValue("project_allowance", data.tunjangan_project);
        appendIfValue("meal_allowance", data.tunjangan_makan);
        appendIfValue("transport_allowance", data.tunjangan_transport);
        appendIfValue("other_allowance", data.tunjangan_lain);
        appendIfValue("marital_status_id", parseIntString(data.marital));

        if (data.foto) formPayload.append("avatar", data.foto);
        if (data.ktp) {
            appendIfValue("document_type", "KTP");
            formPayload.append("document_file", data.ktp);
            appendIfValue("document_number", data.nomorKTP);
        }
        if (data.sim) formPayload.append("sim_file", data.sim);
        appendIfValue("sim_number", data.nomorSIM);
        if (data.stnk) formPayload.append("stnk_file", data.stnk);
        appendIfValue("stnk_number", data.nomorSTNK);
        if (data.gambarDepan) formPayload.append("vehicle_front_image", data.gambarDepan);
        if (data.gambarBelakang) formPayload.append("vehicle_back_image", data.gambarBelakang);
        if (data.gambarSamping) formPayload.append("vehicle_side_image", data.gambarSamping);

        return formPayload;
    };

    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};

        // Required fields mapping to error messages
        const requiredFields = {
            username: "Username wajib diisi",
            email: "Email wajib diisi",
            password: "Password wajib diisi",
            role: "Role wajib diisi",
            foto: "File Foto Profile wajib diisi",
            nama: "Nama wajib diisi",
            telepon: "Nomor Telepon wajib diisi",
            tempatLahir: "Tempat Lahir wajib diisi",
            tanggallahir: "Tanggal Lahir wajib diisi",
            jeniskelamin: "Jenis Kelamin wajib diisi",
            alamatKTP: "Alamat KTP wajib diisi",
            alamatDomisili: "Alamat Domisili wajib diisi",
            pendidikan: "Pendidikan wajib diisi",
            agama: "Agama wajib diisi",
            idKaryawan: "ID Karyawan wajib diisi",
            divisi: "Divisi wajib diisi",
            jabatan: "Jabatan wajib diisi",
            bagian: "Bagian wajib diisi",
            lokasi: "Lokasi Kerja wajib diisi",
            tanggalBergabung: "Tanggal Bergabung wajib diisi",
            tanggalKontrak: "Tanggal Kontrak wajib diisi",
            selesaiKontrak: "Selesai Kontrak wajib diisi",
            kategori: "Kategori Karyawan wajib diisi",
            marital: "Status Marital wajib diisi",
            akun: "Status Akun wajib diisi",
            statusKerja: "Status Kerja wajib diisi",
            gaji_pokok: "Gaji Pokok wajib diisi",
        };

        Object.entries(requiredFields).forEach(([key, message]) => {
            const value = formData[key as keyof FormData];
            if (value === undefined || value === null || value === "" || (typeof value === "number" && value === 0)) {
                newErrors[key] = message;
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            const firstErrorKey = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(`field-${firstErrorKey}`);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        const payload = buildFormDataPayload(formData);
        createEmployeeMutation.mutate(payload);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Tambah Karyawan</h1>

            <div className="space-y-6">
                <AkunSection formData={formData} updateForm={updateForm} errors={errors} />
                <DataPribadiSection formData={formData} updateForm={updateForm} errors={errors} />
                <DataKepegawaianSection formData={formData} updateForm={updateForm} errors={errors} />
                <InformasiGajiSection formData={formData} updateForm={updateForm} errors={errors} />
                <DokumenSection formData={formData} updateForm={updateForm} errors={errors} />
                <BankSection formData={formData} updateForm={updateForm} errors={errors} />
                <KontakSection formData={formData} updateForm={updateForm} errors={errors} />
                <KendaraanSection formData={formData} updateForm={updateForm} errors={errors} />
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit} className="bg-[#1E4F85] text-white">
                    Simpan
                </Button>
            </div>
        </div>
    );
};

export default TambahKaryawanPage;