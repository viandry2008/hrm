import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Swal from 'sweetalert2';

interface ResignData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  keteranganResign: string;
  tanggalPengajuan: Date;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
  noSurat?: string;
}

const mockData: ResignData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    keteranganResign: 'Ingin fokus bisnis pribadi',
    tanggalPengajuan: new Date('2024-01-15T09:30:00'),
    status: 'Menunggu Disetujui',
    noSurat: 'PK/2024/001',
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    keteranganResign: 'Pindah domisili ke luar kota',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-12T10:15:00'),
    noSurat: 'PK/2024/002',
  }
];

export const PengunduranDiriPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<ResignData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDateTime = (date: Date) => {
    const formattedDate = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate}, ${formattedTime}`;
  };

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
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>
    );
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

      // Simulasi download
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Surat Pengunduran Diri</h1>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters & Button */}
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow w-full">
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
                  placeholder="Cari berdasarkan nama, ID, atau divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Button className="w-full sm:w-fit bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Resign
              </Button>
            </div>
          </div>

          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="border text-white">No.</TableHead>
                  <TableHead className="border text-white">ID Karyawan</TableHead>
                  <TableHead className="border text-white">Nama Karyawan</TableHead>
                  <TableHead className="border text-white">Divisi</TableHead>
                  <TableHead className="border text-white">Jabatan</TableHead>
                  <TableHead className="border text-white">Alasan Resign</TableHead>
                  <TableHead className="border text-white">Tanggal Pengajuan</TableHead>
                  <TableHead className="border text-white">Status</TableHead>
                  <TableHead className="border text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border-r">{item.no}</TableCell>
                    <TableCell className="font-medium border-r">{item.idKaryawan}</TableCell>
                    <TableCell className="border-r">{item.namaKaryawan}</TableCell>
                    <TableCell className="border-r">{item.divisi}</TableCell>
                    <TableCell className="border-r">{item.jabatan}</TableCell>
                    <TableCell className="border-r">{item.keteranganResign}</TableCell>
                    <TableCell className="border-r text-sm">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="border-r">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                    <TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};
