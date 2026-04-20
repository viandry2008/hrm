import { useState } from "react";
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Paperclip, Clock, CheckCircle, XCircle, FileText, Send } from "lucide-react";

interface KontrakKerjaData {
  no: number;
  nomorSurat: string;
  nama: string;
  idKaryawan: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  dibuatTanggal: Date;
  dibuatOleh: string;
  status: "Menunggu Disetujui" | "Disetujui" | "Telah Ditandatangani" | "Ditolak"
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
  tanggalTelahDitandatangani?: Date;
  tanggalStatus?: Date;
  tipeKontrak?: "Kontrak Baru" | "Renewal Kontrak";
}

const mockKontrak: KontrakKerjaData[] = [
  {
    no: 1,
    nomorSurat: "SK-001/HRD/2024",
    nama: "Budi Santoso",
    idKaryawan: "EMP001",
    tanggalMulai: new Date("2024-07-01"),
    tanggalSelesai: new Date("2025-06-30"),
    dibuatTanggal: new Date("2024-06-15T09:00:00"),
    dibuatOleh: "Admin HR",
    status: "Disetujui",
    tanggalDisetujui: new Date('2024-06-01T09:30:00'),
    tanggalStatus: new Date('2024-06-01T09:30:00'),
  },
  {
    no: 2,
    nomorSurat: "SK-002/HRD/2024",
    nama: "Siti Aminah",
    idKaryawan: "EMP002",
    tanggalMulai: new Date("2024-07-15"),
    tanggalSelesai: new Date("2025-07-14"),
    dibuatTanggal: new Date("2024-06-25T10:30:00"),
    dibuatOleh: "Admin HR",
    status: "Menunggu Disetujui",
    tipeKontrak: "Renewal Kontrak",
  },
  {
    no: 3,
    nomorSurat: "SK-003/HRD/2024",
    nama: "Andi Prasetyo",
    idKaryawan: "EMP003",
    tanggalMulai: new Date("2024-08-01"),
    tanggalSelesai: new Date("2025-07-31"),
    dibuatTanggal: new Date("2024-07-10T14:00:00"),
    dibuatOleh: "Admin HR",
    status: "Ditolak",
    tanggalDitolak: new Date('2024-07-12T11:00:00'),
    tanggalStatus: new Date('2024-07-12T11:00:00'),
  },
  {
    no: 4,
    nomorSurat: "SK-004/HRD/2024",
    nama: "Dewi Lestari",
    idKaryawan: "EMP004",
    tanggalMulai: new Date("2024-09-01"),
    tanggalSelesai: new Date("2025-08-31"),
    dibuatTanggal: new Date("2024-08-15T16:00:00"),
    dibuatOleh: "Admin HR",
    status: "Telah Ditandatangani",
    tanggalTelahDitandatangani: new Date('2024-08-20T10:00:00'),
    tanggalStatus: new Date('2024-08-20T10:00:00'),
  },
];

