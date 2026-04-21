import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCard } from "@/components/ui/table-card";
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

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
        <div className="flex flex-col">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">{status}</Badge>
          {tanggalDisetujui && (
            <span className="text-xs text-gray-500">{formatDateTime(tanggalDisetujui)}</span>
          )}
        </div>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">

      <TableCard icon={FileText} title="Data PO">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
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
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari Nomor PO, Judul, Divisi, Pembuat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Button className="w-full md:w-fit bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan PO
            </Button>
          </div>
        </div>

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="border text-white whitespace-nowrap">No</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Nomor PO</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Judul</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Dibuat Oleh</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Jumlah</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Tanggal Pengajuan</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.poNo}>
                  <TableCell className="border border-gray-300">{item.poNo}</TableCell>
                  <TableCell className="border border-gray-300">{item.nomorPO}</TableCell>
                  <TableCell className="border border-gray-300">{item.judulPO}</TableCell>
                  <TableCell className="border border-gray-300">{item.divisi}</TableCell>
                  <TableCell className="border border-gray-300">{item.dibuatOleh}</TableCell>
                  <TableCell className="border border-gray-300">{formatCurrency(item.jumlah)}</TableCell>
                  <TableCell className="border border-gray-300">{formatDateTime(item.dibuatTanggal)}</TableCell>
                  <TableCell className="border border-gray-300">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                  <TableCell className="border border-gray-300">
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
                        onClick={() => handleDeleteSingle(k.id)}
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
