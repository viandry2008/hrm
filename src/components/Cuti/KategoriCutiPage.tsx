import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { TableCard } from "@/components/ui/table-card";

// Interface Cuti
interface CutiData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  jenisCuti: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  alasan: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
  tanggalPengajuan: Date;
  periodeCuti: string;
  sisaCuti: number;
}

// Mock Data Cuti
const mockData: CutiData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    nama: 'Andi Saputra',
    divisi: 'IT',
    jabatan: 'Developer',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-07-01'),
    tanggalSelesai: new Date('2024-07-05'),
    alasan: 'Liburan bersama keluarga',
    status: 'Menunggu Disetujui',
    periodeCuti: '5 Hari',
    sisaCuti: 10,
    tanggalPengajuan: new Date('2024-06-15T10:12:00')
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    nama: 'Rina Maulida',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jenisCuti: 'Cuti Melahirkan',
    tanggalMulai: new Date('2024-06-10'),
    tanggalSelesai: new Date('2024-09-10'),
    alasan: 'Kelahiran anak pertama',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-01T09:30:00'),
    periodeCuti: '90 Hari',
    sisaCuti: 0,
    tanggalPengajuan: new Date('2024-05-25T08:45:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP003',
    nama: 'Budi Santoso',
    divisi: 'Keuangan',
    jabatan: 'Accountant',
    jenisCuti: 'Cuti Sakit',
    tanggalMulai: new Date('2024-08-01'),
    tanggalSelesai: new Date('2024-08-05'),
    alasan: 'Sakit perut',
    status: 'Menunggu Disetujui',
    periodeCuti: '5 Hari',
    sisaCuti: 8,
    tanggalPengajuan: new Date('2024-07-28T14:20:00')
  },
  {
    no: 4,
    idKaryawan: 'EMP004',
    nama: 'Siti Nurfadilah',
    divisi: 'Marketing',
    jabatan: 'Marketing Staff',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-09-01'),
    tanggalSelesai: new Date('2024-09-03'),
    alasan: 'Pernikahan saudara',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-08-25T10:00:00'),
    periodeCuti: '3 Hari',
    sisaCuti: 5,
    tanggalPengajuan: new Date('2024-08-20T09:15:00')
  },
  {
    no: 5,
    idKaryawan: 'EMP005',
    nama: 'Joko Susilo',
    divisi: 'IT',
    jabatan: 'Frontend Developer',
    jenisCuti: 'Cuti Darurat',
    tanggalMulai: new Date('2024-08-10'),
    tanggalSelesai: new Date('2024-08-12'),
    alasan: 'Keluarga sakit',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-08-05T16:00:00'),
    periodeCuti: '2 Hari',
    sisaCuti: 3,
    tanggalPengajuan: new Date('2024-08-05T16:00:00')
  },
  {
    no: 6,
    idKaryawan: 'EMP006',
    nama: 'Ani Lestari',
    divisi: 'HR',
    jabatan: 'Recruitment',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-07-20'),
    tanggalSelesai: new Date('2024-07-25'),
    alasan: 'Liburan ke Bali',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-07-15T11:00:00'),
    periodeCuti: '5 Hari',
    sisaCuti: 2,
    tanggalPengajuan: new Date('2024-07-10T08:30:00')
  },
  {
    no: 7,
    idKaryawan: 'EMP007',
    nama: 'Heri Kurniawan',
    divisi: 'Keuangan',
    jabatan: 'Staff Keuangan',
    jenisCuti: 'Cuti Pribadi',
    tanggalMulai: new Date('2024-07-15'),
    tanggalSelesai: new Date('2024-07-18'),
    alasan: 'Pindah rumah',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-07-10T10:45:00'),
    periodeCuti: '4 Hari',
    sisaCuti: 1,
    tanggalPengajuan: new Date('2024-07-10T10:45:00')
  },
  {
    no: 8,
    idKaryawan: 'EMP008',
    nama: 'Lina Suryadi',
    divisi: 'Marketing',
    jabatan: 'Marketing Supervisor',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-06-15'),
    tanggalSelesai: new Date('2024-06-20'),
    alasan: 'Liburan ke luar negeri',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-06-05T13:00:00'),
    periodeCuti: '6 Hari',
    sisaCuti: 0,
    tanggalPengajuan: new Date('2024-06-05T13:00:00')
  }
];

// Fungsi Format Tanggal dan Waktu
const formatDateTime = (date: Date) => {
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Komponen Badge Status
const getStatusBadge = (item: CutiData) => {
  if (item.status === 'Disetujui') {
    return (
      <div className="flex flex-col">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">
          {item.status}
        </Badge>
        {item.tanggalDisetujui && (
          <span className="text-xs text-gray-500">
            {formatDateTime(item.tanggalDisetujui)}
          </span>
        )}
      </div>
    );
  } else if (item.status === 'Ditolak') {
    return (
      <div className="flex flex-col">
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 mb-1">
          {item.status}
        </Badge>
        {item.tanggalDitolak && (
          <span className="text-xs text-gray-500">
            {formatDateTime(item.tanggalDitolak)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-1">
        {item.status}
      </Badge>
    </div>
  );
};

// Halaman Utama
export const DataCutiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<CutiData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisCuti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID');
  };

  const handleDeleteSingle = (id: string) => {
    console.log('Hapus data dengan ID:', id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Cuti</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Menunggu Disetujui */}
        <Card className="bg-yellow-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Menunggu Disetujui
            </CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Menunggu Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan </p>
          </CardContent>
        </Card>

        {/* Disetujui */}
        <Card className="bg-green-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Disetujui
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Ditolak */}
        <Card className="bg-red-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Ditolak
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Ditolak').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Total Pengajuan */}
        <Card className="bg-blue-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Cuti
            </CardTitle>
            <FileText className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.length}</div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>
      </div>

      <TableCard icon={FileText} title="Data Pengajuan Cuti">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, jabatan, atau jenis cuti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Cuti
            </Button>
          </div>
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">ID</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Nama</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jenis Cuti</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Mulai Tanggal</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Sampai Tanggal</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Periode Cuti</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Alasan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Sisa Cuti</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Tanggal Pengajuan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border">
                    <TableCell className="border whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.jenisCuti}</TableCell>
                    <TableCell className="border whitespace-nowrap">{formatDate(item.tanggalMulai)}</TableCell>
                    <TableCell className="border whitespace-nowrap">{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.periodeCuti}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.alasan}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.sisaCuti}</TableCell>
                    <TableCell className="border whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="border whitespace-nowrap">{getStatusBadge(item)}</TableCell>
                    <TableCell className="border whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
                          onClick={() => handleDeleteSingle(item.idKaryawan)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * itemsPerPage + 1, 1)} sampai{' '}
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong> data
            </div>
            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Sebelumnya
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Selanjutnya
              </Button>
            </div>
          </div>

      </TableCard>
    </div>
  );
};