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
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useTrialRegister } from '@/api/trial/trial.query';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    company: '',
    companyAddress: '',
    businessField: '',
    phone: '',
    email: '',
    message: '',
    meetingType: 'online',
    meetingLocation: '',
  });

  const resetForm = () => {
    setForm({
      name: '',
      position: '',
      company: '',
      companyAddress: '',
      businessField: '',
      phone: '',
      email: '',
      message: '',
      meetingType: 'online',
      meetingLocation: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const trialRegisterMutation = useTrialRegister(resetForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      full_name: form.name,
      company_name: form.company,
      industry: form.businessField,
      company_position: form.position,
      phone_number: form.phone,
      email: form.email,
      meeting_location: form.meetingType,
      meeting_address:
        form.meetingType === 'offline' ? form.meetingLocation : '',
      address_detail: form.companyAddress,
      message: form.message,
    };

    console.log('Form submitted:', payload);

    trialRegisterMutation.mutate(payload);
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
        {/* ICON */}
        <div className="w-10 h-10 flex items-center justify-center bg-[#2794eb]">
          {icon}
        </div>

        {/* INPUT */}
        <Input
          type={type}
          placeholder={placeholder}
          className="border-0 bg-white focus:ring-0 focus:outline-none"
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
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl rounded-2xl">
          <CardContent className="p-8 max-h-[90vh] overflow-y-auto">
            <h1 className="text-2xl font-bold text-center mb-1">
              Daftar <span className="text-[#2794eb]">SMART HRM</span> Sekarang
            </h1>
            <p className="text-center text-sm text-gray-600 mb-6">
              Dapatkan <b>FREE TRIAL Akun 90 Hari!</b>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderField(
                'Nama Karyawan',
                'Nama Lengkap',
                <User className="w-4 h-4 text-white" />,
                form.name,
                (e) => handleChange('name', e.target.value)
              )}

              {renderField(
                'Jabatan di Perusahaan',
                'Pemilik / Manager / HR',
                <Briefcase className="w-4 h-4 text-white" />,
                form.position,
                (e) => handleChange('position', e.target.value)
              )}

              {renderField(
                'Nama Perusahaan',
                'PT XXX',
                <Building2 className="w-4 h-4 text-white" />,
                form.company,
                (e) => handleChange('company', e.target.value)
              )}

              {renderField(
                'Alamat Perusahaan',
                'Jl. Contoh No.123, Jakarta',
                <MapPin className="w-4 h-4 text-white" />,
                form.companyAddress,
                (e) => handleChange('companyAddress', e.target.value)
              )}

              {renderField(
                'Bidang Usaha',
                'Manufaktur / Retail / Jasa / Teknologi',
                <Building2 className="w-4 h-4 text-white" />,
                form.businessField,
                (e) => handleChange('businessField', e.target.value)
              )}

              {renderField(
                'Nomor HP / Telephone',
                '0812XXXXXXX',
                <Phone className="w-4 h-4 text-white" />,
                form.phone,
                (e) => handleChange('phone', e.target.value),
                'tel'
              )}

              {renderField(
                'Email',
                'alamat@email.com',
                <Mail className="w-4 h-4 text-white" />,
                form.email,
                (e) => handleChange('email', e.target.value),
                'email'
              )}

              {/* PESAN */}
              <div>
                <Label className="text-sm mb-1 block">Pesan</Label>
                <textarea
                  className="w-full border rounded-md p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#2794eb]"
                  rows={4}
                  placeholder="Tuliskan kebutuhan atau ketertarikan Anda terkait meeting..."
                  value={form.message}
                  onChange={(e) =>
                    handleChange('message', e.target.value)
                  }
                />
              </div>

              {/* JENIS MEETING */}
              <div>
                <Label className="text-sm mb-1 block">Jenis Meeting</Label>
                <div className="flex gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={form.meetingType === 'online'}
                      onChange={() =>
                        handleChange('meetingType', 'online')
                      }
                    />
                    Online
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={form.meetingType === 'offline'}
                      onChange={() =>
                        handleChange('meetingType', 'offline')
                      }
                    />
                    Offline
                  </label>
                </div>
              </div>

              {form.meetingType === 'offline' &&
                renderField(
                  'Lokasi Meeting',
                  'Kantor / Cafe / Alamat lain',
                  <MapPin className="w-4 h-4 text-white" />,
                  form.meetingLocation,
                  (e) =>
                    handleChange('meetingLocation', e.target.value)
                )}

              <Button
                type="submit"
                className="
                w-full h-12
                bg-[#1365d7]
                text-white font-semibold rounded-lg
                transition-all duration-200
                hover:shadow-inner
                hover:brightness-95
                active:translate-y-[1px]
              "
              >
                Daftar Sekarang
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
