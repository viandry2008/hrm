import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface KeteranganKerjaData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  keperluan: string;
  dibuatTanggal: Date;
}

const mockData: KeteranganKerjaData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    keperluan: 'Melamar kerja di perusahaan baru',
    dibuatTanggal: new Date('2024-01-15T09:30:00')
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    keperluan: 'Pengajuan kredit KPR',
    dibuatTanggal: new Date('2024-01-10T14:20:00')
  }
];

export const KeteranganBekerjaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<KeteranganKerjaData[]>(mockData);
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Surat Keterangan Bekerja</h1>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Surat</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filter & Buat Surat */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {/* Show per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(val) => setItemsPerPage(Number(val))}>
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

              {/* Search input */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari berdasarkan nama, ID, atau divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Buat Surat */}
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Buat Surat
            </Button>
          </div>

          {/* Tabel */}
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
            <TableRow className="bg-brand text-white hover:bg-brand">
              <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
              <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Keperluan</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Dibuat Tanggal</TableHead>
              <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
            </TableRow>
          </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="hover:bg-gray-50">
                    <TableCell className="border border-gray-300">{item.no}</TableCell>
                    <TableCell className="border border-gray-300">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-300">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-300">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-300">{item.jabatan}</TableCell>
                    <TableCell className="border border-gray-300">{item.keperluan}</TableCell>
                    <TableCell className="border border-gray-300">{formatDateTime(item.dibuatTanggal)}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};
