import React from "react";
import { User } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormFile } from "@/components/ui/form-file";
import { FormSection } from "@/components/ui/form-section";
import { useGetReligions } from "@/api/religion/religion.query";

interface DataPribadiSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
  errors?: Record<string, string>;
}

const DataPribadiSection = ({ formData, updateForm, errors }: DataPribadiSectionProps) => {
  const { data: religionData, isLoading: isLoadingReligions } = useGetReligions({
    search: "",
    page: 1,
    limit: 10,
  });

  const religions = religionData?.data ?? [];
  const religionOptions = religions.map((religion) => ({
    value: religion.id.toString(),
    label: religion.name,
  }));

  const genderOptions = [
    { value: "Laki - Laki", label: "Laki - Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  const educationOptions = [
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA/SMK", label: "SMA / SMK" },
    { value: "D1", label: "D1" },
    { value: "D2", label: "D2" },
    { value: "D3", label: "D3" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" },
  ];

  return (
    <FormSection
      title="Data Pribadi"
      icon={<User className="w-5 h-5" />}
    >
      <FormFile
        label="File Foto Profile"
        required
        accept="image/*"
        value={formData.foto || null}
        id="field-foto"
        error={errors?.foto}
        onChange={(file) => updateForm("foto", file)}
      />

      <FormInput
        label="Nama Karyawan"
        required
        placeholder="Nama Karyawan"
        value={formData.nama || ""}
        id="field-nama"
        error={errors?.nama}
        onChange={(value) => updateForm("nama", value)}
      />

      <FormInput
        label="Nomor Telepon"
        required
        placeholder="08xxx"
        value={formData.telepon || ""}
        id="field-telepon"
        error={errors?.telepon}
        onChange={(value) => updateForm("telepon", value)}
      />

      <FormInput
        label="Tempat Lahir"
        required
        placeholder="Tempat Lahir"
        value={formData.tempatLahir || ""}
        id="field-tempatLahir"
        error={errors?.tempatLahir}
        onChange={(value) => updateForm("tempatLahir", value)}
      />

      <FormInput
        label="Tanggal Lahir"
        required
        type="date"
        value={formData.tanggallahir || ""}
        id="field-tanggallahir"
        error={errors?.tanggallahir}
        onChange={(value) => updateForm("tanggallahir", value)}
      />

      <FormSelect
        label="Jenis Kelamin"
        required
        placeholder="-- Pilih Jenis Kelamin --"
        value={formData.jeniskelamin || ""}
        id="field-jeniskelamin"
        error={errors?.jeniskelamin}
        onValueChange={(value) => updateForm("jeniskelamin", value)}
        options={genderOptions}
      />

      <FormTextarea
        label="Alamat KTP"
        required
        placeholder="Alamat lengkap sesuai KTP"
        value={formData.alamatKTP || ""}
        id="field-alamatKTP"
        error={errors?.alamatKTP}
        onChange={(value) => updateForm("alamatKTP", value)}
      />

      <FormTextarea
        label="Alamat Domisili"
        required
        placeholder="Alamat domisili saat ini"
        value={formData.alamatDomisili || ""}
        id="field-alamatDomisili"
        error={errors?.alamatDomisili}
        onChange={(value) => updateForm("alamatDomisili", value)}
      />

      <FormSelect
        label="Pendidikan"
        required
        placeholder="-- Pilih Pendidikan --"
        value={formData.pendidikan || ""}
        id="field-pendidikan"
        error={errors?.pendidikan}
        onValueChange={(value) => updateForm("pendidikan", value)}
        options={educationOptions}
      />

      <FormSelect
        label="Agama"
        required
        placeholder="-- Pilih Agama --"
        value={formData.agama || ""}
        id="field-agama"
        error={errors?.agama}
        onValueChange={(value) => updateForm("agama", value)}
        loading={isLoadingReligions}
        emptyMessage="Tidak ada data agama"
        options={religionOptions}
      />

      <FormInput
        label="Nama Suami/Istri"
        placeholder="contoh: nama1, nama2, dst"
        value={formData.namaSuamiIstri || ""}
        onChange={(value) => updateForm("namaSuamiIstri", value)}
      />

      <FormInput
        label="Nama Anak"
        placeholder="Contoh: Nama1, Nama2, dst"
        value={formData.namaAnak || ""}
        onChange={(value) => updateForm("namaAnak", value)}
      />

      <FormInput
        label="Jumlah Anak"
        type="number"
        placeholder="Total jumlah anak"
        value={formData.jumlahAnak || ""}
        onChange={(value) => updateForm("jumlahAnak", value)}
      />

      <FormInput
        label="Nama Bapak"
        placeholder="Nama Bapak"
        value={formData.namaBapak || ""}
        onChange={(value) => updateForm("namaBapak", value)}
      />

      <FormInput
        label="Nama Ibu"
        placeholder="Nama Ibu"
        value={formData.namaIbu || ""}
        onChange={(value) => updateForm("namaIbu", value)}
      />

      {/* Help text for addresses */}
      <div className="col-span-2 mt-2">
        <div className="text-xs italic text-gray-600 space-y-1">
          <p>*) Isi alamat sesuai KTP</p>
          <p>*) Jika mengisi domisili harap input nama kota</p>
        </div>
      </div>
    </FormSection>
  );
};

export default DataPribadiSection;