import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Eye,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Calendar,
  Trash,
} from 'lucide-react';

// Komponen Label Status
const StatusLabel = ({ status }: { status: string }) => {
  const isAktif = status === 'Aktif';
  const color = isAktif ? 'bg-green-700 text-white' : 'bg-red-700 text-white';
  const Icon = isAktif ? CheckCircle : XCircle;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${color} whitespace-nowrap max-w-full truncate`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

interface Karyawan {
  id: string;
  nama: string;
  divisi: string;
  jabatan: string;
  kategori: string;
  tanggalBergabung: string;
  tanggalKontrak: string;
  selesaiKontrak: string;
  statusKerja: string;
  statusAkun: string;
  pengingat: string;
  foto: string;
}

const mockData: Karyawan[] = [
  {
    id: 'K001',
    nama: 'Andi Prasetyo',
    divisi: 'IT',
    jabatan: 'Software Engineer',
    kategori: 'Full Time',
    tanggalBergabung: '2021-03-15',
    tanggalKontrak: '2021-03-15',
    selesaiKontrak: '2024-03-15',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 90 hari',
    foto: 'https://randomuser.me/api/portraits/men/19.jpg ',
  },
  {
    id: 'K001',
    nama: 'Andi Prasetyo',
    divisi: 'IT',
    jabatan: 'Software Engineer',
    kategori: 'Full Time',
    tanggalBergabung: '2021-03-15',
    tanggalKontrak: '2021-03-15',
    selesaiKontrak: '2024-03-15',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 90 hari',
    foto: 'https://randomuser.me/api/portraits/men/2.jpg ',
  },
  {
    id: 'K002',
    nama: 'Budi Santoso',
    divisi: 'HRD',
    jabatan: 'HR Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2019-07-20',
    tanggalKontrak: '2019-07-20',
    selesaiKontrak: '2024-07-20',
    statusKerja: 'Tidak Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/13.jpg ',
  },
  {
    id: 'K002',
    nama: 'Budi Santoso',
    divisi: 'HRD',
    jabatan: 'HR Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2019-07-20',
    tanggalKontrak: '2019-07-20',
    selesaiKontrak: '2024-07-20',
    statusKerja: 'Tidak Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/15.jpg ',
  },
  {
    id: 'K002',
    nama: 'Budi Santoso',
    divisi: 'HRD',
    jabatan: 'HR Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2019-07-20',
    tanggalKontrak: '2019-07-20',
    selesaiKontrak: '2024-07-20',
    statusKerja: 'Tidak Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/28.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/11.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/19.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/20.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/22.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/28.jpg ',
  },
  {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/35.jpg ',
  },
];

const formatTanggal = (tanggal: string): string => {
  const [year, month, day] = tanggal.split('-');
  return `${day}-${month}-${year}`;
};

const ReminderLabel = ({ text }: { text: string }) => {
  const isReminder = text?.toLowerCase().includes("kontrak akan habis");

  if (!text || text.trim() === '' || text === '-' || !isReminder) {
    return <span className="text-gray-400 text-sm whitespace-nowrap max-w-full truncate">{text}</span>;
  }

  return (
    <span className="inline-block bg-orange-300 text-black text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap max-w-full truncate">
      {text}
    </span>
  );
};


export const DataKaryawanPage = () => {
  const [data, setData] = useState<Karyawan[]>(mockData);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('10');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search
  const filteredData = data.filter((k) =>
    [k.id, k.nama, k.divisi, k.jabatan, k.statusKerja]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const entriesPerPage = parseInt(show);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset halaman dan selected saat show/search berubah
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setSelectAll(false);
  }, [show, search]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((k) => k.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const updateStatusAkun = (statusBaru: string) => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: `Apakah Anda yakin?`,
      text: `Karyawan terpilih akan ${statusBaru === 'Aktif' ? 'diaktifkan' : 'dinonaktifkan'}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Ya, ${statusBaru === 'Aktif' ? 'Aktifkan' : 'Non Aktifkan'}!`,
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
        setData((prevData) =>
          prevData.map((k) =>
            selectedIds.includes(k.id) ? { ...k, statusAkun: statusBaru } : k
          )
        );
        setSelectedIds([]);
        setSelectAll(false);
        Swal.fire({
          title: 'Berhasil!',
          text: `Karyawan berhasil ${statusBaru === 'Aktif' ? 'diaktifkan' : 'dinonaktifkan'}.`,
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

  const handleDeleteSingle = (id: string) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data karyawan ini akan dihapus permanen!',
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
        setData((prev) => prev.filter((k) => k.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        Swal.fire({
          title: 'Berhasil!',
          text: 'Karyawan berhasil dihapus.',
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

  const handleDeleteMultiple = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data karyawan terpilih akan dihapus permanen!',
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
        setData((prev) => prev.filter((k) => !selectedIds.includes(k.id)));
        setSelectedIds([]);
        setSelectAll(false);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Karyawan berhasil dihapus.',
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

  // State untuk modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Fungsi untuk membuka modal
  const openModal = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Karyawan</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Karyawan Aktif */}
        <Card className="bg-green-700 border-green-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Total Karyawan Aktif 
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(k => k.statusKerja === 'Aktif').length}
            </div>
            <p className="text-xs text-white">Karyawan</p>
          </CardContent>
        </Card>

        {/* Card Karyawan Tidak Aktif */}
        <Card className="bg-red-600 border-red-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Total Karyawan Tidak Aktif 
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(k => k.statusKerja === 'Tidak Aktif').length}
            </div>
            <p className="text-xs text-white">Karyawan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b mb-4">
          <CardTitle className="text-blue-800">Data Karyawan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {/* Tombol Aktifkan */}
            <Button
              className="bg-green-700 hover:bg-green-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusAkun('Aktif')}
            >
              <CheckCircle className="w-4 h-4" /> Aktifkan
            </Button>
            {/* Tombol Non Aktifkan */}
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusAkun('Tidak Aktif')}
            >
              <XCircle className="w-4 h-4" /> Non Aktifkan
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Perbarui Kontrak
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteMultiple}
            >
              <Trash className="w-4 h-4" /> Hapus karyawan terpilih
            </Button>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select value={show} onValueChange={setShow}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">entries</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, jabatan atau jenis"
                  className="pl-10 w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                + Tambah Karyawan
              </Button>
            </div>
          </div>
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-[#196de3] hover:bg-[#196de3] text-white">
                  <TableHead className="text-white border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">No</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Foto</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tgl Bergabung</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Kategori</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tgl Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Selesai Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status Kerja</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status Akun</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Pengingat Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((k, idx) => (
                  <TableRow key={`${k.id}-${idx}`}>
                    <TableCell className="border border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(k.id)}
                        onChange={() => toggleSelectRow(k.id)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <img
                        src={k.foto}
                        alt={k.nama}
                        className="rounded-full w-8 h-8 object-cover"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.id}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.nama}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.jabatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.tanggalBergabung)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.kategori}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.tanggalKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.selesaiKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.statusKerja}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap"> 
                      <StatusLabel status={k.statusAkun} />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap"><ReminderLabel text={k.pengingat} /></TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <div className="flex justify-start space-x-2">
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
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} to{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
              </strong>{' '}
              of <strong>{filteredData.length}</strong> data
            </div>
            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                Sebelumnya
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal untuk menampilkan lokasi */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Detail Lokasi Karyawan</h2>
            <div className="mb-4">
              {/* Google Maps */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.597898988999!2d${selectedLocation.split(",")[1]}!3d${selectedLocation.split(",")[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb902cfd15e7%3A0x7b2a993d9a2c1bb1!2sJakarta!5e0!3m2!1sid!2sid!4v1687470000000`}
                width="100%"
                height="400px"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};