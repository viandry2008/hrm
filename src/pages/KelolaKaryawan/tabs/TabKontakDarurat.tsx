import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit, Loader2 } from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { useUpdateEmployee } from '@/api/employee/employee.query';

const relationshipOptions = [
  { value: 'Orang Tua (Ayah)', label: 'Orang Tua (Ayah)' },
  { value: 'Orang Tua (Ibu)', label: 'Orang Tua (Ibu)' },
  { value: 'Suami', label: 'Suami' },
  { value: 'Istri', label: 'Istri' },
  { value: 'Saudara Kandung', label: 'Saudara Kandung' },
  { value: 'Saudara Sepupu', label: 'Saudara Sepupu' },
  { value: 'Teman', label: 'Teman' },
  { value: 'Lainnya', label: 'Lainnya' },
];

const withCurrentRelationship = (value: string) => {
  if (!value || relationshipOptions.some((r) => r.value === value)) return relationshipOptions;
  return [{ value, label: value }, ...relationshipOptions];
};

const TabKontakDarurat = ({ data }: any) => {
  const currentRelationshipOptions = withCurrentRelationship(data?.hubungan || '');

  const [formData, setFormData] = useState({
    namaLengkap: '',
    hubungan: '',
    nomorTelepon: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

  useEffect(() => {
    if (data) {
      const initialData = {
        namaLengkap: data.namaKontakDarurat || '',
        hubungan: data.hubungan || '',
        nomorTelepon: data.nomorTeleponDarurat || '',
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const payload = new FormData();
    payload.append('emergency_name', formData.namaLengkap);
    payload.append('emergency_relation', formData.hubungan);
    payload.append('emergency_phone', formData.nomorTelepon);

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
          <FormInput
            label="Nama Lengkap"
            id="namaLengkap"
            placeholder="Nama kontak"
            value={formData.namaLengkap}
            onChange={(value) => handleInputChange('namaLengkap', value)}
            disabled={!isEditing}
          />
          <FormSelect
            label="Hubungan"
            id="hubungan"
            placeholder="-- Pilih Hubungan --"
            value={formData.hubungan}
            onValueChange={(value) => handleInputChange('hubungan', value)}
            options={currentRelationshipOptions}
            disabled={!isEditing}
          />
          <FormInput
            label="Nomor Telepon"
            id="nomorTelepon"
            placeholder="08xxx"
            value={formData.nomorTelepon}
            onChange={(value) => handleInputChange('nomorTelepon', value)}
            disabled={!isEditing}
          />
        </div>

        {isEditing ? (
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2" disabled={isPending}>
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Simpan
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button size="sm" onClick={() => setIsEditing(true)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TabKontakDarurat;