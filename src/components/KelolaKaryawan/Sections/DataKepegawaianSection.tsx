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
import { useGetMaritals } from "@/api/marital/marital.query";

interface DataKepegawaianSectionProps {
  updateForm: (key: string, value: any) => void;
  formData: Record<string, any>;
  errors?: Record<string, string>;
}

const DataKepegawaianSection = ({ updateForm, formData, errors }: DataKepegawaianSectionProps) => {
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

  const { data: maritalsData, isLoading: isLoadingMaritals } = useGetMaritals({
    search: "",
    page: 1,
    limit: 100,
  });

  const positions = positionData?.data ?? [];
  const departments = departmentData?.data ?? [];
  const sections = sectionsData?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const maritals = maritalsData?.data ?? [];

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

  const maritalOptions = maritals.map((marital) => ({
    value: marital.id.toString(),
    label: `${marital.name} - Rp ${parseFloat(marital.amount).toLocaleString('id-ID')}`,
  }));

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
        id="field-idKaryawan"
        error={errors?.idKaryawan}
        onChange={(value) => updateForm("idKaryawan", value)}
      />

      <FormSelect
        label="Divisi"
        required
        placeholder="-- Pilih Divisi --"
        value={formData.divisi || ""}
        id="field-divisi"
        error={errors?.divisi}
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
        id="field-jabatan"
        error={errors?.jabatan}
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
        id="field-bagian"
        error={errors?.bagian}
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
        id="field-lokasi"
        error={errors?.lokasi}
        onValueChange={(value) => updateForm("lokasi", value)}
        options={locationOptions}
      />

      <FormInput
        label="Tanggal Bergabung"
        required
        type="date"
        value={formData.tanggalBergabung || ""}
        id="field-tanggalBergabung"
        error={errors?.tanggalBergabung}
        onChange={(value) => updateForm("tanggalBergabung", value)}
      />

      <FormInput
        label="Tanggal Kontrak"
        required
        type="date"
        value={formData.tanggalKontrak || ""}
        id="field-tanggalKontrak"
        error={errors?.tanggalKontrak}
        onChange={(value) => updateForm("tanggalKontrak", value)}
      />

      <FormInput
        label="Selesai Kontrak"
        required
        type="date"
        value={formData.selesaiKontrak || ""}
        id="field-selesaiKontrak"
        error={errors?.selesaiKontrak}
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
        id="field-kategori"
        error={errors?.kategori}
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
        id="field-marital"
        error={errors?.marital}
        onValueChange={(value) => updateForm("marital", value)}
        loading={isLoadingMaritals}
        emptyMessage="Tidak ada data marital"
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
        id="field-akun"
        error={errors?.akun}
        onValueChange={(value) => updateForm("akun", value)}
        options={accountStatusOptions}
      />

      <FormSelect
        label="Status Kerja"
        required
        placeholder="-- Pilih Status Kerja --"
        value={formData.statusKerja || ""}
        id="field-statusKerja"
        error={errors?.statusKerja}
        onValueChange={(value) => updateForm("statusKerja", value)}
        options={workStatusOptions}
      />

    </FormSection>
  );
};

export default DataKepegawaianSection;