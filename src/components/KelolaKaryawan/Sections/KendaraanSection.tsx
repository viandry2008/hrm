import React from "react";
import { Car } from "lucide-react";

const KendaraanSection = ({ updateForm, formData }: any) => {
  // Fungsi untuk menampilkan nama file setelah dipilih
  const getFileName = (file: File | null) => {
    return file ? file.name : "Tidak ada file yang dipilih";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Biru #2794EB */}
      <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
        <Car className="w-5 h-5" />
        <h3 className="font-semibold">Identitas Kendaraan</h3>
      </div>

      {/* Konten Form */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* UPLOAD SIM */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload SIM</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("sim", e.target.files?.[0])}
                className="hidden"
                id="upload-sim"
              />
              <label
                htmlFor="upload-sim"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.sim)}
              </div>
            </div>
          </div>

          {/* NOMOR SIM */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor SIM</label>
            <input
              type="text"
              placeholder="Nomor SIM"
              value={formData.nomorSIM || ""}
              onChange={(e) => updateForm("nomorSIM", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD STNK */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Upload STNK</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("stnk", e.target.files?.[0])}
                className="hidden"
                id="upload-stnk"
              />
              <label
                htmlFor="upload-stnk"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.stnk)}
              </div>
            </div>
          </div>

          {/* NOMOR STNK */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor STNK</label>
            <input
              type="text"
              placeholder="Nomor STNK"
              value={formData.nomorSTNK || ""}
              onChange={(e) => updateForm("nomorSTNK", e.target.value)}
              className="border p-2 rounded w-full text-sm text-gray-800"
            />
          </div>

          {/* UPLOAD GAMBAR DEPAN */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium text-sm text-gray-700">Upload Gambar Kendaraan Depan</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("gambarDepan", e.target.files?.[0])}
                className="hidden"
                id="upload-gambar-depan"
              />
              <label
                htmlFor="upload-gambar-depan"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.gambarDepan)}
              </div>
            </div>
          </div>

          {/* UPLOAD GAMBAR BELAKANG */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium text-sm text-gray-700">Upload Gambar Kendaraan Belakang</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("gambarBelakang", e.target.files?.[0])}
                className="hidden"
                id="upload-gambar-belakang"
              />
              <label
                htmlFor="upload-gambar-belakang"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.gambarBelakang)}
              </div>
            </div>
          </div>

          {/* UPLOAD GAMBAR SAMPING */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium text-sm text-gray-700">Upload Gambar Kendaraan Samping</label>
            <div className="flex items-center gap-0">
              <input
                type="file"
                onChange={(e) => updateForm("gambarSamping", e.target.files?.[0])}
                className="hidden"
                id="upload-gambar-samping"
              />
              <label
                htmlFor="upload-gambar-samping"
                className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
              >
                Pilih File
              </label>
              <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                {getFileName(formData.gambarSamping)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KendaraanSection;