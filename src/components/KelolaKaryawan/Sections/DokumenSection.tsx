import React from "react";
import { FileText } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormFileSimple } from "@/components/ui/form-file-simple";
import { FormSection } from "@/components/ui/form-section";

interface DokumenSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
}

const DokumenSection = ({ formData, updateForm }: DokumenSectionProps) => {
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

      {/* NPWP Number with individual digit inputs */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-gray-700">Nomor NPWP</label>
        <div className="flex gap-1 flex-wrap">
          {[...Array(15)].map((_, i) => {
            const separators: { [key: number]: string } = {
              1: ".", 4: ".", 7: ".", 8: "-", 11: "."
            };

            const digits =
              formData.npwpNumber?.replace(/\D/g, "").padEnd(15, "").split("") || [];

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value.replace(/\D/g, "");
              if (!/^\d?$/.test(value)) return;

              const arr =
                formData.npwpNumber?.replace(/\D/g, "").split("") || Array(15).fill("");
              arr[i] = value;

              updateForm("npwpNumber", arr.join("").slice(0, 15));

              if (value && i < 14) {
                document.getElementById(`npwp_${i + 1}`)?.focus();
              }
            };

            const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) {
                document.getElementById(`npwp_${i - 1}`)?.focus();
              }
            };

            return (
              <div key={i} className="flex items-center">
                <input
                  id={`npwp_${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="border p-1 rounded w-9 text-center text-sm text-gray-800 h-[42px]"
                  value={digits[i] || ""}
                  onChange={handleChange}
                  onKeyDown={handleBackspace}
                />
                {separators[i] && (
                  <span className="font-bold text-gray-700 mx-1">{separators[i]}</span>
                )}
              </div>
            );
          })}
        </div>
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