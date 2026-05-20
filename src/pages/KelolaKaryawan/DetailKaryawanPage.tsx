import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2, Mail, User, Briefcase, Phone, CreditCard, Car,
  History, Wallet, DollarSign, FileText, Building2, CalendarDays,
  IdCard, AlertTriangle, ChevronRight, Users
} from 'lucide-react';
import { useGetEmployee } from '@/api/employee/employee.query';

import TabInformasiAkun from './tabs/TabInformasiAkun';
import TabDataPribadi from './tabs/TabDataPribadi';
import TabDataKepegawaian from './tabs/TabDataKepegawaian';
import TabInformasiGaji from './tabs/TabInformasiGaji';
import TabKontakDarurat from './tabs/TabKontakDarurat';
import TabDetailAkunBank from './tabs/TabDetailAkunBank';
import TabIdentitasKendaraan from './tabs/TabIdentitasKendaraan';
import TabManajemenFile from './tabs/TabManajemenFile';
import TabRiwayatKontrak from './tabs/TabRiwayatKontrakKerja';
import TabRiwayatPinjaman from './tabs/TabRiwayatPinjaman';

const tabs = [
  { value: 'akun', label: 'Info Akun', icon: Mail },
  { value: 'pribadi', label: 'Data Pribadi', icon: User },
  { value: 'kepegawaian', label: 'Kepegawaian', icon: Briefcase },
  { value: 'gaji', label: 'Info Gaji', icon: Wallet },
  { value: 'file', label: 'Dokumen', icon: FileText },
  { value: 'bank', label: 'Akun Bank', icon: CreditCard },
  { value: 'darurat', label: 'Kontak Darurat', icon: Phone },
  { value: 'kendaraan', label: 'Kendaraan', icon: Car },
  { value: 'kontrak', label: 'Kontrak', icon: History },
  { value: 'pinjaman', label: 'Pinjaman', icon: DollarSign },
];

const tabComponents: any = {
  akun: TabInformasiAkun,
  pribadi: TabDataPribadi,
  kepegawaian: TabDataKepegawaian,
  file: TabManajemenFile,
  gaji: TabInformasiGaji,
  bank: TabDetailAkunBank,
  darurat: TabKontakDarurat,
  kendaraan: TabIdentitasKendaraan,
  kontrak: TabRiwayatKontrak,
  pinjaman: TabRiwayatPinjaman,
};

const formatTanggalIndonesia = (tanggal?: string): string => {
  if (!tanggal) return '-';
  const bulanIndonesia = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const [year, month, day] = tanggal.split('-');
  const monthName = bulanIndonesia[parseInt(month) - 1];
  if (!year || !monthName || !day) return tanggal;
  return `${day} ${monthName} ${year}`;
};

const formatRupiah = (value?: string | number | null): string => {
  const numericValue = Number(value ?? 0);
  if (Number.isNaN(numericValue)) return '';
  return `Rp ${numericValue.toLocaleString('id-ID')}`;
};

const getContractReminder = (endDate?: string | null): string => {
  if (!endDate) return '';
  const today = new Date();
  const end = new Date(endDate);
  const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays <= 30) return `Kontrak akan habis dalam ${diffDays} hari`;
  if (diffDays <= 0) return 'Kontrak telah habis';
  return '';
};

const normalizeGender = (gender?: string | null): string => {
  if (gender === 'Male') return 'Laki - Laki';
  if (gender === 'Female') return 'Perempuan';
  return gender || '';
};

