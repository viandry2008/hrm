import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText, File } from 'lucide-react';
import { PinjamanModal } from './PinjamanModal';
import { StatCard, StatCardGrid } from '@/components/ui/stat-card';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import Swal from 'sweetalert2';

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
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Diproses Finance' | 'Ditransfer' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDiprosesFinance?: Date;
  tanggalDitransfer?: Date;
  tanggalDitolak?: Date;
  catatanPenolakan?: string;
}

const mockData: PinjamanData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    jumlahPinjaman: 5000000,
    keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
    termin: '12 bulan',
    tanggalPengajuan: new Date('2024-01-15T09:30:00'),
    catatan: 'Renovasi rumah',
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jumlahPinjaman: 3000000,
    keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
    termin: '6 bulan',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    catatan: 'Pendidikan anak',
    status: 'Diproses Finance',
    tanggalDisetujui: new Date('2024-01-12T10:15:00'),
    tanggalDiprosesFinance: new Date('2024-01-13T09:00:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP003',
    namaKaryawan: 'Budi Santoso',
    divisi: 'Finance',
    jabatan: 'Accountant',
    jumlahPinjaman: 2000000,
    keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
    termin: '4 bulan',
    tanggalPengajuan: new Date('2024-02-01T10:00:00'),
    catatan: 'Biaya medis keluarga',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-02-05T14:30:00'),
    catatanPenolakan: 'Terlalu banyak reimbursement'
  },
  {
    no: 4,
    idKaryawan: 'EMP004',
    namaKaryawan: 'Dewi Lestari',
    divisi: 'Marketing',
    jabatan: 'Marketing Staff',
    jumlahPinjaman: 4000000,
    keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
    termin: '8 bulan',
    tanggalPengajuan: new Date('2024-01-05T11:00:00'),
    catatan: 'Biaya pendidikan',
    status: 'Ditransfer',
    tanggalDisetujui: new Date('2024-01-06T14:00:00'),
    tanggalDiprosesFinance: new Date('2024-01-07T10:00:00'),
    tanggalDitransfer: new Date('2024-01-08T15:30:00')
  },
  // Data dummy ketika pengajuan disetujui oleh HRD
  {
    no: 5,
    idKaryawan: 'EMP005',
    namaKaryawan: 'Rina Wijaya',
    divisi: 'Operasional',
    jabatan: 'Staff Operasional',
    jumlahPinjaman: 2500000,
    keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
    termin: '5 bulan',
    tanggalPengajuan: new Date('2024-02-10T08:45:00'),
    catatan: 'Biaya perbaikan kendaraan',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-02-11T13:20:00')
  }
];

export const PinjamanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<PinjamanData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter(item =>
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const dateString = date.toLocaleDateString('id-ID', options);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${dateString}, ${hours}:${minutes}`;
  };

  const getStatusBadge = (item: PinjamanData) => {
    const { status, tanggalDisetujui, tanggalDiprosesFinance, tanggalDitransfer, tanggalDitolak, catatanPenolakan } = item;

    if (status === 'Ditolak') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 w-fit rounded-none px-2 py-1">
            Ditolak oleh HRD
          </Badge>
          {catatanPenolakan && (
            <div className="text-xs">
              <span className="font-bold text-gray-900">Catatan : </span>
              <span className="text-gray-700">{catatanPenolakan}</span>
            </div>
          )}
          {tanggalDitolak && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDitolak)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Disetujui') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit rounded-none px-2 py-1">
            Disetujui oleh HRD
          </Badge>
          {tanggalDisetujui && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDisetujui)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Diproses Finance') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit rounded-none px-2 py-1">
            Diproses oleh Finance
          </Badge>
          {tanggalDiprosesFinance && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDiprosesFinance)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Ditransfer') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 w-fit rounded-none px-2 py-1">
            Pinjaman Ditransfer
          </Badge>
          {tanggalDitransfer && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDitransfer)}
            </span>
          )}
        </div>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
        {status}
      </Badge>
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePinjaman = (pinjamanData: any) => {
    const newPinjaman: PinjamanData = {
      no: data.length + 1,
      idKaryawan: pinjamanData.karyawan.id,
      namaKaryawan: pinjamanData.karyawan.nama,
      divisi: pinjamanData.karyawan.divisi,
      jabatan: pinjamanData.karyawan.jabatan,
      jumlahPinjaman: parseFloat(pinjamanData.jumlahPinjaman.replace(/\./g, '')) || 0,
      keteranganPinjaman: 'Pinjaman akan Dipotong setiap tanggal 25',
      termin: `${pinjamanData.termin} bulan`,
      tanggalPengajuan: new Date(),
      catatan: pinjamanData.tujuanPinjaman,
      status: 'Menunggu Disetujui'
    };

    setData([newPinjaman, ...data]);

    Swal.fire({
      title: 'Berhasil!',
      text: 'Pengajuan pinjaman berhasil diajukan.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
      },
    });
  };

  return (
    <div className="p-6 space-y-6">

      <StatCardGrid>
        <StatCard
          title="Menunggu Disetujui"
          value={data.filter(d => d.status === 'Menunggu Disetujui').length}
          subtitle="Pengajuan"
          icon={Clock}
          borderColor="yellow"
        />
        <StatCard
          title="Total Pengajuan Disetujui"
          value={data.filter(d => d.status === 'Disetujui' || d.status === 'Diproses Finance' || d.status === 'Ditransfer').length}
          subtitle="Pengajuan"
          icon={CheckCircle}
          borderColor="green"
        />
        <StatCard
          title="Total Pengajuan Ditolak"
          value={data.filter(d => d.status === 'Ditolak').length}
          subtitle="Pengajuan"
          icon={XCircle}
          borderColor="red"
        />
        <StatCard
          title="Total Pengajuan Pinjaman"
          value={data.length}
          subtitle="Pengajuan"
          icon={FileText}
          borderColor="blue"
        />
      </StatCardGrid>

      <TableCard icon={File} title="Data Pengajuan">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari berdasarkan nama, ID, atau divisi..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={handleOpenModal}
          addButtonLabel="Ajukan Pinjaman"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jumlah Pinjaman</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Keterangan Pinjaman</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Termin</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tujuan Pinjaman</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Pengajuan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="font-semibold border-r whitespace-nowrap">{formatCurrency(item.jumlahPinjaman)}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.keteranganPinjaman}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.termin}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.catatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {getStatusBadge(item)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-6">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          pagination={{ current_page: currentPage, last_page: totalPages, per_page: itemsPerPage, total: filteredData.length }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          items={paginatedData}
        />
      </TableCard>

      {/* Modal Ajukan Pinjaman */}
      <PinjamanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePinjaman}
      />
    </div>
  );
};