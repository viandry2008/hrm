import React from "react";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DataPribadiSection = ({ formData, updateForm }: any) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Biru #2794EB */}
      <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
        <User className="w-5 h-5" />
        <h3 className="font-semibold">Data Pribadi</h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">
          {/* FOTO */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {formData.foto ? (
                <img
                  src={URL.createObjectURL(formData.foto)}
                  alt="foto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">Default</span>
              )}
            </div>

            <div className="flex-1">
              <Label className="font-semibold mb-1 block">File Foto Profile</Label>
              <Input
                type="file"
                onChange={(e) => updateForm("foto", e.target.files?.[0])}
                className="
                h-[42px]
                h-[42px]
                file:bg-blue-600
                file:text-white
                file:border-0
                file:px-4
                file:py-2
                file:rounded-md
                file:cursor-pointer
                hover:file:bg-blue-700"
              />
            </div>
          </div>

          {/* NAMA */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nama Karyawan *</Label>
            <Input
              type="text"
              placeholder="Nama Karyawan"
              value={formData.nama || ""}
              onChange={(e) => updateForm("nama", e.target.value)}
            />
          </div>

          {/* TELEPON */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nomor Telepon *</Label>
            <Input
              type="text"
              placeholder="08xxx"
              value={formData.telepon || ""}
              onChange={(e) => updateForm("telepon", e.target.value)}
            />
          </div>

          {/* TEMPAT LAHIR */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Tempat Lahir *</Label>
            <Input
              type="text"
              placeholder="Tempat Lahir"
              className="bg-[#ffff] text-sm"
              value={formData.tempatLahir || ""}
              onChange={(e) => updateForm("tempatLahir", e.target.value)}
            />
          </div>

          {/* TANGGAL LAHIR */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Tanggal Lahir *</Label>
            <Input
              type="date"
              className="bg-[#ffff] text-sm"
              onChange={(e) => updateForm("tanggallahir", e.target.value)}
            />
          </div>

          {/* JENIS KELAMIN */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Jenis Kelamin *</Label>
            <Select onValueChange={(value) => updateForm("jeniskelamin", value)}>
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Jenis Kelamin --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Laki - Laki">Laki - Laki</SelectItem>
                <SelectItem value="Perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* ALAMAT KTP */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Alamat KTP *</Label>
            <textarea
              className="border rounded-md px-3 py-2 bg-white"
              onChange={(e) => updateForm("alamatKTP", e.target.value)}
              value={formData.alamatKTP || ""}
            />
            <p className="text-xs italic">*) Isi alamat sesuai KTP</p>
          </div>

          {/* ALAMAT DOMISILI */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Alamat Domisili *</Label>
            <textarea
              className="border rounded-md px-3 py-2 bg-white"
              onChange={(e) => updateForm("alamatDomisili", e.target.value)}
            />
            <p className="text-xs italic">*) Jika mengisi domisili harap input nama kota</p>
          </div>

          {/* PENDIDIKAN */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Pendidikan *</Label>
            <Select onValueChange={(value) => updateForm("pendidikan", value)}>
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Pendidikan --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA/SMK">SMA / SMK</SelectItem>
                <SelectItem value="D1">D1</SelectItem>
                <SelectItem value="D2">D2</SelectItem>
                <SelectItem value="D3">D3</SelectItem>
                <SelectItem value="S1">S1</SelectItem>
                <SelectItem value="S2">S2</SelectItem>
                <SelectItem value="S3">S3</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* AGAMA */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Agama *</Label>
            <Select onValueChange={(value) => updateForm("agama", value)}>
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Agama --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Islam">Islam</SelectItem>
                <SelectItem value="Kristen">Kristen</SelectItem>
                <SelectItem value="Katolik">Katolik</SelectItem>
                <SelectItem value="Hindu">Hindu</SelectItem>
                <SelectItem value="Buddha">Buddha</SelectItem>
                <SelectItem value="Konghucu">Konghucu</SelectItem>
                <SelectItem value="Atheis">Atheis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NAMA SUAMI/ISTRI */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nama Suami/Istri</Label>
            <Input
              type="text"
              placeholder="contoh: nama1, nama2, dst"
              value={formData.namasuamiistri || ""}
              onChange={(e) => updateForm("namaSuamiIstri", e.target.value)}
            />
          </div>

          {/* NAMA ANAK */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nama Anak</Label>
            <Input
              type="text"
              placeholder="Contoh: Nama1, Nama2, dst"
              onChange={(e) => updateForm("namaAnak", e.target.value)}
            />
          </div>

          {/* JUMLAH ANAK */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Jumlah Anak</Label>
            <Input
              type="number"
              placeholder="Total jumlah anak"
              onChange={(e) => updateForm("jumlahAnak", e.target.value)}
            />
          </div>

          {/* NAMA BAPAK */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nama Bapak</Label>
            <Input
              type="text"
              placeholder="Nama Bapak"
              onChange={(e) => updateForm("namaBapak", e.target.value)}
            />
          </div>

          {/* NAMA IBU */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold mb-1">Nama Ibu</Label>
            <Input
              type="text"
              placeholder="Nama Ibu"
              onChange={(e) => updateForm("namaIbu", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPribadiSection;