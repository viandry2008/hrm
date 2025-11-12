import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  User,
  Building2,
  Briefcase,
  Users,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useTrialRegister } from '@/api/trial/trial.query';

export const TrialRegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    position: '',
    employees: '1',
    phone: '',
    email: '',
    meetingLocation: 'online', // default
    companyAddress: '',
  });

  const resetForm = () => {
    setForm({
      name: '',
      company: '',
      position: '',
      employees: '1',
      phone: '',
      email: '',
      meetingLocation: 'online',
      companyAddress: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const trialRegisterMutation = useTrialRegister(resetForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);

    trialRegisterMutation.mutate({
      full_name: form.name,
      company_name: form.company,
      company_position: form.position,
      total_employees: parseInt(form.employees, 10),
      phone_number: form.phone,
      email: form.email,
      meeting_location: form.meetingLocation,
      company_address: form.meetingLocation === 'offline' ? form.companyAddress : undefined,
    });
  };

  const renderField = (
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type = 'text'
  ) => (
    <div>
      <Label className="text-sm mb-1 block">{label}</Label>
      <div className="flex items-center border rounded-md overflow-hidden bg-white">
        <div className="flex items-center justify-center w-10 h-10 border-r bg-gray-50">
          {icon}
        </div>
        <Input
          type={type}
          placeholder={placeholder}
          className="flex-1 border-0 focus:ring-0 focus:outline-none"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: "url('/public/wave.png')" }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="w-full shadow-2xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-1">
              Daftar <span className="text-blue-600">SMART HRM</span> Sekarang
            </h1>
            <p className="text-center text-sm text-gray-600 mb-6">
              Dapatkan <span className="font-bold text-black">FREE TRIAL Akun 14 Hari!</span> berbagai fitur HR dalam satu aplikasi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderField(
                'Nama Lengkap',
                'Nama',
                <User className="w-4 h-4 text-gray-400" />,
                form.name,
                (e) => handleChange('name', e.target.value)
              )}
              {renderField(
                'Nama Perusahaan',
                'PT XXX',
                <Building2 className="w-4 h-4 text-gray-400" />,
                form.company,
                (e) => handleChange('company', e.target.value)
              )}
              {renderField(
                'Jabatan di Perusahaan Sebagai',
                'Pemilik',
                <Briefcase className="w-4 h-4 text-gray-400" />,
                form.position,
                (e) => handleChange('position', e.target.value)
              )}
              {renderField(
                'Jumlah Karyawan',
                '1',
                <Users className="w-4 h-4 text-gray-400" />,
                form.employees,
                (e) => handleChange('employees', e.target.value),
                'number'
              )}
              {renderField(
                'Nomor HP',
                '0812XXXXXXX',
                <Phone className="w-4 h-4 text-gray-400" />,
                form.phone,
                (e) => handleChange('phone', e.target.value),
                'tel'
              )}
              {renderField(
                'Alamat Email',
                'alamat@email.com',
                <Mail className="w-4 h-4 text-gray-400" />,
                form.email,
                (e) => handleChange('email', e.target.value),
                'email'
              )}

              {/* Lokasi Meeting */}
              <div>
                <Label className="text-sm mb-1 block">Pilih Lokasi Meeting</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="meetingLocation"
                      value="online"
                      checked={form.meetingLocation === 'online'}
                      onChange={() => handleChange('meetingLocation', 'online')}
                    />
                    Online
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="meetingLocation"
                      value="offline"
                      checked={form.meetingLocation === 'offline'}
                      onChange={() => handleChange('meetingLocation', 'offline')}
                    />
                    Offline
                  </label>
                </div>
              </div>

              {/* Alamat Perusahaan (hanya jika offline) */}
              {form.meetingLocation === 'offline' && (
                renderField(
                  'Alamat Perusahaan',
                  'Jl. Contoh No.123, Jakarta',
                  <MapPin className="w-4 h-4 text-gray-400" />,
                  form.companyAddress,
                  (e) => handleChange('companyAddress', e.target.value)
                )
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Daftar Sekarang
              </Button>

              <div className="text-center text-sm mt-3">
                Sudah pernah daftar?{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Login disini
                </a>
              </div>

              <p className="text-xs text-center text-gray-500 mt-2">
                Dengan klik tombol daftar, saya telah membaca dan menyetujui{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Syarat & Ketentuan SMART HRM
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
