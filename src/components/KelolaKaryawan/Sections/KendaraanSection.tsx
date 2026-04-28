import React from "react";
import { Car } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormFileSimple } from "@/components/ui/form-file-simple";
import { FormSection } from "@/components/ui/form-section";

interface KendaraanSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
}

const KendaraanSection = ({ formData, updateForm }: KendaraanSectionProps) => {
  return (
    <FormSection
      title="Identitas Kendaraan"
      icon={<Car className="w-5 h-5" />}
    >
      <FormFileSimple
        label="Upload SIM"
        value={formData.sim || null}
        onChange={(file) => updateForm("sim", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="Nomor SIM"
        placeholder="Nomor SIM"
        value={formData.nomorSIM || ""}
        onChange={(value) => updateForm("nomorSIM", value)}
      />

      <FormFileSimple
        label="Upload STNK"
        value={formData.stnk || null}
        onChange={(file) => updateForm("stnk", file)}
        accept="image/*,.pdf"
      />

      <FormInput
        label="Nomor STNK"
        placeholder="Nomor STNK"
        value={formData.nomorSTNK || ""}
        onChange={(value) => updateForm("nomorSTNK", value)}
      />

      <FormFileSimple
        label="Upload Gambar Kendaraan Depan"
        value={formData.gambarDepan || null}
        onChange={(file) => updateForm("gambarDepan", file)}
        accept="image/*"
        className="col-span-2"
      />

      <FormFileSimple
        label="Upload Gambar Kendaraan Belakang"
        value={formData.gambarBelakang || null}
        onChange={(file) => updateForm("gambarBelakang", file)}
        accept="image/*"
        className="col-span-2"
      />

      <FormFileSimple
        label="Upload Gambar Kendaraan Samping"
        value={formData.gambarSamping || null}
        onChange={(file) => updateForm("gambarSamping", file)}
        accept="image/*"
        className="col-span-2"
      />
    </FormSection>
  );
};

export default KendaraanSection;