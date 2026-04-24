import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { Search, Eye, Trash2, FileText } from 'lucide-react';
import Swal from 'sweetalert2';

interface POData {
  poNo: number;
  judulPO: string;
  nomorPO: string;
  divisi: string;
  dibuatOleh: string;
  jumlah: number;
  dibuatTanggal: Date;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
}

const mockPO: POData[] = [
  {
    poNo: 1,
    judulPO: 'Pengadaan Alat Tulis Kantor',
    nomorPO: 'PO/2024/001',
    divisi: 'Procurement',
    dibuatOleh: 'Rina Permata',
    jumlah: 1500000,
    dibuatTanggal: new Date('2024-06-14T08:30:00'),
    status: 'Menunggu Disetujui'
  },
  {
    poNo: 2,
    judulPO: 'Pembelian Laptop',
    nomorPO: 'PO/2024/002',
    divisi: 'IT',
    dibuatOleh: 'Budi Santoso',
    jumlah: 12000000,
    dibuatTanggal: new Date('2024-06-12T10:00:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-13T14:45:00')
  }
];

export const POPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<POData[]>(mockPO);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.nomorPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.judulPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dibuatOleh.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  const formatDateTime = (date: Date) =>
    date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const getStatusBadge = (status: string, tanggalDisetujui?: Date) => {
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
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
        Menunggu Disetujui
      </Badge>
    );
  };

  const handleDeleteSingle = (poNo: number) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data PO akan dihapus permanen',
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
        Swal.fire({
          title: 'Berhasil!',
          text: 'PO berhasil dihapus.',
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
      <TableCard icon={FileText} title="Data PO">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari Nomor PO, Judul, Divisi, Pembuat..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={() => {}}
          addButtonLabel="Ajukan PO"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nomor PO</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Judul</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Dibuat Oleh</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jumlah</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Pengajuan</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.poNo} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.poNo}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.nomorPO}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.judulPO}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.dibuatOleh}</TableCell>
                    <TableCell className="font-semibold border border-gray-200 whitespace-nowrap">{formatCurrency(item.jumlah)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.dibuatTanggal)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {getStatusBadge(item.status, item.tanggalDisetujui)}
                    </TableCell>
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
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
                          onClick={() => handleDeleteSingle(item.poNo)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
