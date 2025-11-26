import React, { useEffect, useState } from "react";

const BankSection = ({ formData, updateForm }: any) => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState<any>(null);

  {/* Fetch Bank List */ }
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

  {/* Masking Nomor Rekening */ }
  const maskRekening = (value: string) => {
    if (!value) return "";
    const raw = value.replace(/\D/g, "");
    return raw.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">

      {/* Nama Pemilik Rekening */}
      <div>
        <label className="font-semibold">Nama Pemilik Rekening</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={formData.namaPemilik || ""}
          onChange={(e) => updateForm("namaPemilik", e.target.value)}
        />
      </div>

      {/* Nomor Rekening */}
      <div>
        <label className="font-semibold">Nomor Rekening</label>
        <input
          type="text"
          inputMode="numeric"
          className="border p-2 w-full rounded"
          value={formData.nomorRekening || ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            const masked = maskRekening(raw);
            updateForm("nomorRekening", masked);
          }}
        />
      </div>

      {/* Seleksi Bank */}
      <div>
        <label className="font-semibold">Bank</label>

        <div className="flex items-center gap-3">
          <select
            className="border p-2 w-full rounded"
            onChange={(e) => handleSelectBank(e.target.value)}
          >
            <option value="">-- Pilih Bank --</option>

            {banks.map((bank: any) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>

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
  );
};

export default BankSection;
