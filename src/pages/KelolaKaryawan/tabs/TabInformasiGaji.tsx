import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit, Loader2 } from 'lucide-react';
import { FormCurrency } from '@/components/ui/form-currency';
import { useUpdateEmployee } from '@/api/employee/employee.query';

const parseRupiah = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

const TabInformasiGaji = ({ data }: any) => {
  const [formData, setFormData] = useState({
    gajiPokok: '',
    tunjanganJabatan: '',
    tunjanganProject: '',
    tunjanganMakan: '',
    tunjanganTransport: '',
    tunjanganLain: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

  useEffect(() => {
    if (data) {
      const initialData = {
        gajiPokok: data.gajiPokok || '',
        tunjanganJabatan: data.tunjanganJabatan || '',
        tunjanganProject: data.tunjanganProject || '',
        tunjanganMakan: data.tunjanganMakan || '',
        tunjanganTransport: data.tunjanganTransport || '',
        tunjanganLain: data.tunjanganLain || '',
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
    payload.append('basic_salary', parseRupiah(formData.gajiPokok));
    payload.append('position_allowance', parseRupiah(formData.tunjanganJabatan));
    payload.append('project_allowance', parseRupiah(formData.tunjanganProject));
    payload.append('meal_allowance', parseRupiah(formData.tunjanganMakan));
    payload.append('transport_allowance', parseRupiah(formData.tunjanganTransport));
    payload.append('other_allowance', parseRupiah(formData.tunjanganLain));

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
          <FormCurrency
            label="Gaji Pokok"
            required
            id="gajiPokok"
            placeholder="Masukkan gaji pokok"
            value={formData.gajiPokok}
            onChange={(value) => handleInputChange('gajiPokok', String(value))}
            disabled={!isEditing}
          />
          <FormCurrency
            label="Tunjangan Jabatan"
            id="tunjanganJabatan"
            placeholder="Masukkan tunjangan jabatan"
            value={formData.tunjanganJabatan}
            onChange={(value) => handleInputChange('tunjanganJabatan', String(value))}
            disabled={!isEditing}
          />
          <FormCurrency
            label="Tunjangan Project"
            id="tunjanganProject"
            placeholder="Masukkan tunjangan project"
            value={formData.tunjanganProject}
            onChange={(value) => handleInputChange('tunjanganProject', String(value))}
            disabled={!isEditing}
          />
          <FormCurrency
            label="Tunjangan Makan"
            id="tunjanganMakan"
            placeholder="Masukkan tunjangan makan"
            value={formData.tunjanganMakan}
            onChange={(value) => handleInputChange('tunjanganMakan', String(value))}
            disabled={!isEditing}
          />
          <FormCurrency
            label="Tunjangan Transport"
            id="tunjanganTransport"
            placeholder="Masukkan tunjangan transport"
            value={formData.tunjanganTransport}
            onChange={(value) => handleInputChange('tunjanganTransport', String(value))}
            disabled={!isEditing}
          />
          <FormCurrency
            label="Tunjangan Lain-lain"
            id="tunjanganLain"
            placeholder="Masukkan tunjangan lain-lain"
            value={formData.tunjanganLain}
            onChange={(value) => handleInputChange('tunjanganLain', String(value))}
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

export default TabInformasiGaji;