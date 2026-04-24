import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatCard, StatCardGrid } from '@/components/ui/stat-card';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { Search, Eye, Trash2, Calendar, FileText, File, Send } from 'lucide-react';
import Swal from 'sweetalert2';

interface KontrakKerjaData {
  no: number;
  nomorSurat: string;
  nama: string;
  idKaryawan: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  dibuatTanggal: Date;
  dibuatOleh: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Telah Ditandatangani' | 'Ditolak' | 'Aktif';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
  tanggalTelahDitandatangani?: Date;
  tanggalStatus?: Date;
  tipeKontrak?: 'Kontrak Baru' | 'Renewal Kontrak';
}

const mockKontrak: KontrakKerjaData[] = [
  {
    no: 1,
    nomorSurat: 'SK-001/HRD/2024',
    nama: 'Budi Santoso',
    idKaryawan: 'EMP001',
    tanggalMulai: new Date('2024-07-01'),
    tanggalSelesai: new Date('2025-06-30'),
    dibuatTanggal: new Date('2024-06-15T09:00:00'),
    dibuatOleh: 'Admin HR',
    status: 'Aktif',
    tipeKontrak: 'Kontrak Baru',
  },
  {
    no: 2,
    nomorSurat: 'SK-002/HRD/2024',
    nama: 'Siti Aminah',
    idKaryawan: 'EMP002',
    tanggalMulai: new Date('2024-07-15'),
    tanggalSelesai: new Date('2025-07-14'),
    dibuatTanggal: new Date('2024-06-25T10:30:00'),
    dibuatOleh: 'Admin HR',
    status: 'Menunggu Disetujui',
    tipeKontrak: 'Renewal Kontrak',
  },
  {
    no: 3,
    nomorSurat: 'SK-003/HRD/2024',
    nama: 'Andi Prasetyo',
    idKaryawan: 'EMP003',
    tanggalMulai: new Date('2024-08-01'),
    tanggalSelesai: new Date('2025-07-31'),
    dibuatTanggal: new Date('2024-07-10T14:00:00'),
    dibuatOleh: 'Admin HR',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-07-12T11:00:00'),
    tanggalStatus: new Date('2024-07-12T11:00:00'),
  },
  {
    no: 4,
    nomorSurat: 'SK-004/HRD/2024',
    nama: 'Dewi Lestari',
    idKaryawan: 'EMP004',
    tanggalMulai: new Date('2024-09-01'),
    tanggalSelesai: new Date('2025-08-31'),
    dibuatTanggal: new Date('2024-08-15T16:00:00'),
    dibuatOleh: 'Admin HR',
    status: 'Telah Ditandatangani',
    tanggalTelahDitandatangani: new Date('2024-08-20T10:00:00'),
    tanggalStatus: new Date('2024-08-20T10:00:00'),
  },
];

export const KontrakKerjaPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<KontrakKerjaData[]>(mockKontrak);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(search.toLowerCase()) ||
    item.nomorSurat.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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

  const getStatusBadge = (item: KontrakKerjaData) => {
    const { status, tanggalStatus } = item;

    switch (status) {
      case 'Aktif':
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit rounded-none px-2 py-1">
              Aktif
            </Badge>
          </div>
        );
      case 'Menunggu Disetujui':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
            Menunggu Disetujui
          </Badge>
        );
      case 'Disetujui':
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit rounded-none px-2 py-1">
              Disetujui
            </Badge>
            {tanggalStatus && (
              <span className="text-xs text-gray-500">
                {formatDateTime(tanggalStatus)}
              </span>
            )}
          </div>
        );
      case 'Telah Ditandatangani':
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit rounded-none px-2 py-1">
              Telah Ditandatangani
            </Badge>
            {tanggalStatus && (
              <span className="text-xs text-gray-500">
                {formatDateTime(tanggalStatus)}
              </span>
            )}
          </div>
        );
      case 'Ditolak':
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 w-fit rounded-none px-2 py-1">
              Ditolak
            </Badge>
            {tanggalStatus && (
              <span className="text-xs text-gray-500">
                {formatDateTime(tanggalStatus)}
              </span>
            )}
          </div>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 w-fit rounded-none px-2 py-1">
            {status}
          </Badge>
        );
    }
  };

  const handleDeleteSingle = (no: number) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data Kontrak Kerja ini akan dihapus permanen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
        title: 'text-white',
        confirmButton: 'bg-white text-blue-500 hover:bg-blue-100',
        cancelButton: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
      },
      iconColor: '#bfdbfe',
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.no !== no));
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kontrak Kerja berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#3b82f6',
          color: '#ffffff',
          customClass: {
            popup: 'bg-blue-500 text-white',
          },
        });
      }
    });
  };

  const handleSend = (no: number) => {
    const itemToSend = data.find(item => item.no === no);
    if (!itemToSend) return;

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Kontrak Kerja untuk ${itemToSend.nama} akan dikirim ke Karyawan untuk ditandatangani!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim!',
      cancelButtonText: 'Batal',
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
        title: 'text-white',
        confirmButton: 'bg-white text-blue-500 hover:bg-blue-100',
        cancelButton: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
      },
      iconColor: '#bfdbfe',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Kontrak dengan ID/No ${no} dikirim.`);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kontrak Kerja berhasil dikirim.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#3b82f6',
          color: '#ffffff',
          customClass: {
            popup: 'bg-blue-500 text-white',
          },
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <StatCardGrid>
        <StatCard
          title="Menunggu Disetujui"
          value={data.filter(d => d.status === 'Menunggu Disetujui').length}
          subtitle="Pengajuan"
          icon={Calendar}
          borderColor="yellow"
        />
        <StatCard
          title="Total Kontrak Aktif"
          value={data.filter(d => d.status === 'Disetujui' || d.status === 'Aktif' || d.status === 'Telah Ditandatangani').length}
          subtitle="Pengajuan"
          icon={FileText}
          borderColor="green"
        />
        <StatCard
          title="Total Kontrak Ditolak"
          value={data.filter(d => d.status === 'Ditolak').length}
          subtitle="Pengajuan"
          icon={File}
          borderColor="red"
        />

        <StatCard
          title="Telah Ditandatangani"
          value={data.filter(d => d.status === 'Telah Ditandatangani').length}
          subtitle="Kontrak"
          icon={File}
          borderColor="old_blue"
        />

        <StatCard
          title="Total Kontrak Kerja"
          value={data.length}
          subtitle="Pengajuan"
          icon={FileText}
          borderColor="blue"
        />
      </StatCardGrid>

      <TableCard icon={File} title="Data Kontrak Kerja">
        <TableToolbar
          searchValue={search}
          onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
          searchPlaceholder="Cari berdasarkan nama, ID, atau nomor surat..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={() => Swal.fire({
            title: 'Fitur Tambah Data',
            text: 'Fitur tambah data masih dalam pengembangan.',
            icon: 'info',
            confirmButtonColor: '#2563eb'
          })}
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nomor Surat</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Mulai</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Berakhir</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tipe Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.nomorSurat}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalMulai)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.tipeKontrak || 'Kontrak Baru'}</TableCell>
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
                        {(item.status === 'Disetujui' || item.status === 'Aktif') && (
                          <Button
                            size="sm"
                            className="bg-pink-600 text-white hover:bg-pink-700"
                            title="Kirim ke Karyawan"
                            onClick={() => handleSend(item.no)}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                        {(item.status === 'Menunggu Disetujui' || item.status === 'Telah Ditandatangani') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700"
                            title="Hapus Data"
                            onClick={() => handleDeleteSingle(item.no)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">
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
    </div>
  );
};
