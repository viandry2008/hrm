import React from "react";
import { FileText } from "lucide-react";

const DokumenSection = ({ updateForm, formData }: any) => {
  // Fungsi untuk menampilkan nama file setelah dipilih
  const getFileName = (file: File | null) => {
    return file ? file.name : "Tidak ada file yang dipilih";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Biru #2794EB */}
      <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
        <FileText className="w-5 h-5" />
        <h3 className="font-semibold">Dokumen Pendukung</h3>
      </div>

      {/* Konten Form */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* UPLOAD KTP */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload KTP</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("ktp", e.target.files?.[0])}
                className="hidden"
                id="upload-ktp"
              />
              <label
                htmlFor="upload-ktp"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.ktp)}
              </div>
            </div>
          </div>

          {/* NOMOR KTP */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor KTP</label>
            <input
              type="text"
              placeholder="32xxxxxx"
              value={formData.nomorKTP || ""}
              onChange={(e) => updateForm("nomorKTP", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD KARTU KELUARGA */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload Kartu Keluarga</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("kartuKeluarga", e.target.files?.[0])}
                className="hidden"
                id="upload-kartu-keluarga"
              />
              <label
                htmlFor="upload-kartu-keluarga"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.kartuKeluarga)}
              </div>
            </div>
          </div>

          {/* NO KARTU KELUARGA */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">No Kartu Keluarga</label>
            <input
              type="text"
              placeholder="Nama Bapak"
              value={formData.noKartuKeluarga || ""}
              onChange={(e) => updateForm("noKartuKeluarga", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD NPWP */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload NPWP</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("npwp", e.target.files?.[0])}
                className="hidden"
                id="upload-npwp"
              />
              <label
                htmlFor="upload-npwp"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.npwp)}
              </div>
            </div>
          </div>

          {/* NOMOR NPWP (dengan input box terpisah) */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor NPWP</label>
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
                      className="border p-1 rounded w-9 text-center text-sm text-gray-800"
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

          {/* UPLOAD KPJ */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload KPJ</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("kpj", e.target.files?.[0])}
                className="hidden"
                id="upload-kpj"
              />
              <label
                htmlFor="upload-kpj"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.kpj)}
              </div>
            </div>
          </div>

          {/* NOMOR KPJ */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor KPJ</label>
            <input
              type="text"
              placeholder="32xxxxxx"
              value={formData.nomorKPJ || ""}
              onChange={(e) => updateForm("nomorKPJ", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD JKN */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload JKN</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("jkn", e.target.files?.[0])}
                className="hidden"
                id="upload-jkn"
              />
              <label
                htmlFor="upload-jkn"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.jkn)}
              </div>
            </div>
          </div>

          {/* NOMOR JKN */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor JKN</label>
            <input
              type="text"
              placeholder="32xxxxxx"
              value={formData.nomorJKN || ""}
              onChange={(e) => updateForm("nomorJKN", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD CV / RIWAYAT HIDUP */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload CV / Riwayat Hidup</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("cv", e.target.files?.[0])}
                className="hidden"
                id="upload-cv"
              />
              <label
                htmlFor="upload-cv"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.cv)}
              </div>
            </div>
          </div>

          {/* UPLOAD FILE PENDUKUNG LAINNYA */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload File Pendukung Lainnya</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("pendukungLain", e.target.files?.[0])}
                className="hidden"
                id="upload-pendukung-lain"
              />
              <label
                htmlFor="upload-pendukung-lain"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.pendukungLain)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DokumenSection;