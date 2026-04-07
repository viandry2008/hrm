import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  User,
  Building2,
  Briefcase,
  Wallet,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface PinjamanData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  jumlahPinjaman: number;
  keteranganPinjaman: string;
  termin: string;
  tanggalPengajuan: Date;
  catatan: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
}

// Mock data - nanti bisa diganti dengan API call
const mockData: PinjamanData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    jumlahPinjaman: 5000000,
    keteranganPinjaman: 'Pinjaman untuk renovasi rumah',
    termin: '12 bulan',
    tanggalPengajuan: new Date('2024-01-15T09:30:00'),
    catatan: 'Pembayaran setiap tanggal 15',
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jumlahPinjaman: 3000000,
    keteranganPinjaman: 'Pinjaman pendidikan anak',
    termin: '6 bulan',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    catatan: 'Potong gaji bulanan',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-12T10:15:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jumlahPinjaman: 3000000,
    keteranganPinjaman: 'Pinjaman pendidikan anak',
    termin: '6 bulan',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    catatan: 'Potong gaji bulanan',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-01-22T11:45:00')
  }
];

const DetailPinjamanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<PinjamanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const pinjaman = mockData.find(d => d.no === Number(id));
      setData(pinjaman || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Disetujui') {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    }
    if (status === 'Ditolak') {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        <Clock className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Data pinjaman tidak ditemukan</AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/pinjaman')} 
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>Home</span>
        </button>
        <span className="text-gray-400">/</span>
        <button 
          onClick={() => navigate('/pinjaman')}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>Pinjaman</span>
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">Detail Pinjaman</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Detail Pinjaman</h1>
        <Button onClick={() => navigate('/pinjaman')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Status Card */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1E40AF] mb-2">
                #{data.no} - {data.namaKaryawan}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>ID: {data.idKaryawan}</span>
                <span>•</span>
                <span>{data.divisi}</span>
                <span>•</span>
                <span>{data.jabatan}</span>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(data.status)}
              {data.status === 'Disetujui' && data.tanggalDisetujui && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateTime(data.tanggalDisetujui)}
                </p>
              )}
              {data.status === 'Ditolak' && data.tanggalDitolak && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateTime(data.tanggalDitolak)}
                </p>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#1E40AF] rounded-md p-4">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Jumlah Pinjaman</span>
              </div>
              <p className="text-xl font-bold text-white">
                {formatCurrency(data.jumlahPinjaman)}
              </p>
            </div>

            <div className="bg-[#1E40AF] rounded-md p-4">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Termin</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {data.termin}
              </p>
            </div>

            <div className="bg-[#1E40AF] rounded-md p-4">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Tanggal Pengajuan</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatDateTime(data.tanggalPengajuan)}
              </p>
            </div>
          </div>

          {/* Keterangan & Catatan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FileText className="w-4 h-4" />
                <span className="font-semibold">Keterangan Pinjaman</span>
              </div>
              <p className="text-gray-700">{data.keteranganPinjaman}</p>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FileText className="w-4 h-4" />
                <span className="font-semibold">Catatan</span>
              </div>
              <p className="text-gray-700">{data.catatan}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPinjamanPage;