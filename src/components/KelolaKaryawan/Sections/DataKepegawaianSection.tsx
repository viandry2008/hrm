import React from "react";
import { Briefcase, AlertTriangle, Calendar } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormSection } from "@/components/ui/form-section";
import { useGetPositions } from "@/api/position/position.query";
import { useGetDepartments } from "@/api/division/division.query";
import { useGetSections } from "@/api/section/section.query";
import { useGetCategories } from "@/api/category/category.query";

interface DataKepegawaianSectionProps {
  updateForm: (key: string, value: any) => void;
  formData: Record<string, any>;
}

const DataKepegawaianSection = ({ updateForm, formData }: DataKepegawaianSectionProps) => {
  const { data: positionData, isLoading: isLoadingPositions } = useGetPositions({
    search: "",
    page: 1,
    limit: 100,
  });

  const { data: departmentData, isLoading: isLoadingDepartments } = useGetDepartments({
    search: "",
    page: 1,
    limit: 100,
  });

  const { data: sectionsData, isLoading: isLoadingSections } = useGetSections({
    search: "",
    page: 1,
    limit: 100,
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories({
    search: "",
    page: 1,
    limit: 100,
  });

  const positions = positionData?.data ?? [];
  const departments = departmentData?.data ?? [];
  const sections = sectionsData?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const positionOptions = positions.map((pos) => ({
    value: pos.id.toString(),
    label: pos.name,
  }));

  const departmentOptions = departments.map((dept) => ({
    value: dept.id.toString(),
    label: dept.name,
  }));

  const sectionOptions = sections.map((section) => ({
    value: section.id.toString(),
    label: section.name,
  }));

  const locationOptions = [
    { value: "PT Proven Force Indonesia", label: "PT Proven Force Indonesia" },
  ];

  const grupOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat.id.toString(),
    label: cat.name,
  }));

  const maritalOptions = [
    { value: "TK/0", label: "TK/0 - Rp 54.000.000" },
    { value: "TK/1", label: "TK/1 - Rp 58.500.000" },
    { value: "TK/2", label: "TK/2 - Rp 63.000.000" },
    { value: "TK/3", label: "TK/3 - Rp 67.500.000" },
    { value: "K/0", label: "K/0 - Rp 58.500.000" },
    { value: "K/1", label: "K/1 - Rp 63.000.000" },
    { value: "K/2", label: "K/2 - Rp 67.500.000" },
    { value: "K/3", label: "K/3 - Rp 72.000.000" },
  ];

  const accountStatusOptions = [
    { value: "Aktif", label: "Aktif" },
    { value: "Tidak Aktif", label: "Tidak Aktif" },
  ];

  const workStatusOptions = [
    { value: "Aktif", label: "Aktif" },
    { value: "Tidak Aktif", label: "Tidak Aktif" },
  ];

  return (
    <FormSection
      title="Data Kepegawaian"
      icon={<Briefcase className="w-5 h-5" />}
    >
      <FormInput
        label="ID Karyawan"
        required
        placeholder="ID otomatis"
        value={formData.idKaryawan || ""}
        onChange={(value) => updateForm("idKaryawan", value)}
      />

      <FormSelect
        label="Divisi"
        required
        placeholder="-- Pilih Divisi --"
        value={formData.divisi || ""}
        onValueChange={(value) => updateForm("divisi", value)}
        loading={isLoadingDepartments}
        emptyMessage="Tidak ada data divisi"
        options={departmentOptions}
      />

      <FormSelect
        label="Jabatan"
        required
        placeholder="-- Pilih Jabatan --"
        value={formData.jabatan || ""}
        onValueChange={(value) => updateForm("jabatan", value)}
        loading={isLoadingPositions}
        emptyMessage="Tidak ada data jabatan"
        options={positionOptions}
      />

      <FormSelect
        label="Bagian"
        required
        placeholder="-- Pilih Bagian --"
        value={formData.bagian || ""}
        onValueChange={(value) => updateForm("bagian", value)}
        loading={isLoadingSections}
        emptyMessage="Tidak ada data bagian"
        options={sectionOptions}
      />

      <FormSelect
        label="Lokasi Kerja"
        required
        placeholder="-- Pilih Lokasi --"
        value={formData.lokasi || ""}
        onValueChange={(value) => updateForm("lokasi", value)}
        options={locationOptions}
      />

      <FormInput
        label="Tanggal Bergabung"
        required
        type="date"
        value={formData.tanggalBergabung || ""}
        onChange={(value) => updateForm("tanggalBergabung", value)}
      />

      <FormInput
        label="Tanggal Kontrak"
        required
        type="date"
        value={formData.tanggalKontrak || ""}
        onChange={(value) => updateForm("tanggalKontrak", value)}
      />

      <FormInput
        label="Selesai Kontrak"
        required
        type="date"
        value={formData.selesaiKontrak || ""}
        onChange={(value) => updateForm("selesaiKontrak", value)}
      />

      <FormSelect
        label="Grup"
        placeholder="-- Pilih Grup --"
        value={formData.grup || ""}
        onValueChange={(value) => updateForm("grup", value)}
        options={grupOptions}
      />

      <FormSelect
        label="Kategori Karyawan"
        required
        placeholder="-- Pilih Kategori --"
        value={formData.kategori || ""}
        onValueChange={(value) => updateForm("kategori", value)}
        loading={isLoadingCategories}
        emptyMessage="Tidak ada data kategori"
        options={categoryOptions}
      />

      <FormSelect
        label="Status Marital"
        required
        placeholder="-- Pilih Status Marital --"
        value={formData.marital || ""}
        onValueChange={(value) => updateForm("marital", value)}
        options={maritalOptions}
      />

      <FormInput
        label="Referensi"
        placeholder="Referensi"
        value={formData.referensi || ""}
        onChange={(value) => updateForm("referensi", value)}
      />

      <FormInput
        label="No SIO"
        placeholder="32xxxxxx"
        value={formData.noSio || ""}
        onChange={(value) => updateForm("noSio", value)}
      />

      <FormSelect
        label="Status Akun"
        required
        placeholder="-- Pilih Status Akun --"
        value={formData.akun || ""}
        onValueChange={(value) => updateForm("akun", value)}
        options={accountStatusOptions}
      />

      <FormSelect
        label="Status Kerja"
        required
        placeholder="-- Pilih Status Kerja --"
        value={formData.statusKerja || ""}
        onValueChange={(value) => updateForm("statusKerja", value)}
        options={workStatusOptions}
      />

      {/* NPWP Section */}
      <div className="col-span-2 flex flex-col gap-2 mt-2">
        <label className="font-semibold text-sm text-gray-700">
          Apakah karyawan memiliki NPWP? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="radio"
              name="punyaNPWP"
              value="YA"
              checked={formData.punyaNPWP === "YA"}
              onChange={(e) => updateForm("punyaNPWP", e.target.value)}
              className="w-5 h-5 border-2 border-gray-300 text-[#0F2A4D] focus:outline-none focus:ring-0 accent-[#0F2A4D] cursor-pointer transition-colors"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0F2A4D] transition-colors">
              YA
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="radio"
              name="punyaNPWP"
              value="TIDAK"
              checked={formData.punyaNPWP === "TIDAK"}
              onChange={(e) => updateForm("punyaNPWP", e.target.value)}
              className="w-5 h-5 border-2 border-gray-300 text-[#0F2A4D] focus:outline-none focus:ring-0 accent-[#0F2A4D] cursor-pointer transition-colors"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0F2A4D] transition-colors">
              TIDAK
            </span>
          </label>
        </div>

        {/* Warning otomatis */}
        {formData.punyaNPWP === "TIDAK" && (
          <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Jika karyawan <strong>tidak memiliki NPWP</strong>, potongan PPh Pasal 21 akan dikenakan tarif <strong>20% lebih tinggi</strong> sesuai ketentuan perpajakan.</p>
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default DataKepegawaianSection;