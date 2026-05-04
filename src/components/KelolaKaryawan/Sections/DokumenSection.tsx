import React from "react";
import { FileText } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormFileSimple } from "@/components/ui/form-file-simple";
import { FormSection } from "@/components/ui/form-section";

interface DokumenSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
  errors?: Record<string, string>;
}

const DokumenSection = ({ formData, updateForm, errors }: DokumenSectionProps) => {
  const formatNPWP = (digits: string) => {
    if (!digits) return "";
    let formatted = "";
    const separators: { [key: number]: string } = {
      1: ".", 4: ".", 7: ".", 8: "-", 11: "."
    };
    for (let i = 0; i < digits.length; i++) {
      formatted += digits[i];
      if (separators[i]) {
        formatted += separators[i];
      }
    }
    return formatted;
  };
  return (
    <FormSection
      title="Dokumen Pendukung"
      icon={<FileText className="w-5 h-5" />}
    >
      <FormFileSimple
        label="Upload KTP"
        value={formData.ktp || null}
        onChange={(file) => updateForm("ktp", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="Nomor KTP"
        placeholder="32xxxxxx"
        value={formData.nomorKTP || ""}
        onChange={(value) => updateForm("nomorKTP", value)}
      />

      <FormFileSimple
        label="Upload Kartu Keluarga"
        value={formData.kartuKeluarga || null}
        onChange={(file) => updateForm("kartuKeluarga", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="No Kartu Keluarga"
        placeholder="Nomor kartu keluarga"
        value={formData.noKartuKeluarga || ""}
        onChange={(value) => updateForm("noKartuKeluarga", value)}
      />

      <FormFileSimple
        label="Upload NPWP"
        value={formData.npwp || null}
        onChange={(file) => updateForm("npwp", file)}
        accept="image/*,.pdf"
      />

      {/* NPWP Number with formatted input */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-gray-700">Nomor NPWP</label>
        <FormInput
          label=""
          placeholder="12.345.678.9-012.345"
          value={formatNPWP(formData.npwpNumber || "")}
          onChange={(value) => {
            const raw = value.replace(/\D/g, "").slice(0, 15);
            updateForm("npwpNumber", raw);
          }}
        />
      </div>

      <FormFileSimple
        label="Upload KPJ"
        value={formData.kpj || null}
        onChange={(file) => updateForm("kpj", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="Nomor KPJ"
        placeholder="Nomor KPJ"
        value={formData.nomorKPJ || ""}
        onChange={(value) => updateForm("nomorKPJ", value)}
      />

      <FormFileSimple
        label="Upload JKN"
        value={formData.jkn || null}
        onChange={(file) => updateForm("jkn", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="Nomor JKN"
        placeholder="Nomor JKN"
        value={formData.nomorJKN || ""}
        onChange={(value) => updateForm("nomorJKN", value)}
      />

      <FormFileSimple
        label="Upload CV / Riwayat Hidup"
        value={formData.cv || null}
        onChange={(file) => updateForm("cv", file)}
        accept=".pdf,.doc,.docx"
      />

      <FormFileSimple
        label="Upload File Pendukung Lainnya"
        value={formData.pendukungLain || null}
        onChange={(file) => updateForm("pendukungLain", file)}
        accept=".pdf,.doc,.docx,image/*"
      />
    </FormSection>
  );
};

export default DokumenSection;