const normalizeEmployeeDetail = (employee: any) => {
  const bankAccount = employee.bank_accounts?.[0];
  const emergencyContact = employee.emergency_contacts?.[0];
  const vehicle = employee.vehicles?.[0];
  const salary = employee.salary;
  const latestContract = employee.latest_contract;
  const maritalStatus = employee.marital_status;
  const spouse = employee.families?.find((f: any) => f.relationship === 'Spouse');
  const children = employee.families?.filter((f: any) => f.relationship === 'Child') ?? [];
  const documentFiles = (employee.documents ?? []).reduce((acc: Record<string, string>, doc: any) => {
    if (doc.document_type) {
      acc[doc.document_type] = doc.document_file || '';
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    raw: employee,
    id: employee.employee_code || String(employee.id),
    employeeId: employee.id,
    nama: employee.full_name || employee.user?.name || '',
    divisi: employee.department?.name || '',
    divisiId: employee.department_id ? String(employee.department_id) : employee.department?.id ? String(employee.department.id) : '',
    jabatan: employee.position?.name || '',
    jabatanId: employee.position_id ? String(employee.position_id) : employee.position?.id ? String(employee.position.id) : '',
    bagian: employee.section?.name || '',
    bagianId: employee.section_id ? String(employee.section_id) : employee.section?.id ? String(employee.section.id) : '',
    companyId: employee.company_id ? String(employee.company_id) : employee.company?.id ? String(employee.company.id) : '',
    kategori: latestContract?.category?.name || '',
    kategoriId: latestContract?.category?.id ? String(latestContract.category.id) : employee.grade_id ? String(employee.grade_id) : '',
    tanggalBergabung: employee.join_date || '',
    tanggalKontrak: latestContract?.start_date || '',
    selesaiKontrak: latestContract?.end_date || '',
    pengingat: getContractReminder(latestContract?.end_date),
    foto: employee.user?.avatar || 'https://randomuser.me/api/portraits/men/19.jpg',
    email: employee.user?.email || '',
    nomorHandphone: employee.phone_number || '',
    username: employee.user?.username || '',
    role: employee.user?.role?.name_role || employee.user?.role?.name || '',
    roleId: employee.user?.role_id ? String(employee.user.role_id) : employee.user?.role?.id ? String(employee.user.role.id) : '',
    statusAkun: employee.user?.status || '',
    tempatLahir: employee.birth_place || '',
    tanggalLahir: employee.birth_date || '',
    jenisKelamin: normalizeGender(employee.gender),
    alamatKTP: employee.address_ktp || '',
    alamatDomisili: employee.address_domicile || '',
    nomorKTP: employee.documents?.find((f: any) => f.document_type === 'ktp')?.document_number || '',
    noKK: employee.documents?.find((f: any) => f.document_type === 'kk')?.document_number || '',
    nomorNPWP: employee.documents?.find((f: any) => f.document_type === 'npwp')?.document_number || '',
    nomorKPJ: employee.documents?.find((f: any) => f.document_type === 'kpj')?.document_number || '',
    nomorJKN: employee.documents?.find((f: any) => f.document_type === 'jkn')?.document_number || '',
    ktpFile: documentFiles.ktp || '',
    kkFile: documentFiles.kk || '',
    npwpFile: documentFiles.npwp || '',
    kpjFile: documentFiles.kpj || '',
    jknFile: documentFiles.jkn || '',
    cvFile: documentFiles.cv || '',
    lainnyaFile: documentFiles.lainnya || '',
    pendidikan: employee.education || '',
    agama: typeof employee.religion === 'object' ? employee.religion?.name || '' : employee.religion || '',
    agamaId: employee.religion_id ? String(employee.religion_id) : typeof employee.religion === 'object' && employee.religion?.id ? String(employee.religion.id) : '',
    namaSuamiIstri: spouse?.name || '',
    namaAnak: children.map((c: any) => c.name).join(', '),
    jumlahAnak: children.length ? String(children.length) : '',
    namaBapak: employee.families?.find((f: any) => f.relationship === 'Father')?.name || '',
    namaIbu: employee.families?.find((f: any) => f.relationship === 'Mother')?.name || '',
    grup: employee.group || '',
    statusMarital: typeof maritalStatus === 'object' ? maritalStatus?.name || '' : maritalStatus || '',
    statusMaritalId: employee.marital_status_id ? String(employee.marital_status_id) : typeof maritalStatus === 'object' && maritalStatus?.id ? String(maritalStatus.id) : '',
    referensi: employee.referensi || '',
    noSIO: employee.sio_number || '',
    namaPemilikRekening: bankAccount?.account_holder_name || '',
    nomorRekening: bankAccount?.account_number || '',
    bank: bankAccount?.bank?.name || (bankAccount?.bank_id ? `Bank ID ${bankAccount.bank_id}` : ''),
    bankId: bankAccount?.bank_id ? String(bankAccount.bank_id) : bankAccount?.bank?.id ? String(bankAccount.bank.id) : '',
    namaKontakDarurat: emergencyContact?.contact_name === 'null' ? '' : emergencyContact?.contact_name || '',
    hubungan: emergencyContact?.relationship || '',
    nomorTeleponDarurat: emergencyContact?.phone_number || '',
    nomorSIM: vehicle?.sim_number || '',
    nomorSTNK: vehicle?.stnk_number || '',
    gajiPokok: formatRupiah(salary?.basic_salary),
    tunjanganJabatan: formatRupiah(salary?.position_allowance),
    tunjanganProject: formatRupiah(salary?.project_allowance),
    tunjanganMakan: formatRupiah(salary?.meal_allowance),
    tunjanganTransport: formatRupiah(salary?.transport_allowance),
    tunjanganLain: formatRupiah(salary?.other_allowance),
    riwayatKontrak: latestContract ? [latestContract] : [],
  };
};

// ================= MAIN =================
const DetailKaryawanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employeeResponse, isLoading, isError } = useGetEmployee(id);

  const data = employeeResponse?.data
    ? normalizeEmployeeDetail(employeeResponse.data)
    : null;

  const [activeTab, setActiveTab] = useState('akun');

  if (isLoading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <Loader2 className="animate-spin w-4 h-4" />
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Data tidak ditemukan</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <button
          onClick={() => navigate('/data-karyawan')}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Users className="w-4 h-4" />
          <span>Karyawan</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">Detail Karyawan</span>
      </div>

      {/* HEADER */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <img src={data.foto} alt={data.nama} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary mb-3">{data.nama}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{data.email}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{data.nomorHandphone}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: IdCard, label: 'ID Karyawan', value: data.id },
                  { icon: Briefcase, label: 'Jabatan', value: data.jabatan },
                  { icon: Building2, label: 'Divisi', value: data.divisi },
                  { icon: CalendarDays, label: 'Tanggal Bergabung', value: formatTanggalIndonesia(data.tanggalBergabung) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-primary rounded-md p-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-white" />
                      <span>{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ALERT */}
      {data.pengingat && data.pengingat !== '-' && (
        <Alert className="bg-red-50 border-red-300">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Perhatian</AlertTitle>
          <AlertDescription className="text-red-700">{data.pengingat}</AlertDescription>
        </Alert>
      )}

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
    min-w-[140px]
    lg:min-w-0
  "
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => {
          const Component = tabComponents[tab.value];
          return (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              {activeTab === tab.value && Component ? (
                <Component data={data} />
              ) : null}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default DetailKaryawanPage;