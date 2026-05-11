import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit } from 'lucide-react';
import { useGetPositions } from '@/api/position/position.query';
import { useGetDepartments } from '@/api/division/division.query';
import { useGetSections } from '@/api/section/section.query';
import { useGetCategories } from '@/api/category/category.query';
import { useGetMaritals } from '@/api/marital/marital.query';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';

const withCurrentOption = (
  options: Array<{ value: string; label: string }>,
  value: string,
  label: string
) => {
  if (!value || options.some((option) => option.value === value)) return options;
  return [{ value, label: label || value }, ...options];
};

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
    data?.statusMaritalId || data?.statusMarital || '',
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
        statusMarital: data.statusMaritalId || data.statusMarital || '',
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

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="ID Karyawan" required id="idKaryawan" placeholder="ID otomatis" value={formData.idKaryawan} onChange={(value) => handleInputChange('idKaryawan', value)} disabled />
          <FormSelect label="Divisi" required id="divisi" placeholder="-- Pilih Divisi --" value={formData.divisi} onValueChange={(value) => handleInputChange('divisi', value)} loading={isLoadingDepartments} emptyMessage="Tidak ada data divisi" options={departmentOptions} disabled={!isEditing} />
          <FormSelect label="Jabatan" required id="jabatan" placeholder="-- Pilih Jabatan --" value={formData.jabatan} onValueChange={(value) => handleInputChange('jabatan', value)} loading={isLoadingPositions} emptyMessage="Tidak ada data jabatan" options={positionOptions} disabled={!isEditing} />
          <FormSelect label="Bagian" required id="bagian" placeholder="-- Pilih Bagian --" value={formData.bagian} onValueChange={(value) => handleInputChange('bagian', value)} loading={isLoadingSections} emptyMessage="Tidak ada data bagian" options={sectionOptions} disabled={!isEditing} />
          <FormSelect label="Lokasi Kerja" required id="lokasiKerja" placeholder="-- Pilih Lokasi --" value={formData.lokasiKerja} onValueChange={(value) => handleInputChange('lokasiKerja', value)} options={locationOptions} disabled={!isEditing} />
          <FormInput label="Tanggal Bergabung" required id="tanggalBergabung" type="date" value={formData.tanggalBergabung} onChange={(value) => handleInputChange('tanggalBergabung', value)} disabled={!isEditing} />
          <FormInput label="Tanggal Kontrak" required id="tanggalKontrak" type="date" value={formData.tanggalKontrak} onChange={(value) => handleInputChange('tanggalKontrak', value)} disabled={!isEditing} />
          <FormInput label="Selesai Kontrak" required id="selesaiKontrak" type="date" value={formData.selesaiKontrak} onChange={(value) => handleInputChange('selesaiKontrak', value)} disabled={!isEditing} />
          <FormSelect label="Kategori Karyawan" required id="kategoriKaryawan" placeholder="-- Pilih Kategori --" value={formData.kategoriKaryawan} onValueChange={(value) => handleInputChange('kategoriKaryawan', value)} loading={isLoadingCategories} emptyMessage="Tidak ada data kategori" options={categoryOptions} disabled={!isEditing} />
          <FormSelect label="Grup" id="grup" placeholder="-- Pilih Grup --" value={formData.grup} onValueChange={(value) => handleInputChange('grup', value)} options={groupOptions} disabled={!isEditing} />
          <FormSelect label="Status Marital" required id="statusMarital" placeholder="-- Pilih Status Marital --" value={formData.statusMarital} onValueChange={(value) => handleInputChange('statusMarital', value)} loading={isLoadingMaritals} emptyMessage="Tidak ada data marital" options={maritalOptions} disabled={!isEditing} />
          <FormInput label="Referensi" id="referensi" placeholder="Referensi" value={formData.referensi} onChange={(value) => handleInputChange('referensi', value)} disabled={!isEditing} />
          <FormInput label="No SIO" id="noSIO" placeholder="32xxxxx" value={formData.noSIO} onChange={(value) => handleInputChange('noSIO', value)} disabled={!isEditing} />
          <FormSelect label="Status Akun" required id="statusAkun" placeholder="-- Pilih Status Akun --" value={formData.statusAkun} onValueChange={(value) => handleInputChange('statusAkun', value)} options={accountStatusOptions} disabled={!isEditing} />
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
