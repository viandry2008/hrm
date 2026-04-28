import React from "react";
import { CreditCard } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormSection } from "@/components/ui/form-section";
import { useGetBanks } from "@/api/bank/bank.query";

interface BankSectionProps {
  formData: Record<string, any>;
  updateForm: (key: string, value: any) => void;
}

const BankSection = ({ formData, updateForm }: BankSectionProps) => {
  const { data: bankData, isLoading: isLoadingBanks } = useGetBanks({
    search: "",
    page: 1,
    limit: 100,
  });

  const banks = bankData?.data ?? [];
  const bankOptions = banks.map((bank: any) => ({
    value: bank.id.toString(),
    label: bank.name,
  }));

  // Masking Nomor Rekening
  const maskRekening = (value: string) => {
    if (!value) return "";
    const raw = value.replace(/\D/g, "");
    return raw.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  return (
    <FormSection
      title="Detail Akun Bank"
      icon={<CreditCard className="w-5 h-5" />}
    >
      <FormInput
        label="Nama Pemilik Rekening"
        placeholder="Masukkan nama lengkap"
        value={formData.namaPemilik || ""}
        onChange={(value) => updateForm("namaPemilik", value)}
      />

      <FormInput
        label="Nomor Rekening"
        placeholder="1234-5678-9012-3456"
        value={formData.nomorRekening || ""}
        onChange={(value) => {
          const raw = value.replace(/\D/g, "");
          const masked = maskRekening(raw);
          updateForm("nomorRekening", masked);
        }}
      />

      <FormSelect
        label="Bank"
        placeholder="-- Pilih Bank --"
        value={formData?.bank || ""}
        onValueChange={(value) => updateForm("bank", value)}
        loading={isLoadingBanks}
        emptyMessage="Tidak ada data bank"
        options={bankOptions}
      />
    </FormSection>
  );
};

export default BankSection;