import { useState, useEffect } from 'react';
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
import { Check, X, Edit } from 'lucide-react';

const TabDetailAkunBank = ({ data }: any) => {
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
        bank: data.bank || '',
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
          
          {/* Nama Pemilik Rekening */}
          <div className="space-y-2">
            <Label htmlFor="namaPemilik" className="text-sm font-medium">
              Nama Pemilik Rekening
            </Label>
            <Input
              id="namaPemilik"
              placeholder="Masukkan nama lengkap"
              value={formData.namaPemilik}
              onChange={(e) => handleInputChange('namaPemilik', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Nomor Rekening */}
          <div className="space-y-2">
            <Label htmlFor="nomorRekening" className="text-sm font-medium">
              Nomor Rekening
            </Label>
            <Input
              id="nomorRekening"
              placeholder="1234-5678-9012-3456"
              value={formData.nomorRekening}
              onChange={(e) => handleInputChange('nomorRekening', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Bank */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bank" className="text-sm font-medium">
              Bank
            </Label>
            {isEditing ? (
              <Select
                value={formData.bank}
                onValueChange={(value) => handleInputChange('bank', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Bank --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="Mandiri">Mandiri</SelectItem>
                  <SelectItem value="BNI">BNI</SelectItem>
                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="CIMB Niaga">CIMB Niaga</SelectItem>
                  <SelectItem value="Danamon">Danamon</SelectItem>
                  <SelectItem value="Permata">Permata</SelectItem>
                  <SelectItem value="BTN">BTN</SelectItem>
                  <SelectItem value="Bank Syariah Indonesia">Bank Syariah Indonesia</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.bank || '-- Pilih Bank --'}
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

export default TabDetailAkunBank;