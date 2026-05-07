import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  Mail,
  User,
  Briefcase,
  Phone,
  File,
  CreditCard,
  Car,
  History,
  Wallet,
  DollarSign,
  FileText,
  Building2,
  CalendarDays,
  IdCard,
  AlertTriangle,
  ChevronRight,
  Home,
  Users
} from 'lucide-react';
import { useGetEmployee } from '@/api/employee/employee.query';

// ================= IMPORT TAB COMPONENTS =================
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

// ================= TABS CONFIG (Shortened labels) =================
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

// ================= MAPPING COMPONENT =================
const tabComponents: any = {
  akun: TabInformasiAkun,
  pribadi: TabDataPribadi,
  kepegawaian: TabDataKepegawaian,
  gaji: TabInformasiGaji,
  file: TabManajemenFile,
  bank: TabDetailAkunBank,
  darurat: TabKontakDarurat,
  kendaraan: TabIdentitasKendaraan,
  kontrak: TabRiwayatKontrak,
  pinjaman: TabRiwayatPinjaman,
};

// Format tanggal ke format Indonesia
const formatTanggalIndonesia = (tanggal?: string): string => {
  if (!tanggal) return '-';

  const bulanIndonesia = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
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
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0 && diffDays <= 30) {
    return `Kontrak akan habis dalam ${diffDays} hari`;
  }

  if (diffDays <= 0) {
    return 'Kontrak telah habis';
  }

  return '';
};

const normalizeGender = (gender?: string | null): string => {
  if (gender === 'Male') return 'Laki-laki';
  if (gender === 'Female') return 'Perempuan';

  return gender || '';
};

const normalizeEmployeeDetail = (employee: any) => {
  const bankAccount = employee.bank_accounts?.[0];
  const emergencyContact = employee.emergency_contacts?.[0];
  const vehicle = employee.vehicles?.[0];
  const salary = employee.salary;
  const latestContract = employee.latest_contract;
  const spouse = employee.families?.find((family: any) => family.relationship === 'Spouse');
  const children = employee.families?.filter((family: any) => family.relationship === 'Child') ?? [];

  return {
    raw: employee,
    id: employee.employee_code || String(employee.id),
    employeeId: employee.id,
    nama: employee.full_name || employee.user?.name || '',
    divisi: employee.department?.name || '',
    jabatan: employee.position?.name || '',
    bagian: employee.section?.name || '',
    lokasiKerja: employee.company?.name || employee.company?.city || '',
    kategori: latestContract?.category?.name || '',
    tanggalBergabung: employee.join_date || '',
    tanggalKontrak: latestContract?.start_date || '',
    selesaiKontrak: latestContract?.end_date || '',
    pengingat: getContractReminder(latestContract?.end_date),
    foto: employee.user?.avatar || 'https://randomuser.me/api/portraits/men/19.jpg',
    email: employee.user?.email || '',
    nomorHandphone: employee.phone_number || '',
    username: employee.user?.username || '',
    statusAkun: employee.user?.status || '',
    tempatLahir: employee.birth_place || '',
    tanggalLahir: employee.birth_date || '',
    jenisKelamin: normalizeGender(employee.gender),
    alamatKTP: employee.address_ktp || '',
    alamatDomisili: employee.address_domicile || '',
    pendidikan: employee.education || '',
    agama: employee.religion || '',
    namaSuamiIstri: spouse?.name || '',
    namaAnak: children.map((child: any) => child.name).join(', '),
    jumlahAnak: children.length ? String(children.length) : '',
    grup: employee.group || '',
    statusMarital: employee.marital_status?.name || '',
    referensi: employee.referensi || '',
    noSIO: employee.sio_number || '',
    namaPemilikRekening: bankAccount?.account_holder_name || '',
    nomorRekening: bankAccount?.account_number || '',
    bank: bankAccount?.bank?.name || (bankAccount?.bank_id ? `Bank ID ${bankAccount.bank_id}` : ''),
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
  const data = employeeResponse?.data ? normalizeEmployeeDetail(employeeResponse.data) : null;

  // ===== TAB CONTROL =====
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

      {/* ================= BREADCRUMB ================= */}
      <div className="flex items-center gap-2 text-sm mb-4">
        {/* <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" /> */}
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

      {/* ================= HEADER ================= */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Foto Kotak - Square */}
            <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <img
                src={data.foto}
                alt={data.nama}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Karyawan */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary mb-3">
                {data.nama}
              </h1>

              {/* Email dan Phone dengan Divider */}
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

              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-primary rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <IdCard className="w-3.5 h-3.5 text-white" />
                    <span>ID Karyawan</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.id}</p>
                </div>

                <div className="bg-primary rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-white" />
                    <span>Jabatan</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.jabatan}</p>
                </div>

                <div className="bg-primary rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                    <span>Divisi</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.divisi}</p>
                </div>

                <div className="bg-primary rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-white" />
                    <span>Tanggal Bergabung</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {formatTanggalIndonesia(data.tanggalBergabung)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= ALERT ================= */}
      {data.pengingat && data.pengingat !== '-' && (
        <Alert className="bg-red-50 border-red-300">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Perhatian</AlertTitle>
          <AlertDescription className="text-red-700">{data.pengingat}</AlertDescription>
        </Alert>
      )}

      {/* ================= TABS ================= */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        {/* ===== TAB HEADER ===== */}
        <TabsList className="
          flex
          bg-white border-b border-gray-200
          w-full
          h-auto
          p-0
          gap-0
        ">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  flex-1
                  flex items-center justify-center gap-2
                  px-4 py-3 text-sm font-medium
                  text-gray-600
                  border-b-2 border-transparent
                  transition-all duration-200
                  hover:text-gray-900
                  hover:bg-gray-50
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#1E40AF]
                  data-[state=active]:text-white
                  data-[state=active]:border-[#1E40AF]
                  data-[state=active]:rounded-t-sm
                  data-[state=active]:mb-[-1px]
                "
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* ===== TAB CONTENT ===== */}
        {tabs.map((tab) => {
          const Component = tabComponents[tab.value];

          return (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="
                mt-6
                animate-in fade-in-50 slide-in-from-bottom-2
                duration-300
              "
            >
              {Component ? <Component data={data} /> : <div>Coming Soon</div>}
            </TabsContent>
          );
        })}

      </Tabs>
    </div>
  );
};

export default DetailKaryawanPage;
