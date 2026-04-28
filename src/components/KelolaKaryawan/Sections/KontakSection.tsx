import React from "react";
import { Phone } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormSection } from "@/components/ui/form-section";

interface KontakSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
}

const KontakSection = ({ formData, updateForm }: KontakSectionProps) => {
  const relationshipOptions = [
    { value: "Orang Tua (Ayah)", label: "Orang Tua (Ayah)" },
    { value: "Orang Tua (Ibu)", label: "Orang Tua (Ibu)" },
    { value: "Suami", label: "Suami" },
    { value: "Istri", label: "Istri" },
    { value: "Saudara Kandung", label: "Saudara Kandung" },
    { value: "Saudara Sepupu", label: "Saudara Sepupu" },
    { value: "Teman", label: "Teman" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  return (
    <FormSection
      title="Kontak Darurat"
      icon={<Phone className="w-5 h-5" />}
    >
      <FormInput
        label="Nama lengkap"
        placeholder="Nama kontak darurat"
        value={formData.namaDarurat || ""}
        onChange={(value) => updateForm("namaDarurat", value)}
      />

      <FormSelect
        label="Hubungan"
        placeholder="-- Pilih Hubungan --"
        value={formData.hubunganDarurat || ""}
        onValueChange={(value) => updateForm("hubunganDarurat", value)}
        options={relationshipOptions}
      />

      <FormInput
        label="Nomor Telepon"
        placeholder="08xxx"
        value={formData.nomorTeleponDarurat || ""}
        onChange={(value) => updateForm("nomorTeleponDarurat", value)}
      />
    </FormSection>
  );
};

export default KontakSection;