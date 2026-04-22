import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { StatCard, StatCardGrid } from '@/components/ui/stat-card';
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

      <StatCardGrid>
        <StatCard
          title="Menunggu Disetujui"
          value={data.filter(d => d.status === 'Menunggu Disetujui').length}
          subtitle="Pengajuan"
          icon={Clock}
          borderColor="yellow"
        />
        <StatCard
          title="Total Disetujui"
          value={data.filter(d => d.status === 'Disetujui').length}
          subtitle="Pengajuan"
          icon={CheckCircle}
          borderColor="green"
        />
        <StatCard
          title="Total Ditolak"
          value={data.filter(d => d.status === 'Disetujui').length}
          subtitle="Pengajuan"
          icon={XCircle}
          borderColor="red"
        />
        <StatCard
          title="Total Pengajuan"
          value={data.length}
          subtitle="Pengajuan"
          icon={FileText}
          borderColor="blue"
        />
      </StatCardGrid>

      <TableCard icon={FileText} title="Data Pengajuan Izin">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Cari ID, nama, divisi, jabatan..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => setItemsPerPage(Number(v))}
          onAddClick={() => { }}
          addButtonLabel="Ajukan Izin"
        />

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
                        onClick={() => console.log('Delete', item.idKaryawan)}
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
