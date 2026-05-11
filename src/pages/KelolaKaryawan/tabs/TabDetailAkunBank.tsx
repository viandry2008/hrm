import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit } from 'lucide-react';
import { useGetBanks } from '@/api/bank/bank.query';
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

const TabDetailAkunBank = ({ data }: any) => {
  const { data: bankData, isLoading: isLoadingBanks } = useGetBanks({
    search: '',
    page: 1,
    limit: 100,
  });
  const bankOptions = withCurrentOption(
    (bankData?.data ?? []).map((bank: any) => ({
      value: bank.id.toString(),
      label: bank.name,
    })),
    data?.bankId || data?.bank || '',
    data?.bank || ''
  );

  const [formData, setFormData] = useState({
    namaPemilik: '',
    nomorRekening: '',
    bank: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (data) {
      const initialData = {
        namaPemilik: data.namaPemilikRekening || '',
        nomorRekening: data.nomorRekening || '',
        bank: data.bankId || data.bank || '',
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
          
          <FormInput
            label="Nama Pemilik Rekening"
            id="namaPemilik"
            placeholder="Masukkan nama lengkap"
            value={formData.namaPemilik}
            onChange={(value) => handleInputChange('namaPemilik', value)}
            disabled={!isEditing}
          />

          <FormInput
            label="Nomor Rekening"
            id="nomorRekening"
            placeholder="1234-5678-9012-3456"
            value={formData.nomorRekening}
            onChange={(value) => handleInputChange('nomorRekening', value)}
            disabled={!isEditing}
          />

          <FormSelect
            label="Bank"
            id="bank"
            placeholder="-- Pilih Bank --"
            value={formData.bank}
            onValueChange={(value) => handleInputChange('bank', value)}
            loading={isLoadingBanks}
            emptyMessage="Tidak ada data bank"
            options={bankOptions}
            disabled={!isEditing}
            className="md:col-span-2"
          />

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

export default TabDetailAkunBank;
