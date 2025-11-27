import React, { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BankSection = ({ formData, updateForm }: any) => {
  const [banks, setBanks] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<any>(null);

  // Fetch Bank List
  useEffect(() => {
    fetch("https://api.saas.dana.id")
      .then((res) => res.json())
      .then((data) => setBanks(data))
      .catch(() => setBanks([]));
  }, []);

  const handleSelectBank = (code: string) => {
    const bank = banks.find((b: any) => b.code === code);
    setSelectedBank(bank);

    updateForm("bank", {
      kode: bank?.code,
      nama: bank?.name,
      logo: bank?.logo
    });
  };

  // Masking Nomor Rekening
  const maskRekening = (value: string) => {
    if (!value) return "";
    const raw = value.replace(/\D/g, "");
    return raw.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  // Cari bank yang dipilih berdasarkan formData
  useEffect(() => {
    if (formData.bank?.kode) {
      const bank = banks.find((b: any) => b.code === formData.bank.kode);
      if (bank) setSelectedBank(bank);
    }
  }, [formData.bank?.kode, banks]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Biru #2794EB */}
      <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
        <CreditCard className="w-5 h-5" />
        <h3 className="font-semibold">Detail Akun Bank</h3>
      </div>

      {/* Konten Form */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* Nama Pemilik Rekening */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nama Pemilik Rekening</label>
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
            <label className="font-medium text-sm text-gray-700">Nomor Rekening</label>
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

          {/* Seleksi Bank — Pakai Select UI Component */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Bank</label>
            <div className="flex items-center gap-3">
              <Select
                onValueChange={handleSelectBank}
                value={formData.bank?.kode || ""}
              >
                <SelectTrigger className="h-[42px] bg-white text-sm">
                  <SelectValue placeholder="-- Pilih Bank --" />
                </SelectTrigger>
                <SelectContent className="text-sm max-h-60">
                  {banks.map((bank: any) => (
                    <SelectItem key={bank.code} value={bank.code}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedBank && (
                <img
                  src={selectedBank.logo}
                  alt="Logo Bank"
                  className="w-12 h-12 border rounded bg-white p-1 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankSection;