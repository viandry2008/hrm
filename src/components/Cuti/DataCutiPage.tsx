import { useState, useEffect } from 'react';
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
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Interface Cuti
interface CutiData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  jenisCuti: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  alasan: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
  tanggalPengajuan: Date;
  periodeCuti: string;
  sisaCuti: number;
}

// Mock Data Cuti
const mockData: CutiData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    nama: 'Andi Saputra',
    divisi: 'IT',
    jabatan: 'Developer',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-07-01'),
    tanggalSelesai: new Date('2024-07-05'),
    alasan: 'Liburan bersama keluarga',
    status: 'Menunggu Disetujui',
    periodeCuti: '5 Hari',
    sisaCuti: 10,
    tanggalPengajuan: new Date('2024-06-15T10:12:00')
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    nama: 'Rina Maulida',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jenisCuti: 'Cuti Melahirkan',
    tanggalMulai: new Date('2024-06-10'),
    tanggalSelesai: new Date('2024-09-10'),
    alasan: 'Kelahiran anak pertama',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-01T09:30:00'),
    periodeCuti: '90 Hari',
    sisaCuti: 0,
    tanggalPengajuan: new Date('2024-05-25T08:45:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP003',
    nama: 'Budi Santoso',
    divisi: 'Keuangan',
    jabatan: 'Accountant',
    jenisCuti: 'Cuti Sakit',
    tanggalMulai: new Date('2024-08-01'),
    tanggalSelesai: new Date('2024-08-05'),
    alasan: 'Sakit perut',
    status: 'Menunggu Disetujui',
    periodeCuti: '5 Hari',
    sisaCuti: 8,
    tanggalPengajuan: new Date('2024-07-28T14:20:00')
  },
  {
    no: 4,
    idKaryawan: 'EMP004',
    nama: 'Siti Nurfadilah',
    divisi: 'Marketing',
    jabatan: 'Marketing Staff',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-09-01'),
    tanggalSelesai: new Date('2024-09-03'),
    alasan: 'Pernikahan saudara',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-08-25T10:00:00'),
    periodeCuti: '3 Hari',
    sisaCuti: 5,
    tanggalPengajuan: new Date('2024-08-20T09:15:00')
  },
  {
    no: 5,
    idKaryawan: 'EMP005',
    nama: 'Joko Susilo',
    divisi: 'IT',
    jabatan: 'Frontend Developer',
    jenisCuti: 'Cuti Darurat',
    tanggalMulai: new Date('2024-08-10'),
    tanggalSelesai: new Date('2024-08-12'),
    alasan: 'Keluarga sakit',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-08-05T16:00:00'),
    periodeCuti: '2 Hari',
    sisaCuti: 3,
    tanggalPengajuan: new Date('2024-08-05T16:00:00')
  },
  {
    no: 6,
    idKaryawan: 'EMP006',
    nama: 'Ani Lestari',
    divisi: 'HR',
    jabatan: 'Recruitment',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-07-20'),
    tanggalSelesai: new Date('2024-07-25'),
    alasan: 'Liburan ke Bali',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-07-15T11:00:00'),
    periodeCuti: '5 Hari',
    sisaCuti: 2,
    tanggalPengajuan: new Date('2024-07-10T08:30:00')
  },
  {
    no: 7,
    idKaryawan: 'EMP007',
    nama: 'Heri Kurniawan',
    divisi: 'Keuangan',
    jabatan: 'Staff Keuangan',
    jenisCuti: 'Cuti Pribadi',
    tanggalMulai: new Date('2024-07-15'),
    tanggalSelesai: new Date('2024-07-18'),
    alasan: 'Pindah rumah',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-07-10T10:45:00'),
    periodeCuti: '4 Hari',
    sisaCuti: 1,
    tanggalPengajuan: new Date('2024-07-10T10:45:00')
  },
  {
    no: 8,
    idKaryawan: 'EMP008',
    nama: 'Lina Suryadi',
    divisi: 'Marketing',
    jabatan: 'Marketing Supervisor',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-06-15'),
    tanggalSelesai: new Date('2024-06-20'),
    alasan: 'Liburan ke luar negeri',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-06-05T13:00:00'),
    periodeCuti: '6 Hari',
    sisaCuti: 0,
    tanggalPengajuan: new Date('2024-06-05T13:00:00')
  }
];

