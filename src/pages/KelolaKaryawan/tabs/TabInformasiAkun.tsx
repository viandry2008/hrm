import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Edit, Loader2 } from 'lucide-react';
import { useGetRoles } from '@/api/role/role.query';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { useUpdateEmployee } from '@/api/employee/employee.query';

const withCurrentOption = (
  options: Array<{ value: string; label: string }>,
  value: string,
  label: string
) => {
  if (!value || options.some((option) => option.value === value)) return options;
  return [{ value, label: label || value }, ...options];
};

const TabInformasiAkun = ({ data }: any) => {
  const { data: roleData, isLoading: isLoadingRoles } = useGetRoles({
    search: '',
    page: 1,
    limit: 1000,
  });

  const roleOptions = withCurrentOption(
    (roleData?.data ?? []).map((role: any) => ({
      value: role.id.toString(),
      label: role.name_role,
    })),
    data?.roleId || data?.role || '',
    data?.role || ''
  );

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

  useEffect(() => {
    if (data) {
      const initialData = {
        username: data.username || '',
        email: data.email || '',
        password: '',
        role: data.roleId || data.role || '',
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
    payload.append('name', data?.nama || '');
    payload.append('username', formData.username);
    payload.append('email', formData.email);
    if (formData.password) payload.append('password', formData.password);
    payload.append('role_id', formData.role);

    updateEmployee(payload, {
      onSuccess: () => {
        setOriginalData({ ...formData, password: '' });
        setFormData((prev) => ({ ...prev, password: '' }));
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
            label="Username"
            required
            id="username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={(value) => handleInputChange('username', value)}
            disabled={!isEditing}
          />
          <FormInput
            label="Email"
            required
            id="email"
            type="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            disabled={!isEditing}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder={isEditing ? 'Masukkan password baru (opsional)' : '••••••••'}
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            disabled={!isEditing}
          />
          <FormSelect
            label="Role"
            required
            id="role"
            placeholder="-- Pilih Role --"
            value={formData.role}
            onValueChange={(value) => handleInputChange('role', value)}
            loading={isLoadingRoles}
            emptyMessage="Tidak ada data role"
            options={roleOptions}
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

export default TabInformasiAkun;