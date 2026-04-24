import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { Search, Eye, Trash2, Download, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

interface SuratPeringatanData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  peringatan: string;
  masaBerlaku: string;
  sampaiDengan: string;
  dibuatOleh: string;
  dibuatTanggal: Date;
}

const mockData: SuratPeringatanData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    peringatan: 'SP1 karena keterlambatan',
    masaBerlaku: '12/07/2025',
    sampaiDengan: '22/08/2025',
    dibuatOleh: 'HRD',
    dibuatTanggal: new Date('2025-06-12T09:00:00')
  }
];

export const SuratPeringatanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<SuratPeringatanData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(
    (item) =>
      item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID') + ' ' + date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <TableCard icon={AlertTriangle} title="Data Surat Peringatan">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari berdasarkan nama, ID, atau divisi..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={() => {}}
          addButtonLabel="Buat Surat"
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
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Peringatan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Masa Berlaku</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Sampai Dengan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Dibuat Oleh</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Dibuat Tanggal</TableHead>
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
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.peringatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.masaBerlaku}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.sampaiDengan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.dibuatOleh}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.dibuatTanggal)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
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
                          className="bg-green-600 text-white hover:bg-green-700"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
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
                  <TableCell colSpan={11} className="text-center py-6">
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
