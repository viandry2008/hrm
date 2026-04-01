import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, X, Edit } from 'lucide-react';

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

  const formatToRupiah = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    
    // Format with thousand separator
    const formatted = parseInt(numericValue).toLocaleString('id-ID');
    return `Rp ${formatted}`;
  };

  const getNumericValue = (value: string) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleInputChange = (field: string, value: string) => {
    // Store the formatted value
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
          
          {/* Gaji Pokok */}
          <div className="space-y-2">
            <Label htmlFor="gajiPokok" className="text-sm font-medium">
              Gaji Pokok <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gajiPokok"
              placeholder="Masukkan gaji pokok"
              value={formData.gajiPokok}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('gajiPokok', formatted);
              }}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tunjangan Jabatan */}
          <div className="space-y-2">
            <Label htmlFor="tunjanganJabatan" className="text-sm font-medium">
              Tunjangan Jabatan
            </Label>
            <Input
              id="tunjanganJabatan"
              placeholder="Masukkan tunjangan jabatan"
              value={formData.tunjanganJabatan}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('tunjanganJabatan', formatted);
              }}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tunjangan Project */}
          <div className="space-y-2">
            <Label htmlFor="tunjanganProject" className="text-sm font-medium">
              Tunjangan Project
            </Label>
            <Input
              id="tunjanganProject"
              placeholder="Masukkan tunjangan project"
              value={formData.tunjanganProject}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('tunjanganProject', formatted);
              }}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tunjangan Makan */}
          <div className="space-y-2">
            <Label htmlFor="tunjanganMakan" className="text-sm font-medium">
              Tunjangan Makan
            </Label>
            <Input
              id="tunjanganMakan"
              placeholder="Masukkan tunjangan makan"
              value={formData.tunjanganMakan}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('tunjanganMakan', formatted);
              }}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tunjangan Transport */}
          <div className="space-y-2">
            <Label htmlFor="tunjanganTransport" className="text-sm font-medium">
              Tunjangan Transport
            </Label>
            <Input
              id="tunjanganTransport"
              placeholder="Masukkan tunjangan transport"
              value={formData.tunjanganTransport}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('tunjanganTransport', formatted);
              }}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Tunjangan Lain-lain */}
          <div className="space-y-2">
            <Label htmlFor="tunjanganLain" className="text-sm font-medium">
              Tunjangan Lain-lain
            </Label>
            <Input
              id="tunjanganLain"
              placeholder="Masukkan tunjangan lain-lain"
              value={formData.tunjanganLain}
              onChange={(e) => {
                const formatted = formatToRupiah(e.target.value);
                handleInputChange('tunjanganLain', formatted);
              }}
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

export default TabInformasiGaji;