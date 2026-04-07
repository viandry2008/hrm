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

const TabKontakDarurat = ({ data }: any) => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    hubungan: '',
    nomorTelepon: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

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

          {/* Nama Lengkap */}
          <div className="space-y-2">
            <Label htmlFor="namaLengkap" className="text-sm font-medium">
              Nama Lengkap
            </Label>
            <Input
              id="namaLengkap"
              placeholder="Nama kontak"
              value={formData.namaLengkap}
              onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Hubungan */}
          <div className="space-y-2">
            <Label htmlFor="hubungan" className="text-sm font-medium">
              Hubungan
            </Label>
            {isEditing ? (
              <Select
                value={formData.hubungan}
                onValueChange={(value) => handleInputChange('hubungan', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Hubungan --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Orang Tua">Orang Tua</SelectItem>
                  <SelectItem value="Ibu">Ibu</SelectItem>
                  <SelectItem value="Bapak">Bapak</SelectItem>
                  <SelectItem value="Saudara">Saudara</SelectItem>
                  <SelectItem value="Pasangan">Pasangan</SelectItem>
                  <SelectItem value="Anak">Anak</SelectItem>
                  <SelectItem value="Teman">Teman</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.hubungan || '-- Pilih Hubungan --'}
              </div>
            )}
          </div>

          {/* Nomor Telepon */}
          <div className="space-y-2">
            <Label htmlFor="nomorTelepon" className="text-sm font-medium">
              Nomor Telepon
            </Label>
            <Input
              id="nomorTelepon"
              placeholder="08xxx"
              value={formData.nomorTelepon}
              onChange={(e) => handleInputChange('nomorTelepon', e.target.value)}
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

export default TabKontakDarurat;