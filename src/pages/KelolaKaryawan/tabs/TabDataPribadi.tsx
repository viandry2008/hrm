import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit } from 'lucide-react';
import { useGetReligions } from '@/api/religion/religion.query';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { FormTextarea } from '@/components/ui/form-textarea';
import { useUpdateEmployee } from '@/api/employee/employee.query';

const withCurrentOption = (
  options: Array<{ value: string; label: string }>,
  value: string,
  label: string
) => {
  if (!value || options.some((option) => option.value === value)) return options;
  return [{ value, label: label || value }, ...options];
};

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
    data?.agamaId || data?.agama || '',
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

  const genderOptions = [
    { value: "Laki - Laki", label: "Laki - Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

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

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

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
        agama: data.agamaId || data.agama || '',
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

    const genderMap: Record<string, string> = {
      "Laki - Laki": "Male",
      "Perempuan": "Female",
    };

    const payload = new FormData();
    payload.append('full_name', formData?.nama || '');
    payload.append('phone_number', formData.nomorHandphone || '');
    payload.append('address_ktp', formData.alamatKTP || '');
    payload.append('address_domicile', formData.alamatDomisili || '');
    payload.append('education', formData.pendidikan || '');
    payload.append('religion_id', formData.agama || '');
    payload.append('spouse_name', formData.namaSuamiIstri || '');
    payload.append('children_names', formData.namaAnak || '');
    payload.append('number_of_children', formData.jumlahAnak || '');
    payload.append('father_name', formData.namaBapak || '');
    payload.append('mother_name', formData.namaIbu || '');
    payload.append('gender', genderMap[formData.jenisKelamin] || '');
    payload.append('birth_date', formData.tanggalLahir || '');
    payload.append('birth_place', formData.tempatLahir || '');

    console.log(formData.agama);

    updateEmployee(payload, {
      onSuccess: () => {
        setOriginalData(formData);
        setIsEditing(false);
      },
    });
  };


  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Nama Karyawan" required id="nama" placeholder="Nama Karyawan" value={formData.nama} onChange={(value) => handleInputChange('nama', value)} disabled={!isEditing} />
          <FormInput label="Nomor Telepon" required id="nomorHandphone" placeholder="08xxx" value={formData.nomorHandphone} onChange={(value) => handleInputChange('nomorHandphone', value)} disabled={!isEditing} />
          <FormInput label="Tempat Lahir" required id="tempatLahir" placeholder="Tempat Lahir" value={formData.tempatLahir} onChange={(value) => handleInputChange('tempatLahir', value)} disabled={!isEditing} />
          <FormInput label="Tanggal Lahir" required id="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={(value) => handleInputChange('tanggalLahir', value)} disabled={!isEditing} />
          <FormSelect label="Jenis Kelamin" required id="jenisKelamin" placeholder="-- Pilih Jenis Kelamin --" value={formData.jenisKelamin} onValueChange={(value) => handleInputChange('jenisKelamin', value)} options={genderOptions} disabled={!isEditing} />
          <FormSelect label="Pendidikan" required id="pendidikan" placeholder="-- Pilih Pendidikan --" value={formData.pendidikan} onValueChange={(value) => handleInputChange('pendidikan', value)} options={educationOptions} disabled={!isEditing} />
          <FormTextarea label="Alamat KTP" required id="alamatKTP" placeholder="Isi alamat sesuai KTP" value={formData.alamatKTP} onChange={(value) => handleInputChange('alamatKTP', value)} disabled={!isEditing} />
          <FormTextarea label="Alamat Domisili" required id="alamatDomisili" placeholder="Jika mengisi domisili harap input nama kota" value={formData.alamatDomisili} onChange={(value) => handleInputChange('alamatDomisili', value)} disabled={!isEditing} />
          <FormSelect label="Agama" required id="agama" placeholder="-- Pilih Agama --" value={formData.agama} onValueChange={(value) => handleInputChange('agama', value)} loading={isLoadingReligions} emptyMessage="Tidak ada data agama" options={religionOptions} disabled={!isEditing} />
          <FormInput label="Nama Suami/Istri" id="namaSuamiIstri" placeholder="contoh: nama1, nama2, dst" value={formData.namaSuamiIstri} onChange={(value) => handleInputChange('namaSuamiIstri', value)} disabled={!isEditing} />
          <FormInput label="Nama Anak" id="namaAnak" placeholder="Contoh: Nama1, Nama2, dst" value={formData.namaAnak} onChange={(value) => handleInputChange('namaAnak', value)} disabled={!isEditing} />
          <FormInput label="Jumlah Anak" id="jumlahAnak" type="number" placeholder="Total jumlah anak" value={formData.jumlahAnak} onChange={(value) => handleInputChange('jumlahAnak', value)} disabled={!isEditing} />
          <FormInput label="Nama Bapak" id="namaBapak" placeholder="Nama Bapak" value={formData.namaBapak} onChange={(value) => handleInputChange('namaBapak', value)} disabled={!isEditing} />
          <FormInput label="Nama Ibu" id="namaIbu" placeholder="Nama Ibu" value={formData.namaIbu} onChange={(value) => handleInputChange('namaIbu', value)} disabled={!isEditing} />
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