// Fungsi Format Tanggal dan Waktu
const formatDateTime = (date: Date) => {
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Komponen Badge Status
const getStatusBadge = (item: CutiData) => {
  if (item.status === 'Disetujui') {
    return (
      <div className="flex flex-col">
        <Badge
          className="inline-block bg-green-600 text-white hover:bg-green-600 hover:text-white transition-none py-1 px-2 rounded font-medium max-w-fit"
          style={{ display: 'inline-block', maxWidth: 'max-content' }}
        >
          Disetujui oleh Rommy Gani
        </Badge>
        <span className="text-xs text-gray-500 mt-1">
          {formatDateTime(item.tanggalDisetujui!)}
        </span>
      </div>
    );
  } else if (item.status === 'Ditolak') {
    return (
      <div className="flex flex-col">
        <Badge
          className="inline-block bg-red-600 text-white hover:bg-red-600 hover:text-white transition-none py-1 px-2 rounded font-medium max-w-fit"
          style={{ display: 'inline-block', maxWidth: 'max-content' }}
        >
          Ditolak oleh Rommy Gani
        </Badge>
        <span className="text-xs text-black mt-1">
          <strong className="font-bold">Catatan</strong>: Terlalu banyak cuti
        </span>
        <span className="text-xs text-gray-500 mt-1">
          {formatDateTime(item.tanggalDitolak!)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Badge
        className="inline-block bg-yellow-300 text-black hover:bg-yellow-300 hover:text-black transition-none py-1 px-2 rounded max-w-fit"
        style={{ display: 'inline-block', maxWidth: 'max-content' }}
      >
        Menunggu Disetujui
      </Badge>
    </div>
  );
};

// Halaman Utama
export const DataCutiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<CutiData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form modal
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [totalPengajuan, setTotalPengajuan] = useState(0);

  // Simulasi data karyawan yang login
  const employeeData = {
    idKaryawan: 'PFI-0035',
    nama: 'Nina Nuratri',
    divisi: 'MPO',
    jabatan: 'Koordinator Lapangan',
    sisaCuti: 12,
  };

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisCuti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID');
  };

  const handleDeleteSingle = (id: string) => {
    console.log('Hapus data dengan ID:', id);
  };

  // Hitung jumlah hari cuti (termasuk hari terakhir)
  useEffect(() => {
    if (tanggalMulai && tanggalSelesai) {
      const start = new Date(tanggalMulai);
      const end = new Date(tanggalSelesai);
      if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 karena termasuk hari terakhir
        setTotalPengajuan(diffDays);
      } else {
        setTotalPengajuan(0);
      }
    } else {
      setTotalPengajuan(0);
    }
  }, [tanggalMulai, tanggalSelesai]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPengajuan === 0) {
      alert('Tanggal tidak valid atau belum diisi.');
      return;
    }
    if (totalPengajuan > employeeData.sisaCuti) {
      alert('Jumlah hari cuti melebihi sisa cuti yang tersedia.');
      return;
    }
    console.log('Pengajuan cuti berhasil dikirim:', {
      idKaryawan: employeeData.idKaryawan,
      nama: employeeData.nama,
      tanggalMulai,
      tanggalSelesai,
      totalHari: totalPengajuan,
    });
    setIsModalOpen(false);
    // Reset form
    setTanggalMulai('');
    setTanggalSelesai('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Cuti</h1>
      </div>

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
          value={data.filter(d => d.status === 'Ditolak').length}
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

      <TableCard icon={FileText} title="Data Pengajuan Cuti">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Cari ID, nama, divisi, jabatan..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => setItemsPerPage(Number(v))}
          onAddClick={() => setIsModalOpen(true)}
          addButtonLabel="Ajukan Cuti"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                <TableHead className="border text-white whitespace-nowrap">ID</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Nama</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Kategori</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Mulai Tanggal</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Sampai Tanggal</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Periode Cuti</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Alasan</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Sisa Cuti</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Tanggal Pengajuan</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Diketahui Oleh</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.no} className="border">
                  <TableCell className="border whitespace-nowrap">{item.no}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.idKaryawan}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.nama}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.divisi}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.jabatan}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.jenisCuti}</TableCell>
                  <TableCell className="border whitespace-nowrap">{formatDate(item.tanggalMulai)}</TableCell>
                  <TableCell className="border whitespace-nowrap">{formatDate(item.tanggalSelesai)}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.periodeCuti}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.alasan}</TableCell>
                  <TableCell className="border whitespace-nowrap">{item.sisaCuti}</TableCell>
                  <TableCell className="border whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                  <TableCell className="border whitespace-nowrap">{getStatusBadge(item)}</TableCell>
                  <TableCell className="border whitespace-nowrap">
                    {item.status === 'Menunggu Disetujui' ? (
                      <span className="text-sm text-gray-400">-</span>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">HRD Personalia</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {formatDateTime(item.tanggalDisetujui || item.tanggalDitolak)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border whitespace-nowrap">
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
                        onClick={() => handleDeleteSingle(item.idKaryawan)}
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

      {/* Modal dengan Framer Motion */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ scale: 0.9, y: 30, filter: "blur(4px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.9, y: 30, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Buat Cuti</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Row 1: ID & Nama Karyawan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Karyawan *
                    </label>
                    <Input value={employeeData.idKaryawan} readOnly className="bg-gray-100 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Karyawan *
                    </label>
                    <Input value={employeeData.nama} readOnly className="bg-gray-100 cursor-not-allowed" />
                  </div>
                </div>

                {/* Row 2: Divisi & Jabatan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Divisi *
                    </label>
                    <Input value={employeeData.divisi} readOnly className="bg-gray-100 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jabatan *
                    </label>
                    <Input value={employeeData.jabatan} readOnly className="bg-gray-100 cursor-not-allowed" />
                  </div>
                </div>

                {/* Sisa Cuti */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sisa cuti tahun ini *
                  </label>
                  <Input value={employeeData.sisaCuti} readOnly className="bg-gray-100 cursor-not-allowed" />
                </div>

                {/* Tipe Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Kategori *
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Pilih Tipe Kategori --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tahunan">Cuti Tahunan</SelectItem>
                      <SelectItem value="sakit">Cuti Sakit</SelectItem>
                      <SelectItem value="melahirkan">Cuti Melahirkan</SelectItem>
                      <SelectItem value="darurat">Cuti Darurat</SelectItem>
                      <SelectItem value="pribadi">Cuti Pribadi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Keterangan Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keterangan Kategori *
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Pilih keterangan kategori --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liburan">Liburan</SelectItem>
                      <SelectItem value="keluarga">Masalah Keluarga</SelectItem>
                      <SelectItem value="kesehatan">Kesehatan</SelectItem>
                      <SelectItem value="pernikahan">Pernikahan</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mulai & Sampai Tanggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mulai Tanggal *
                    </label>
                    <Input
                      type="date"
                      value={tanggalMulai}
                      onChange={(e) => setTanggalMulai(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sampai Tanggal *
                    </label>
                    <Input
                      type="date"
                      value={tanggalSelesai}
                      onChange={(e) => setTanggalSelesai(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Alasan Cuti */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alasan Cuti *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tulis alasan cuti Anda..."
                    required
                  ></textarea>
                </div>

                {/* Total Pengajuan (Auto Hitung) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Pengajuan *
                  </label>
                  <Input
                    type="number"
                    value={totalPengajuan}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed font-semibold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Jumlah hari cuti akan dihitung otomatis (termasuk hari terakhir).
                  </p>
                </div>

                {/* Tanda Tangan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanda Tangan
                  </label>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 mb-1">
                    Tanda Tangani
                  </Button>
                  <p className="text-sm text-gray-600 mt-1">{employeeData.nama}</p>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-10 text-xs text-left text-gray-600">
        © 2025 PT Proven Force Indonesia, All Rights Reserved.
      </footer>
    </div>
  );
};