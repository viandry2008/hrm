import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
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
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateTime = (date: Date) => `${formatDate(date)} ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Surat Paklaring</h1>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Surat</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
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
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama, ID, atau no surat..."
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
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap ">No</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">No Surat</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Awal Bergabung</TableHead>
                  <TableHead className="border text-white">Tanggal Kontrak</TableHead>
                  <TableHead className="border text-white">Selesai Kontrak</TableHead>
                  <TableHead className="border text-white">Keterangan</TableHead>
                  <TableHead className="border text-white">Dibuat Tanggal</TableHead>
                  <TableHead className="border text-white">Status</TableHead>
                  <TableHead className="border text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border">{item.no}</TableCell>
                    <TableCell className="border">{item.noSurat}</TableCell>
                    <TableCell className="border">{item.idKaryawan}</TableCell>
                    <TableCell className="border">{item.namaKaryawan}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggalBergabung)}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggalKontrak)}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell className="border">{item.keterangan}</TableCell>
                    <TableCell className="border text-sm">{formatDateTime(item.dibuatTanggal)}</TableCell>
                    <TableCell className="border">
                      <div className="flex flex-col">
                        <Badge className={item.status === 'Disetujui' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {item.status}
                        </Badge>
                        {item.tanggalDisetujui && (
                          <span className="text-xs text-gray-500 mt-1">{formatDateTime(item.tanggalDisetujui)}</span>
                        )}
                      </div>
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