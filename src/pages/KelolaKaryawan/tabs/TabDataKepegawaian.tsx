import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check, X, Edit, Calendar } from 'lucide-react';

const TabDataKepegawaian = ({ data }: any) => {
  const [formData, setFormData] = useState({
    idKaryawan: '',
    divisi: '',
    jabatan: '',
    bagian: '',
    lokasiKerja: '',
    tanggalBergabung: '',
    tanggalKontrak: '',
    selesaiKontrak: '',
    kategoriKaryawan: '',
    grup: '',
    statusMarital: '',
    referensi: '',
    noSIO: '',
    statusAkun: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  const tanggalBergabungRef = useRef<HTMLInputElement>(null);
  const tanggalKontrakRef = useRef<HTMLInputElement>(null);
  const selesaiKontrakRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      const initialData = {
        idKaryawan: data.id || '',
        divisi: data.divisi || '',
        jabatan: data.jabatan || '',
        bagian: data.bagian || '',
        lokasiKerja: data.lokasiKerja || '',
        tanggalBergabung: data.tanggalBergabung || '',
        tanggalKontrak: data.tanggalKontrak || '',
        selesaiKontrak: data.selesaiKontrak || '',
        kategoriKaryawan: data.kategori || '',
        grup: data.grup || '',
        statusMarital: data.statusMarital || '',
        referensi: data.referensi || '',
        noSIO: data.noSIO || '',
        statusAkun: data.statusAkun || '',
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving ', formData);
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const openDatePicker = (ref: any) => {
    if (ref.current && isEditing) {
      ref.current.showPicker();
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ID Karyawan */}
          <div className="space-y-2">
            <Label htmlFor="idKaryawan" className="text-sm font-medium">
              ID Karyawan <span className="text-red-500">*</span>
            </Label>
            <Input
              id="idKaryawan"
              placeholder="ID otomatis"
              value={formData.idKaryawan}
              disabled
              className="bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Divisi */}
          <div className="space-y-2">
            <Label htmlFor="divisi" className="text-sm font-medium">
              Divisi <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.divisi}
                onValueChange={(value) => handleInputChange('divisi', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Divisi --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.divisi || '-- Pilih Divisi --'}
              </div>
            )}
          </div>

          {/* Jabatan */}
          <div className="space-y-2">
            <Label htmlFor="jabatan" className="text-sm font-medium">
              Jabatan <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.jabatan}
                onValueChange={(value) => handleInputChange('jabatan', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Jabatan --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Senior Staff">Senior Staff</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Senior Manager">Senior Manager</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.jabatan || '-- Pilih Jabatan --'}
              </div>
            )}
          </div>

          {/* Bagian */}
          <div className="space-y-2">
            <Label htmlFor="bagian" className="text-sm font-medium">
              Bagian <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.bagian}
                onValueChange={(value) => handleInputChange('bagian', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Bagian --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.bagian || '-- Pilih Bagian --'}
              </div>
            )}
          </div>

          {/* Lokasi Kerja */}
          <div className="space-y-2">
            <Label htmlFor="lokasiKerja" className="text-sm font-medium">
              Lokasi Kerja <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.lokasiKerja}
                onValueChange={(value) => handleInputChange('lokasiKerja', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Lokasi --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Bandung">Bandung</SelectItem>
                  <SelectItem value="Surabaya">Surabaya</SelectItem>
                  <SelectItem value="Medan">Medan</SelectItem>
                  <SelectItem value="Makassar">Makassar</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.lokasiKerja || '-- Pilih Lokasi --'}
              </div>
            )}
          </div>

          {/* Tanggal Bergabung */}
          <div className="space-y-2">
            <Label htmlFor="tanggalBergabung" className="text-sm font-medium">
              Tanggal Bergabung <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                ref={tanggalBergabungRef}
                id="tanggalBergabung"
                type="date"
                value={formData.tanggalBergabung}
                onChange={(e) => handleInputChange('tanggalBergabung', e.target.value)}
                disabled={!isEditing}
                className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
              />
              {isEditing && (
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => openDatePicker(tanggalBergabungRef)}
                />
              )}
            </div>
          </div>

          {/* Tanggal Kontrak */}
          <div className="space-y-2">
            <Label htmlFor="tanggalKontrak" className="text-sm font-medium">
              Tanggal Kontrak <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                ref={tanggalKontrakRef}
                id="tanggalKontrak"
                type="date"
                value={formData.tanggalKontrak}
                onChange={(e) => handleInputChange('tanggalKontrak', e.target.value)}
                disabled={!isEditing}
                className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
              />
              {isEditing && (
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => openDatePicker(tanggalKontrakRef)}
                />
              )}
            </div>
          </div>

          {/* Selesai Kontrak */}
          <div className="space-y-2">
            <Label htmlFor="selesaiKontrak" className="text-sm font-medium">
              Selesai Kontrak <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                ref={selesaiKontrakRef}
                id="selesaiKontrak"
                type="date"
                value={formData.selesaiKontrak}
                onChange={(e) => handleInputChange('selesaiKontrak', e.target.value)}
                disabled={!isEditing}
                className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
              />
              {isEditing && (
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => openDatePicker(selesaiKontrakRef)}
                />
              )}
            </div>
          </div>

          {/* Kategori Karyawan */}
          <div className="space-y-2">
            <Label htmlFor="kategoriKaryawan" className="text-sm font-medium">
              Kategori Karyawan <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.kategoriKaryawan}
                onValueChange={(value) => handleInputChange('kategoriKaryawan', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Kategori --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.kategoriKaryawan || '-- Pilih Kategori --'}
              </div>
            )}
          </div>

          {/* Grup */}
          <div className="space-y-2">
            <Label htmlFor="grup" className="text-sm font-medium">
              Grup
            </Label>
            {isEditing ? (
              <Select
                value={formData.grup}
                onValueChange={(value) => handleInputChange('grup', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Grup --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.grup || '-- Pilih Grup --'}
              </div>
            )}
          </div>

          {/* Status Marital */}
          <div className="space-y-2">
            <Label htmlFor="statusMarital" className="text-sm font-medium">
              Status Marital <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.statusMarital}
                onValueChange={(value) => handleInputChange('statusMarital', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Status Marital --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-- Pilih Status Marital --">-- Pilih Status Marital --</SelectItem>
                  <SelectItem value="TK/0 - Rp 54.000.000">TK/0 - Rp 54.000.000</SelectItem>
                  <SelectItem value="TK/1 - Rp 58.500.000">TK/1 - Rp 58.500.000</SelectItem>
                  <SelectItem value="TK/2 - Rp 63.000.000">TK/2 - Rp 63.000.000</SelectItem>
                  <SelectItem value="TK/3 - Rp 67.500.000">TK/3 - Rp 67.500.000</SelectItem>
                  <SelectItem value="K/0 - Rp 58.500.000">K/0 - Rp 58.500.000</SelectItem>
                  <SelectItem value="K/1 - Rp 63.000.000">K/1 - Rp 63.000.000</SelectItem>
                  <SelectItem value="K/2 - Rp 67.500.000">K/2 - Rp 67.500.000</SelectItem>
                  <SelectItem value="K/3 - Rp 72.000.000">K/3 - Rp 72.000.000</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.statusMarital || '-- Pilih Status Marital --'}
              </div>
            )}
          </div>

          {/* Referensi */}
          <div className="space-y-2">
            <Label htmlFor="referensi" className="text-sm font-medium">
              Referensi
            </Label>
            <Input
              id="referensi"
              placeholder="Referensi"
              value={formData.referensi}
              onChange={(e) => handleInputChange('referensi', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* No SIO */}
          <div className="space-y-2">
            <Label htmlFor="noSIO" className="text-sm font-medium">
              No SIO
            </Label>
            <Input
              id="noSIO"
              placeholder="32xxxxx"
              value={formData.noSIO}
              onChange={(e) => handleInputChange('noSIO', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Status Akun */}
          <div className="space-y-2">
            <Label htmlFor="statusAkun" className="text-sm font-medium">
              Status Akun <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.statusAkun}
                onValueChange={(value) => handleInputChange('statusAkun', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Status Akun --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.statusAkun || '-- Pilih Status Akun --'}
              </div>
            )}
          </div>

        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        )}

        {/* Edit Button */}
        {!isEditing && (
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TabDataKepegawaian;