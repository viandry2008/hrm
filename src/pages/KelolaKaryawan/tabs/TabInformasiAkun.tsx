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

const TabInformasiAkun = ({ data }: any) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (data) {
      const initialData = {
        username: data.username || '',
        email: data.email || '',
        password: '',
        role: 'Employee',
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
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!isEditing}
              className={`
                bg-white disabled:bg-gray-50 disabled:text-gray-500 
                disabled:cursor-not-allowed transition-all
              `}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className={`
                bg-white disabled:bg-gray-50 disabled:text-gray-500 
                disabled:cursor-not-allowed transition-all
              `}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={isEditing ? "Masukkan password baru" : "••••••••"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={!isEditing}
              className={`
                bg-white disabled:bg-gray-50 disabled:text-gray-500 
                disabled:cursor-not-allowed transition-all
              `}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role <span className="text-red-500">*</span>
            </Label>
            {isEditing ? (
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Pilih Role --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                {formData.role || '-- Pilih Role --'}
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

export default TabInformasiAkun;