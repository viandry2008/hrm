import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { TableCard } from "@/components/ui/table-card";
import { Search, Plus, Eye, Trash2, Download, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

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

  return (
    <div className="p-6 space-y-6">

      <TableCard icon={AlertTriangle} title="Data Surat Peringatan">
        {/* Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
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

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Buat Surat
          </Button>
        </div>

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="border text-white">No</TableHead>
                <TableHead className="border text-white">ID Karyawan</TableHead>
                <TableHead className="border text-white">Nama Karyawan</TableHead>
                <TableHead className="border text-white">Divisi</TableHead>
                <TableHead className="border text-white">Jabatan</TableHead>
                <TableHead className="border text-white">Peringatan</TableHead>
                <TableHead className="border text-white">Masa Berlaku</TableHead>
                <TableHead className="border text-white">Sampai Dengan</TableHead>
                <TableHead className="border text-white">Dibuat Oleh</TableHead>
                <TableHead className="border text-white">Dibuat Tanggal</TableHead>
                <TableHead className="border text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.no} className="hover:bg-gray-50">
                  <TableCell className="border">{item.no}</TableCell>
                  <TableCell className="border">{item.idKaryawan}</TableCell>
                  <TableCell className="border">{item.namaKaryawan}</TableCell>
                  <TableCell className="border">{item.divisi}</TableCell>
                  <TableCell className="border">{item.jabatan}</TableCell>
                  <TableCell className="border">{item.peringatan}</TableCell>
                  <TableCell className="border">{item.masaBerlaku}</TableCell>
                  <TableCell className="border">{item.sampaiDengan}</TableCell>
                  <TableCell className="border">{item.dibuatOleh}</TableCell>
                  <TableCell className="border">{formatDateTime(item.dibuatTanggal)}</TableCell>
                  <TableCell className="border">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
          <div className="text-sm text-gray-600">
            Menampilkan {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} data
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        </div>

      </TableCard>
    </div>
  );
};
