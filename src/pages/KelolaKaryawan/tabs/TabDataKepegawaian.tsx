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
import { useGetPositions } from '@/api/position/position.query';
import { useGetDepartments } from '@/api/division/division.query';
import { useGetSections } from '@/api/section/section.query';
import { useGetCategories } from '@/api/category/category.query';
import { useGetMaritals } from '@/api/marital/marital.query';

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

const TabDataKepegawaian = ({ data }: any) => {
  const { data: positionData, isLoading: isLoadingPositions } = useGetPositions({
    search: '',
    page: 1,
    limit: 100,
  });
  const { data: departmentData, isLoading: isLoadingDepartments } = useGetDepartments({
    search: '',
    page: 1,
    limit: 100,
  });
  const { data: sectionsData, isLoading: isLoadingSections } = useGetSections({
    search: '',
    page: 1,
    limit: 100,
  });
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories({
    search: '',
    page: 1,
    limit: 100,
  });
  const { data: maritalsData, isLoading: isLoadingMaritals } = useGetMaritals({
    search: '',
    page: 1,
    limit: 100,
  });

  const departmentOptions = withCurrentOption(
    (departmentData?.data ?? []).map((department: any) => ({
      value: department.id.toString(),
      label: department.name,
    })),
    data?.divisiId || '',
    data?.divisi || ''
  );
  const positionOptions = withCurrentOption(
    (positionData?.data ?? []).map((position: any) => ({
      value: position.id.toString(),
      label: position.name,
    })),
    data?.jabatanId || '',
    data?.jabatan || ''
  );
  const sectionOptions = withCurrentOption(
    (sectionsData?.data ?? []).map((section: any) => ({
      value: section.id.toString(),
      label: section.name,
    })),
    data?.bagianId || '',
    data?.bagian || ''
  );
  const locationOptions = withCurrentOption(
    [{ value: 'PT Proven Force Indonesia', label: 'PT Proven Force Indonesia' }],
    data?.lokasiKerja || '',
    data?.lokasiKerja || ''
  );
  const categoryOptions = withCurrentOption(
    (categoriesData?.data ?? []).map((category: any) => ({
      value: category.id.toString(),
      label: category.name,
    })),
    data?.kategoriId || '',
    data?.kategori || ''
  );
  const maritalOptions = withCurrentOption(
    (maritalsData?.data ?? []).map((marital: any) => ({
      value: marital.id.toString(),
      label: `${marital.name} - Rp ${parseFloat(marital.amount).toLocaleString('id-ID')}`,
    })),
    data?.statusMaritalId || '',
    data?.statusMarital || ''
  );
  const groupOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
  ];
  const accountStatusOptions = withCurrentOption(
    [
      { value: 'active', label: 'Aktif' },
      { value: 'inactive', label: 'Tidak Aktif' },
    ],
    data?.statusAkun || '',
    data?.statusAkun || ''
  );

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
        divisi: data.divisiId || '',
        jabatan: data.jabatanId || '',
        bagian: data.bagianId || '',
        lokasiKerja: data.lokasiKerja || '',
        tanggalBergabung: data.tanggalBergabung || '',
        tanggalKontrak: data.tanggalKontrak || '',
        selesaiKontrak: data.selesaiKontrak || '',
        kategoriKaryawan: data.kategoriId || '',
        grup: data.grup || '',
        statusMarital: data.statusMaritalId || '',
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
                  {isLoadingDepartments ? (
                    <SelectItem value="loading" disabled>Memuat divisi...</SelectItem>
                  ) : departmentOptions.length ? (
                    departmentOptions.map((department) => (
                      <SelectItem key={department.value} value={department.value}>
                        {department.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data divisi</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(departmentOptions, formData.divisi, data?.divisi || '') || '-- Pilih Divisi --'}
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
                  {isLoadingPositions ? (
                    <SelectItem value="loading" disabled>Memuat jabatan...</SelectItem>
                  ) : positionOptions.length ? (
                    positionOptions.map((position) => (
                      <SelectItem key={position.value} value={position.value}>
                        {position.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data jabatan</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(positionOptions, formData.jabatan, data?.jabatan || '') || '-- Pilih Jabatan --'}
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
                  {isLoadingSections ? (
                    <SelectItem value="loading" disabled>Memuat bagian...</SelectItem>
                  ) : sectionOptions.length ? (
                    sectionOptions.map((section) => (
                      <SelectItem key={section.value} value={section.value}>
                        {section.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data bagian</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(sectionOptions, formData.bagian, data?.bagian || '') || '-- Pilih Bagian --'}
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
                  {locationOptions.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(locationOptions, formData.lokasiKerja, data?.lokasiKerja || '') || '-- Pilih Lokasi --'}
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
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>Memuat kategori...</SelectItem>
                  ) : categoryOptions.length ? (
                    categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data kategori</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(categoryOptions, formData.kategoriKaryawan, data?.kategori || '') || '-- Pilih Kategori --'}
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
                  {groupOptions.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
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
                  {isLoadingMaritals ? (
                    <SelectItem value="loading" disabled>Memuat status marital...</SelectItem>
                  ) : maritalOptions.length ? (
                    maritalOptions.map((marital) => (
                      <SelectItem key={marital.value} value={marital.value}>
                        {marital.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>Tidak ada data marital</SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(maritalOptions, formData.statusMarital, data?.statusMarital || '') || '-- Pilih Status Marital --'}
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
                  {accountStatusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {getOptionLabel(accountStatusOptions, formData.statusAkun, data?.statusAkun || '') || '-- Pilih Status Akun --'}
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
