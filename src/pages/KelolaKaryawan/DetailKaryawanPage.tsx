import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  FileText
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
    statusKerja: 'Aktif',
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

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between bg-white p-6 rounded-1xl border">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={data.foto} />
            <AvatarFallback>{data.nama[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold">{data.nama}</h1>
            <p className="text-gray-500">
              {data.jabatan} • {data.divisi}
            </p>
          </div>
        </div>

        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>

      {/* ================= ALERT ================= */}
      {data.pengingat && data.pengingat !== '-' && (
        <Alert className="bg-yellow-50 border-yellow-300">
          <AlertTitle>Perhatian</AlertTitle>
          <AlertDescription>{data.pengingat}</AlertDescription>
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
                  data-[state=active]:bg-blue-600
                  data-[state=active]:text-white
                  data-[state=active]:border-blue-600
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