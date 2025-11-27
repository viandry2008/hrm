import React from "react";
import { Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const KontakSection = ({ updateForm, formData }: any) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Biru #2794EB */}
      <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
        <Phone className="w-5 h-5" />
        <h3 className="font-semibold">Kontak Darurat</h3>
      </div>

      {/* Konten Form */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* Nama Lengkap */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nama lengkap</label>
            <input
              type="text"
              className="border p-2 w-full rounded text-sm text-gray-800"
              placeholder="Nama kontak"
              value={formData.namaDarurat || ""}
              onChange={(e) => updateForm("namaDarurat", e.target.value)}
            />
          </div>

          {/* Hubungan — menggunakan Select UI Component */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Hubungan</label>
            <Select
              onValueChange={(value) => updateForm("hubunganDarurat", value)}
              value={formData.hubunganDarurat || ""}
            >
              <SelectTrigger className="h-[42px] bg-white text-sm">
                <SelectValue placeholder="-- Pilih Hubungan --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Orang Tua (Ayah)">Orang Tua (Ayah)</SelectItem>
                <SelectItem value="Orang Tua (Ibu)">Orang Tua (Ibu)</SelectItem>
                <SelectItem value="Suami">Suami</SelectItem>
                <SelectItem value="Istri">Istri</SelectItem>
                <SelectItem value="Saudara Kandung">Saudara Kandung</SelectItem>
                <SelectItem value="Saudara Sepupu">Saudara Sepupu</SelectItem>
                <SelectItem value="Teman">Teman</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              className="border p-2 w-full rounded text-sm text-gray-800"
              placeholder="08xxx"
              value={formData.nomorTeleponDarurat || ""}
              onChange={(e) => updateForm("nomorTeleponDarurat", e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default KontakSection;