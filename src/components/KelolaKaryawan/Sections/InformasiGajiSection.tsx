import React from "react";
import { Wallet } from "lucide-react";
import { FormCurrency } from "@/components/ui/form-currency";
import { FormSection } from "@/components/ui/form-section";

interface InformasiGajiSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
  errors?: Record<string, string>;
}

const InformasiGajiSection = ({ formData, updateForm, errors }: InformasiGajiSectionProps) => {
  return (
    <FormSection
      title="Informasi Gaji"
      icon={<Wallet className="w-5 h-5" />}
    >
      <FormCurrency
        label="Gaji Pokok"
        required
        placeholder="Masukkan gaji pokok"
        value={formData.gaji_pokok || 0}
        id="field-gaji_pokok"
        error={errors?.gaji_pokok}
        onChange={(value) => updateForm("gaji_pokok", value)}
      />

      <FormCurrency
        label="Tunjangan Jabatan"
        placeholder="Masukkan tunjangan jabatan"
        value={formData.tunjangan_jabatan || 0}
        onChange={(value) => updateForm("tunjangan_jabatan", value)}
      />

      <FormCurrency
        label="Tunjangan Project"
        placeholder="Masukkan tunjangan project"
        value={formData.tunjangan_project || 0}
        onChange={(value) => updateForm("tunjangan_project", value)}
      />

      <FormCurrency
        label="Tunjangan Makan"
        placeholder="Masukkan tunjangan makan"
        value={formData.tunjangan_makan || 0}
        onChange={(value) => updateForm("tunjangan_makan", value)}
      />

      <FormCurrency
        label="Tunjangan Transport"
        placeholder="Masukkan tunjangan transport"
        value={formData.tunjangan_transport || 0}
        onChange={(value) => updateForm("tunjangan_transport", value)}
      />

      <FormCurrency
        label="Tunjangan Lain-lain"
        placeholder="Masukkan tunjangan lain-lain"
        value={formData.tunjangan_lain || 0}
        onChange={(value) => updateForm("tunjangan_lain", value)}
      />
    </FormSection>
  );
};

export default InformasiGajiSection;