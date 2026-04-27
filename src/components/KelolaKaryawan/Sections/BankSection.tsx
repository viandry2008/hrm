import React, { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBanks } from "@/api/bank/bank.query";

interface BankSectionProps {
  updateForm: (key: string, value: any) => void;
  formData: Record<string, any>;
}

const BankSection = ({ formData, updateForm }: BankSectionProps) => {
  const { data: bankData, isLoading: isLoadingBanks } = useGetBanks({
    search: "",
    page: 1,
    limit: 100,
  });

  const banks = bankData?.data ?? [];

  // Masking nomor rekening
  const maskRekening = (value: string) => {
    if (!value) return "";
    const raw = value.replace(/\D/g, "");
    return raw.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-2 p-3 bg-brand text-white rounded-t-lg">
        <CreditCard className="w-5 h-5" />
        <h3 className="font-semibold">Detail Akun Bank</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* Nama Pemilik */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              className="border p-2 w-full rounded text-sm text-gray-800"
              placeholder="Masukkan nama lengkap"
              value={formData.namaPemilik || ""}
              onChange={(e) => updateForm("namaPemilik", e.target.value)}
            />
          </div>

          {/* Nomor Rekening */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">
              Nomor Rekening
            </label>
            <input
              type="text"
              inputMode="numeric"
              className="border p-2 w-full rounded text-sm text-gray-800"
              placeholder="1234-5678-9012-3456"
              value={formData.nomorRekening || ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const masked = maskRekening(raw);
                updateForm("nomorRekening", masked);
              }}
            />
          </div>

          {/* Select Bank (FIXED) */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Bank</label>

            <Select
              onValueChange={(value) => updateForm("bank", value)}
              value={formData?.bank || ""}
            >
              <SelectTrigger className="h-[42px] bg-white text-sm">
                <SelectValue
                  placeholder={
                    isLoadingBanks ? "Loading..." : "-- Pilih Bank --"
                  }
                />
              </SelectTrigger>

              <SelectContent className="text-sm max-h-60">
                {isLoadingBanks ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : banks.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    Tidak ada data bank
                  </SelectItem>
                ) : (
                  banks.map((bank) => (
                    <SelectItem
                      key={bank.id}
                      value={bank.id.toString()}
                    >
                      {bank.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BankSection;