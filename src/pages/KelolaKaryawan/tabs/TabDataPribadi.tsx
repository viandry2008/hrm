import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check, X, Edit } from 'lucide-react';
import { useGetReligions } from '@/api/religion/religion.query';

const withCurrentOption = (
  options: Array<{ value: string; label: string }>,
  value: string,
  label: string
) => {
  if (!value || options.some((option) => option.value === value)) return options;
  return [{ value, label: label || value }, ...options];
};

const getOptionLabel = (
  options: Array<{ value: string; label: string }>,
  value: string,
  fallback: string
) => options.find((option) => option.value === value)?.label || fallback;

const TabDataPribadi = ({ data }: any) => {
  const { data: religionData, isLoading: isLoadingReligions } = useGetReligions({
    search: '',
    page: 1,
    limit: 100,
  });
  const religionOptions = withCurrentOption(
    (religionData?.data ?? []).map((religion: any) => ({
      value: religion.id.toString(),
      label: religion.name,
    })),
    data?.agamaId || '',
    data?.agama || ''
  );
  const educationOptions = withCurrentOption(
    [
      { value: 'SD', label: 'SD' },
      { value: 'SMP', label: 'SMP' },
      { value: 'SMA/SMK', label: 'SMA / SMK' },
      { value: 'D1', label: 'D1' },
      { value: 'D2', label: 'D2' },
      { value: 'D3', label: 'D3' },
      { value: 'S1', label: 'S1' },
      { value: 'S2', label: 'S2' },
      { value: 'S3', label: 'S3' },
    ],
    data?.pendidikan || '',
    data?.pendidikan || ''
  );
  const genderOptions = withCurrentOption(
    [
      { value: 'Laki - Laki', label: 'Laki - Laki' },
      { value: 'Perempuan', label: 'Perempuan' },
    ],
    data?.jenisKelamin || '',
    data?.jenisKelamin || ''
  );

  const [formData, setFormData] = useState({
    nama: '',
    nomorHandphone: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamatKTP: '',
    alamatDomisili: '',
    pendidikan: '',
    agama: '',
    namaSuamiIstri: '',
    namaAnak: '',
    jumlahAnak: '',
    namaBapak: '',
    namaIbu: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (data) {
      const initialData = {
        nama: data.nama || '',
        nomorHandphone: data.nomorHandphone || '',
        tempatLahir: data.tempatLahir || '',
        tanggalLahir: data.tanggalLahir || '',
        jenisKelamin: data.jenisKelamin || '',
        alamatKTP: data.alamatKTP || '',
        alamatDomisili: data.alamatDomisili || '',
        pendidikan: data.pendidikan || '',
        agama: data.agamaId || '',
        namaSuamiIstri: data.namaSuamiIstri || '',
        namaAnak: data.namaAnak || '',
        jumlahAnak: data.jumlahAnak || '',
        namaBapak: data.namaBapak || '',
        namaIbu: data.namaIbu || '',
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

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nama Karyawan */}
          <div className="space-y-2">
            <Label htmlFor="nama" className="text-sm font-medium">
              Nama Karyawan <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nama"
              placeholder="Nama Karyawan"
              value={formData.nama}
              onChange={(e) => handleInputChange('nama', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Nomor Telepon */}
          <div className="space-y-2">
            <Label htmlFor="nomorHandphone" className="text-sm font-medium">
              Nomor Telepon <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nomorHandphone"
              placeholder="08xxx"
              value={formData.nomorHandphone}
              onChange={(e) => handleInputChange('nomorHandphone', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tempat Lahir */}
          <div className="space-y-2">
            <Label htmlFor="tempatLahir" className="text-sm font-medium">
              Tempat Lahir <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tempatLahir"
              placeholder="Tempat Lahir"
              value={formData.tempatLahir}
              onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tanggal Lahir */}
          <div className="space-y-2">
            <Label htmlFor="tanggalLahir" className="text-sm font-medium">
              Tanggal Lahir <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="space-y-2">
            <Label htmlFor="jenisKelamin" className="text-sm font-medium">
              Jenis Kelamin <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.jenisKelamin}
                onValueChange={(value) => handleInputChange('jenisKelamin', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Jenis Kelamin --" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.jenisKelamin || '-- Pilih Jenis Kelamin --'}
              </div>
            )}
          </div>

          {/* Pendidikan */}
          <div className="space-y-2">
            <Label htmlFor="pendidikan" className="text-sm font-medium">
              Pendidikan <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.pendidikan}
                onValueChange={(value) => handleInputChange('pendidikan', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Pendidikan --" />
                </SelectTrigger>
                <SelectContent>
                  {educationOptions.map((education) => (
                    <SelectItem key={education.value} value={education.value}>
                      {education.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.pendidikan || '-- Pilih Pendidikan --'}
              </div>
            )}
          </div>

          {/* Alamat KTP */}
          <div className="space-y-2">
            <Label htmlFor="alamatKTP" className="text-sm font-medium">
              Alamat KTP <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <>
                <Textarea
                  id="alamatKTP"
                  placeholder="Isi alamat sesuai KTP"
                  value={formData.alamatKTP}
                  onChange={(e) => handleInputChange('alamatKTP', e.target.value)}
                  className="bg-white min-h-[80px]"
                />
                <p className="text-xs text-gray-500">*) Isi alamat sesuai KTP</p>
              </>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm min-h-[80px]">
                {formData.alamatKTP || '-'}
              </div>
            )}
          </div>

          {/* Alamat Domisili */}
          <div className="space-y-2">
            <Label htmlFor="alamatDomisili" className="text-sm font-medium">
              Alamat Domisili <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <>
                <Textarea
                  id="alamatDomisili"
                  placeholder="Jika mengisi domisili harap input nama kota"
                  value={formData.alamatDomisili}
                  onChange={(e) => handleInputChange('alamatDomisili', e.target.value)}
                  className="bg-white min-h-[80px]"
                />
                <p className="text-xs text-gray-500">*) Jika mengisi domisili harap input nama kota</p>
              </>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm min-h-[80px]">
                {formData.alamatDomisili || '-'}
              </div>
            )}
          </div>

          {/* Agama */}
          <div className="space-y-2">
            <Label htmlFor="agama" className="text-sm font-medium">
              Agama <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.agama}
                onValueChange={(value) => handleInputChange('agama', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Agama --" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingReligions ? (
                    <SelectItem value="loading" disabled>Memuat agama...</SelectItem>
                  ) : religionOptions.length ? (
                    religionOptions.map((religion) => (
                      <SelectItem key={religion.value} value={religion.value}>
                        {religion.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data agama</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(religionOptions, formData.agama, data?.agama || '') || '-- Pilih Agama --'}
              </div>
            )}
          </div>

          {/* Nama Suami/Istri */}
          <div className="space-y-2">
            <Label htmlFor="namaSuamiIstri" className="text-sm font-medium">
              Nama Suami/Istri
            </Label>
            <Input
              id="namaSuamiIstri"
              placeholder="contoh: nama1, nama2, dst"
              value={formData.namaSuamiIstri}
              onChange={(e) => handleInputChange('namaSuamiIstri', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Nama Anak */}
          <div className="space-y-2">
            <Label htmlFor="namaAnak" className="text-sm font-medium">
              Nama Anak
            </Label>
            <Input
              id="namaAnak"
              placeholder="Contoh: Nama1, Nama2, dst"
              value={formData.namaAnak}
              onChange={(e) => handleInputChange('namaAnak', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Jumlah Anak */}
          <div className="space-y-2">
            <Label htmlFor="jumlahAnak" className="text-sm font-medium">
              Jumlah Anak
            </Label>
            <Input
              id="jumlahAnak"
              type="number"
              placeholder="Total jumlah anak"
              value={formData.jumlahAnak}
              onChange={(e) => handleInputChange('jumlahAnak', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Nama Bapak */}
          <div className="space-y-2">
            <Label htmlFor="namaBapak" className="text-sm font-medium">
              Nama Bapak
            </Label>
            <Input
              id="namaBapak"
              placeholder="Nama Bapak"
              value={formData.namaBapak}
              onChange={(e) => handleInputChange('namaBapak', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Nama Ibu */}
          <div className="space-y-2">
            <Label htmlFor="namaIbu" className="text-sm font-medium">
              Nama Ibu
            </Label>
            <Input
              id="namaIbu"
              placeholder="Nama Ibu"
              value={formData.namaIbu}
              onChange={(e) => handleInputChange('namaIbu', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
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

export default TabDataPribadi;