export const KontrakKerjaPage = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<KontrakKerjaData[]>(mockKontrak);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(10);

  const filteredData = data.filter((item) =>
    [item.nomorSurat, item.nama, item.idKaryawan]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / show);
  const startIndex = (currentPage - 1) * show;
  const paginatedData = filteredData.slice(startIndex, startIndex + show);

  // Fungsi untuk menghitung durasi kontrak dalam format "X Bulan"
  const calculateDuration = (startDate: Date, endDate: Date): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Hitung selisih tahun dan bulan
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    // Jika tanggal akhir lebih kecil dari tanggal mulai, kurangi 1 bulan
    if (end.getDate() < start.getDate()) {
      months--;
    }
    
    // Hitung total bulan
    const totalMonths = years * 12 + months;
    
    if (totalMonths <= 0) {
      return "0 Bulan";
    }
    
    return `${totalMonths} Bulan`;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatDateTime = (date: Date) =>
    date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDeleteSingle = (id: number) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data Kontrak Kerja ini akan dihapus permanen',
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
        setData((prev) => prev.filter((item) => item.no !== id));
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kontrak Kerja berhasil dihapus.',
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

  const handleSend = (id: number) => {
    const itemToSend = data.find(item => item.no === id);
    if (!itemToSend) return;

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Kontrak Kerja untuk ${itemToSend.nama} akan dikirim ke Karyawan untuk ditandatangani!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim!',
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
        console.log(`Kontrak dengan ID/No ${id} dikirim.`);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kontrak Kerja berhasil dikirim.',
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Kontrak Kerja Karyawan</h1>
      </div>

      {/* Grid Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <p className="text-xs text-white">Pengajuan</p>
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

        {/* Telah Ditandatangani */}
        <Card className="bg-blue-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Telah Ditandatangani
            </CardTitle>
            <FileText className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Telah Ditandatangani').length}
            </div>
            <p className="text-xs text-white">Kontrak</p>
          </CardContent>
        </Card>

        {/* Total Kontrak */}
        <Card className="bg-blue-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Kontrak Kerja
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
          <CardTitle className="text-blue-800">Data Kontrak Kerja</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div className="flex gap-4 items-center">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select value={show.toString()} onValueChange={(v) => {setShow(Number(v)); setCurrentPage(1);}}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama, ID, atau surat..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
                />
              </div>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" /> Buat Kontrak
            </Button>
          </div>
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                   <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Nomor Surat</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Tanggal Mulai Kontrak</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Tanggal Selesai Kontrak</TableHead>
                   {/* Kolom baru */}
                   <TableHead className="border text-white whitespace-nowrap">Durasi Kontrak</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Tipe Kontrak</TableHead>
                   {/* --- */}
                   <TableHead className="border text-white whitespace-nowrap">Dibuat Tanggal</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Dibuat Oleh</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                   <TableRow key={item.no} className="border-b hover:bg-gray-50">
                      <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{item.nomorSurat}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{item.nama}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalMulai)}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggalSelesai)}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">
                        {calculateDuration(item.tanggalMulai, item.tanggalSelesai)}
                      </TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">
                        Kontrak Baru
                      </TableCell>
                      {/* --- */}
                      <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.dibuatTanggal)}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">{item.dibuatOleh}</TableCell>
                      <TableCell className="border border-gray-200 whitespace-nowrap">
                        <div className="flex flex-col items-start">
                          <Badge
                            className={
                              item.status === "Disetujui"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : item.status === "Menunggu Disetujui"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : item.status === "Ditolak"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            }
                          >
                            {item.status}
                          </Badge>
                          {item.tanggalStatus && (
                            <span className="text-xs text-gray-500 mt-1">
                              {formatDateTime(item.tanggalStatus)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="border">
                        <div className="flex space-x-2">
                          {/* Tombol View */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          {/* Logika Tombol Send dan Delete */}
                          {(() => {
                            // Jika status "Menunggu Disetujui", tampilkan tombol Delete
                            if (item.status === "Menunggu Disetujui") {
                              return (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  title="Hapus Data"
                                  onClick={() => handleDeleteSingle(item.no)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              );
                            }
                            // Jika status "Ditolak", tidak tampilkan tombol tambahan
                            if (item.status === "Ditolak") {
                              return null;
                            }
                            // Jika status "Telah Ditandatangani", hanya tampilkan tombol Delete
                            if (item.status === "Telah Ditandatangani") {
                              return (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  title="Hapus Data"
                                  onClick={() => handleDeleteSingle(item.no)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              );
                            }
                            // Untuk status "Disetujui", tampilkan Send dan Delete
                            if (item.status === "Disetujui") {
                              return (
                                <>
                                  {/* Tombol Send dengan warna Pink */}
                                  <Button
                                    size="sm"
                                    className="bg-pink-600 text-white hover:bg-pink-700"
                                    title="Kirim ke Karyawan"
                                    onClick={() => handleSend(item.no)}
                                  >
                                    <Send className="w-4 h-4 text-white" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="bg-red-600 text-white hover:bg-red-700"
                                    title="Hapus Data"
                                    onClick={() => handleDeleteSingle(item.no)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              );
                            }
                            // Default
                            return null;
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-4"> {/* Perbarui colspan */}
                      Tidak ada data kontrak yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * show + 1, 1)} sampai{' '}
                {Math.min(currentPage * show, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong> data
            </div>

            {/* Navigasi pagination */}
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
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
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
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
          {/* AKHIR PAGINATION */}
        </CardContent>
      </Card>
    </div>
  );
};