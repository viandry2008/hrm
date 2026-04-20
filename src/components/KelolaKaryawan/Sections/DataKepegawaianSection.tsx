import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, AlertTriangle, Calendar } from "lucide-react";

const DataKepegawaianSection = ({ updateForm, formData }: any) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2 p-3 bg-brand text-white rounded-t-lg">
        <Briefcase className="w-5 h-5" />
        <h3 className="font-semibold">Data Kepegawaian</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">

          {/* ID Karyawan */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">ID Karyawan <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              className="bg-[#f9fbfd] text-sm"
              placeholder="ID otomatis"
              value={formData.idKaryawan || ""}
              readOnly
            />
          </div>

          {/* Divisi */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Divisi <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("divisi", value)}
              defaultValue={formData?.divisi}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Divisi --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                <SelectItem value="HR & GA">HR & GA</SelectItem>
                <SelectItem value="Warehouse">Warehouse</SelectItem>
                <SelectItem value="Produksi">Produksi</SelectItem>
                <SelectItem value="Operasional">Operasional</SelectItem>
                <SelectItem value="Logistik">Logistik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jabatan */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Jabatan <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("jabatan", value)}
              defaultValue={formData?.jabatan}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Jabatan --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Leader">Leader</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Senior Manager">Senior Manager</SelectItem>
                <SelectItem value="General Manager">General Manager</SelectItem>
                <SelectItem value="Head">Head</SelectItem>
                <SelectItem value="Asisten Direktur">Asisten Direktur</SelectItem>
                <SelectItem value="Direktur">Direktur</SelectItem>
                <SelectItem value="Komisaris">Komisaris</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bagian */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Bagian <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("bagian", value)}
              defaultValue={formData?.bagian}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Bagian --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="IT Support">IT Support</SelectItem>
                <SelectItem value="IT Helpdesk">IT Helpdesk</SelectItem>
                <SelectItem value="IT Management">IT Management</SelectItem>
                <SelectItem value="System Analyst">System Analyst</SelectItem>
                <SelectItem value="Infrastructure & Network">Infrastructure & Network</SelectItem>
                <SelectItem value="Database Administrator">Database Administrator</SelectItem>
                <SelectItem value="Back End Developer">Back End Developer</SelectItem>
                <SelectItem value="Front End Developer">Front End Developer</SelectItem>
                <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
                <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                <SelectItem value="Product Owner">Product Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lokasi Kerja */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Lokasi Kerja <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("lokasi", value)}
              defaultValue={formData?.lokasi}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Lokasi --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="PT Proven Force Indonesia">PT Proven Force Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tanggal Bergabung */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Tanggal Bergabung <span className="text-red-500">*</span></Label>
            <Input
              type="date"
              className="bg-[#ffff] text-sm"
              value={formData.tanggalBergabung || ""}
              onChange={(e) => updateForm("tanggalBergabung", e.target.value)}
            />
          </div>

          {/* Tanggal Kontrak */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Tanggal Kontrak <span className="text-red-500">*</span></Label>
            <Input
              type="date"
              className="bg-[#ffff] text-sm"
              value={formData.tanggalKontrak || ""}
              onChange={(e) => updateForm("tanggalKontrak", e.target.value)}
            />
          </div>

          {/* Selesai Kontrak */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Selesai Kontrak <span className="text-red-500">*</span></Label>
            <Input
              type="date"
              className="bg-[#ffff] text-sm"
              value={formData.selesaiKontrak || ""}
              onChange={(e) => updateForm("selesaiKontrak", e.target.value)}
            />
          </div>

          {/* Grup */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Grup</Label>
            <Select
              onValueChange={(value) => updateForm("grup", value)}
              defaultValue={formData?.grup}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Grup --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Kategori Karyawan */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Kategori Karyawan <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("kategori", value)}
              defaultValue={formData?.kategori}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Kategori --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Magang">Magang</SelectItem>
                <SelectItem value="PKWT">PKWT</SelectItem>
                <SelectItem value="PKWTT">PKWTT</SelectItem>
                <SelectItem value="KHL">KHL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Marital */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status Marital <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("marital", value)}
              defaultValue={formData?.marital}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Status Marital --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="TK/0">TK/0 - Rp 54.000.000</SelectItem>
                <SelectItem value="TK/1">TK/1 - Rp 58.500.000</SelectItem>
                <SelectItem value="TK/2">TK/2 - Rp 63.000.000</SelectItem>
                <SelectItem value="TK/3">TK/3 - Rp 67.500.000</SelectItem>
                <SelectItem value="K/0">K/0 - Rp 58.500.000</SelectItem>
                <SelectItem value="K/1">K/1 - Rp 63.000.000</SelectItem>
                <SelectItem value="K/2">K/2 - Rp 67.500.000</SelectItem>
                <SelectItem value="K/3">K/3 - Rp 72.000.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Referensi */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Referensi</Label>
            <Input
              type="text"
              placeholder="Referensi"
              className="bg-white text-sm"
              onChange={(e) => updateForm("referensi", e.target.value)}
            />
          </div>

          {/* No SIO */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">No SIO</Label>
            <Input
              type="text"
              placeholder="32xxxxxx"
              className="bg-white text-sm"
              onChange={(e) => updateForm("noSio", e.target.value)}
            />
          </div>

          {/* Status Akun */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status Akun <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("akun", value)}
              defaultValue={formData?.akun}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Status Akun --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Kerja */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status Kerja <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => updateForm("statusKerja", value)}
              defaultValue={formData?.statusKerja}
            >
              <SelectTrigger className="h-[42px] bg-white">
                <SelectValue placeholder="-- Pilih Status Kerja --" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NPWP  */}
          <div className="col-span-2 flex flex-col gap-2 mt-2">
            <Label className="font-semibold text-sm">Apakah karyawan memiliki NPWP? <span className="text-red-500">*</span></Label>
            <div className="flex items-center gap-8">

              {/* Pilihan YA */}
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="punyaNPWP"
                    value="YA"
                    checked={formData.punyaNPWP === "YA"}
                    onChange={(e) => updateForm("punyaNPWP", e.target.value)}
                    className="w-5 h-5 border-2 border-gray-300 text-[#0F2A4D] focus:outline-none focus:ring-0 accent-[#0F2A4D] cursor-pointer transition-colors"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-[#0F2A4D] transition-colors">
                  YA
                </span>
              </label>

              {/* Pilihan TIDAK */}
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="punyaNPWP"
                    value="TIDAK"
                    checked={formData.punyaNPWP === "TIDAK"}
                    onChange={(e) => updateForm("punyaNPWP", e.target.value)}
                    className="w-5 h-5 border-2 border-gray-300 text-[#0F2A4D] focus:outline-none focus:ring-0 accent-[#0F2A4D] cursor-pointer transition-colors"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-[#0F2A4D] transition-colors">
                  TIDAK
                </span>
              </label>

            </div>

            {/* Warning otomatis */}
            {formData.punyaNPWP === "TIDAK" && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Jika karyawan <strong>tidak memiliki NPWP</strong>, potongan PPh Pasal 21 akan dikenakan tarif <strong>20% lebih tinggi</strong> sesuai ketentuan perpajakan.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataKepegawaianSection;