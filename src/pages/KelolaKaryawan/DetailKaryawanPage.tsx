import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

// ================= MOCK =================
const mockData: any = {
  K001: {
    id: 'K001',
    nama: 'Andi Prasetyo',
    divisi: 'IT',
    jabatan: 'Software Engineer',
    kategori: 'Full Time',
    tanggalBergabung: '2021-03-15',
    tanggalKontrak: '2021-03-15',
    selesaiKontrak: '2024-03-15',
    pengingat: 'Kontrak akan habis dalam 90 hari',
    foto: 'https://randomuser.me/api/portraits/men/19.jpg',
    email: 'andi.prasetyo@example.com',
    nomorHandphone: '08567300484',
    alamat: 'Bekasi',
    username: '031125',
  }
};

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
const formatTanggalIndonesia = (tanggal: string): string => {
  const bulanIndonesia = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const [year, month, day] = tanggal.split('-');
  return `${day} ${bulanIndonesia[parseInt(month) - 1]} ${year}`;
};

// ================= MAIN =================
const DetailKaryawanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ===== TAB CONTROL =====
  const [activeTab, setActiveTab] = useState('akun');

  useEffect(() => {
    setTimeout(() => {
      setData(mockData[id as string]);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <Loader2 className="animate-spin w-4 h-4" />
        Loading...
      </div>
    );
  }

  if (!data) {
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
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
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
              <h1 className="text-2xl font-bold text-[#1E40AF] mb-3">
                {data.nama}
              </h1>

              {/* Email dan Phone dengan Divider */}
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#1E40AF]" />
                  <span>{data.email}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#1E40AF]" />
                  <span>{data.nomorHandphone}</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#1E40AF] rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <IdCard className="w-3.5 h-3.5 text-white" />
                    <span>ID Karyawan</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.id}</p>
                </div>

                <div className="bg-[#1E40AF] rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-white" />
                    <span>Jabatan</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.jabatan}</p>
                </div>

                <div className="bg-[#1E40AF] rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                    <span>Divisi</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{data.divisi}</p>
                </div>

                <div className="bg-[#1E40AF] rounded-md p-3">
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