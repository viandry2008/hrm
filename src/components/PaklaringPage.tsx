import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { StatCard, StatCardGrid } from '@/components/ui/stat-card';
import { Search, Eye, Trash2, FileText, File, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import Swal from 'sweetalert2';

interface PaklaringData {
  no: number;
  noSurat: string;
  idKaryawan: string;
  namaKaryawan: string;
  tanggalBergabung: Date;
  tanggalKontrak: Date;
  tanggalSelesai: Date;
  keterangan: string;
  dibuatTanggal: Date;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak' | 'Berlaku' | 'Selesai';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
}

const mockData: PaklaringData[] = [
  {
    no: 1,
    noSurat: 'PK/2024/001',
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    tanggalBergabung: new Date('2022-01-01'),
    tanggalKontrak: new Date('2024-01-01'),
    tanggalSelesai: new Date('2024-12-31'),
    keterangan: 'Mengundurkan diri secara baik-baik',
    dibuatTanggal: new Date('2024-06-20T09:15:00'),
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    noSurat: 'PK/2024/002',
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    tanggalBergabung: new Date('2021-03-15'),
    tanggalKontrak: new Date('2024-01-10'),
    tanggalSelesai: new Date('2024-06-10'),
    keterangan: 'Selesai masa kontrak',
    dibuatTanggal: new Date('2024-06-18T14:00:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-19T10:30:00')
  },
  {
    no: 3,
    noSurat: 'PK/2024/003',
    idKaryawan: 'EMP003',
    namaKaryawan: 'Budi Santoso',
    tanggalBergabung: new Date('2023-05-01'),
    tanggalKontrak: new Date('2024-05-01'),
    tanggalSelesai: new Date('2024-10-01'),
    keterangan: 'Masa percobaan selesai',
    dibuatTanggal: new Date('2024-05-10T08:00:00'),
    status: 'Berlaku',
    tanggalDisetujui: new Date('2024-05-12T11:00:00')
  },
  {
    no: 4,
    noSurat: 'PK/2024/004',
    idKaryawan: 'EMP004',
    namaKaryawan: 'Dewi Lestari',
    tanggalBergabung: new Date('2022-08-15'),
    tanggalKontrak: new Date('2024-09-01'),
    tanggalSelesai: new Date('2025-08-31'),
    keterangan: 'Perpanjangan kontrak',
    dibuatTanggal: new Date('2024-08-20T10:30:00'),
    status: 'Selesai',
    tanggalDisetujui: new Date('2024-08-25T14:00:00')
  },
  {
    no: 5,
    noSurat: 'PK/2024/005',
    idKaryawan: 'EMP005',
    namaKaryawan: 'Rina Wijaya',
    tanggalBergabung: new Date('2023-11-01'),
    tanggalKontrak: new Date('2024-11-01'),
    tanggalSelesai: new Date('2025-10-31'),
    keterangan: 'Awal masa kontrak',
    dibuatTanggal: new Date('2024-10-28T09:00:00'),
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-10-30T16:00:00')
  }
];

export const PaklaringPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<PaklaringData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.noSurat.toLowerCase().includes(searchTerm.toLowerCase())
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
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const getStatusBadge = (item: PaklaringData) => {
    const { status, tanggalDisetujui, tanggalDitolak } = item;

    if (status === 'Ditolak') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 w-fit rounded-none px-2 py-1">
            Ditolak
          </Badge>
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
            Disetujui
          </Badge>
          {tanggalDisetujui && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDisetujui)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Berlaku') {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit rounded-none px-2 py-1">
          Berlaku
        </Badge>
      );
    }

    if (status === 'Selesai') {
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 w-fit rounded-none px-2 py-1">
          Selesai
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
        Menunggu Disetujui
      </Badge>
    );
  };

  const handleDelete = (no: number) => {
    Swal.fire({
      title: 'Hapus Data?',
      text: 'Data yang sudah dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setData(prev => prev.filter(item => item.no !== no));
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        });
      }
    });
  };

  const handleDownloadConfirm = async (noSurat: string, nama: string) => {
    const result = await Swal.fire({
      title: 'Download Dokumen?',
      text: `Apakah Anda yakin ingin mengunduh dokumen No Surat: ${noSurat}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Download',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#dc2626',
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Berhasil!',
        text: `Dokumen untuk ${nama} sedang diunduh.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      const blob = new Blob([`Ini adalah isi dokumen resign ${noSurat}`], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Surat_${noSurat.replace(/\//g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <TableCard icon={File} title="Data Pengajuan Paklaring">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
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
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No Surat</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Bergabung</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Selesai</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Keterangan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.noSurat}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalBergabung)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalKontrak)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.keterangan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {getStatusBadge(item)}
                    </TableCell>
                    <TableCell className="border">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {item.status === 'Disetujui' && item.noSurat && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => handleDownloadConfirm(item.noSurat!, item.namaKaryawan)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(item.no)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-6">
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