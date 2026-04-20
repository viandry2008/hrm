import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface IzinData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  tanggal: Date;
  jamKeluar: string;
  jamKembali: string;
  keperluan: string;
  tanggalPengajuan: Date;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
}

const mockData: IzinData[] = [
  {
    no: 1,
    idKaryawan: 'EMP003',
    nama: 'Doni Hartono',
    divisi: 'Finance',
    jabatan: 'Akuntan',
    tanggal: new Date('2024-06-14'),
    jamKeluar: '13:00',
    jamKembali: '15:00',
    keperluan: 'Ke bank',
    tanggalPengajuan: new Date('2024-06-13T16:30:00'),
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    idKaryawan: 'EMP004',
    nama: 'Lisa Wahyuni',
    divisi: 'Marketing',
    jabatan: 'Marketing Lead',
    tanggal: new Date('2024-06-12'),
    jamKeluar: '10:00',
    jamKembali: '12:00',
    keperluan: 'Konsultasi ke dokter',
    tanggalPengajuan: new Date('2024-06-11T09:00:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-11T13:45:00')
  }
];

export const DataIzinPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<IzinData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keperluan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => date.toLocaleDateString('id-ID');
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Izin </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Menunggu Disetujui */}
        <Card className="bg-yellow-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Menunggu Disetujui
            </CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Menunggu Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan </p>
          </CardContent>
        </Card>

        {/* Disetujui */}
        <Card className="bg-green-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Disetujui
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Ditolak */}
        <Card className="bg-red-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Ditolak
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Ditolak').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Total Pengajuan */}
        <Card className="bg-blue-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Izin
            </CardTitle>
            <FileText className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.length}</div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
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
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, jabatan, keperluan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Izin
            </Button>
          </div>

          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
           <TableRow className="bg-brand text-white hover:bg-brand">
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">No</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jam Keluar</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jam Kembali</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Keperluan</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Pengajuan</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
              <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.no}>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.nama}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggal)}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.jamKeluar}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{item.jamKembali}</TableCell>
                <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.keperluan}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                <TableCell className="border border-gray-200 whitespace-nowrap">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                <TableCell className="border border-gray-200">
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
                  {Math.max((currentPage - 1) * itemsPerPage + 1, 1)} to{' '}
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
      <footer className="mt-10 text-xs text-left">
        © 2025 PT Proven Force Indonesia, All Rights Reserved.
      </footer>
    </div>
  );
};
