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
import { useDeleteEmployee, useDeleteMultipleEmployee, useGetEmployees, useGetEmployeeSummary, useUpdateMultipleContractEmployee, useUpdateMultipleStatusEmployee } from '@/api/employee/employee.query';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

// Komponen Label Status
const StatusLabel = ({ status }: { status: string }) => {
  const isAktif = status === 'Active';
  const textAktif = status === 'Active' ? 'Aktif' : 'Tidak Aktif';
  const color = isAktif ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  const Icon = isAktif ? CheckCircle : XCircle;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${color} whitespace-nowrap max-w-full truncate`}>
      <Icon className="w-3 h-3" />
      {textAktif}
    </span>
  );
};

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  // State modal perbarui kontrak
  const [isContractModalOpen, setContractModalOpen] = useState(false);
  const [contractType, setContractType] = useState("");
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [contractNotes, setContractNotes] = useState("");

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data, isLoading, refetch } = useGetEmployees({
    search: searchTerm,
    page: currentPage,
    limit: Number(showEntries),
  });

  const { data: dataSummary, isLoading: loadingSummary, refetch: refetchSummary } =
    useGetEmployeeSummary();

  const deleteSingle = useDeleteEmployee(() => refetch());

  const updateStatusMutation = useUpdateMultipleStatusEmployee(() => {
    setSelectedIds([]);
    setSelectAll(false);
    refetch();
  });

  const deleteMultiple = useDeleteMultipleEmployee(() => {
    setSelectedIds([]);
    setSelectAll(false);
    refetch();
  });

  const updateContractMutation = useUpdateMultipleContractEmployee(() => {
    setSelectedIds([]);
    setSelectAll(false);
    refetch();
  });

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const updateStatusAkun = (statusBaru: string) => {
    if (selectedIds.length === 0) return;

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Status karyawan terpilih akan diubah menjadi ${statusBaru}.`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({
          ids: selectedIds,
          status: statusBaru,
        });
      }
    });
  };

  const handleDeleteSingle = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data karyawan ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "#3b82f6",
      color: "#ffffff",
      customClass: {
        popup: "bg-blue-500 text-white",
        title: "text-white",
        confirmButton: "bg-white text-blue-500 hover:bg-blue-100",
        cancelButton: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      },
      iconColor: "#bfdbfe",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSingle.mutate(id);
      }
    });
  };

  const handleDeleteMultiple = () => {
    if (selectedIds.length === 0) return;

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data karyawan terpilih akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMultiple.mutate({ ids: selectedIds });
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

  const openContractModal = () => {
    if (selectedIds.length === 0) {
      Swal.fire("Peringatan", "Pilih minimal 1 karyawan.", "warning");
      return;
    }
    setContractModalOpen(true);
  };

  const closeContractModal = () => {
    setContractModalOpen(false);
    setContractType("");
    setContractStart("");
    setContractEnd("");
    setContractNotes("");
  };

  const submitUpdateContract = () => {
    if (!contractType || !contractStart || !contractEnd) {
      Swal.fire("Error", "Semua field wajib diisi.", "error");
      return;
    }

    updateContractMutation.mutate(
      {
        ids: selectedIds,
        contract_type: contractType,
        start_date: contractStart,
        end_date: contractEnd,
        notes: contractNotes,
      },
      {
        onSuccess: () => {
          Swal.fire("Berhasil", "Kontrak berhasil diperbarui!", "success");
          closeContractModal();
          setSelectedIds([]);
          setSelectAll(false);
        },
        onError: () => {
          Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui kontrak", "error");
        },
      }
    );
  };

  const handleViewDetail = (id: string) => {
    navigate(`/detail-karyawan/${id}`);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setSelectedFile(null);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Swal.fire({
        title: 'Error!',
        text: 'Silakan pilih file Excel terlebih dahulu.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
        background: '#3b82f6',
        color: '#ffffff',
        customClass: {
          popup: 'bg-blue-500 text-white',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Berhasil!',
      text: `File "${selectedFile.name}" berhasil diunggah.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
      },
    });

    closeUploadModal();
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
              {dataSummary?.data?.active ?? 0}
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
              {dataSummary?.data?.inactive ?? 0}
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
              onClick={() => updateStatusAkun('Active')}
            >
              <CheckCircle className="w-4 h-4" /> Aktifkan
            </Button>
            {/* Tombol Non Aktifkan */}
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusAkun('Inactive')}
            >
              <XCircle className="w-4 h-4" /> Non Aktifkan
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={openContractModal}
            >
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
                <Select value={showEntries} onValueChange={setShowEntries}>
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={openUploadModal}
              >
                <Upload className="w-4 h-4" />
                Unggah Data
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download Data
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  console.log("Tombol diklik!");
                  navigate('/tambah-karyawan');
                }}>
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

                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={15} className="text-center py-4">Memuat data...</TableCell>
                  </TableRow>
                )}

                {!isLoading && items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={15} className="text-center py-4">Tidak ada data</TableCell>
                  </TableRow>
                )}

                {items.map((k, idx) => (
                  <TableRow key={k.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(k.id)}
                        onChange={() => toggleSelect(k.id)}
                      />
                    </TableCell>

                    <TableCell className="border border-gray-200">{(currentPage - 1) * Number(showEntries) + idx + 1}</TableCell>
                    <TableCell className="border border-gray-200">
                      {/* <img
                        src={k.foto}
                        alt={k.nama}
                        className="rounded-full w-8 h-8 object-cover"
                      /> */}
                    </TableCell >
                    <TableCell className="border border-gray-200">{k.employee_code}</TableCell>
                    <TableCell className="border border-gray-200">{k.full_name}</TableCell>
                    <TableCell className="border border-gray-200">{k.department.department_name}</TableCell>
                    <TableCell className="border border-gray-200">{k.position.position_name}</TableCell>
                    <TableCell className="border border-gray-200">{formatTanggal(k.join_date)}</TableCell>
                    <TableCell className="border border-gray-200">{k.employee_type}</TableCell>
                    <TableCell className="border border-gray-200">
                      {formatTanggal(k.latest_contract.start_date)}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {formatTanggal(k.latest_contract.end_date)}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <StatusLabel status={k.employment_status} />
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <StatusLabel status={k.employment_status} />
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <ReminderLabel text={"Kontrak akan habis dalam 365 hari"} />
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 text-white"><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" className="bg-red-600 text-white" onClick={() => handleDeleteSingle(k.id)}>
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
              Menampilkan{" "}
              <strong>
                {items.length > 0
                  ? (pagination?.current_page - 1) * pagination?.per_page + 1
                  : 0}
              </strong>{" "}
              sampai{" "}
              <strong>
                {items.length > 0
                  ? (pagination?.current_page - 1) * pagination?.per_page +
                  items.length
                  : 0}
              </strong>{" "}
              dari <strong>{pagination?.total ?? 0}</strong> data
            </div>

            <div className="flex gap-2">
              <Button
                disabled={pagination?.current_page === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Sebelumnya
              </Button>

              {[...Array(pagination?.last_page || 1)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    pagination?.current_page === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={pagination?.current_page === pagination?.last_page}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Upload */}
      <Dialog.Root open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 focus:outline-none max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <Dialog.Title className="text-xl font-bold">Unggah Data Baru Karyawan</Dialog.Title>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                >
                  <Cross2Icon className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Bagian Unggah Excel */}
            <div className="mb-6 pt-2">
              <label className="font-medium text-sm text-gray-700 block mb-2">Unggah dokumen Excel</label>
              <div className="flex items-center gap-0">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="upload-excel"
                />
                <label
                  htmlFor="upload-excel"
                  className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
                >
                  Pilih File
                </label>
                <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                  {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
                </div>
              </div>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                Download Template disini
              </a>
            </div>

            {/* Panduan Pengisian */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Panduan pengisian data karyawan di excel</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Kolom <strong>Username</strong> harus diisi dengan 3–20 karakter tanpa spasi, hanya huruf, angka, titik (<code>.</code>) atau underscore (<code>_</code>), dan tidak boleh diawali dengan simbol.
                </li>
                <li>
                  Password akun karyawan yang baru ditambahkan akan menggunakan password otomatis dari sistem: <strong>“1234”</strong>.
                </li>
                <li>
                  Kolom <strong>Email</strong> harus diisi dengan format <code>nama@domain.com</code> tanpa spasi dan menggunakan domain yang valid.
                </li>
                <li>
                  Kolom <strong>Role</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Karyawan”, “Atasan”, “HRD”, “Direktur”, atau “Finance”.
                </li>
                <li>
                  Pengisian <strong>Tanggal</strong> harus berformat <strong>DD/MM/YYYY</strong>. Contoh: <code>25/05/2025</code>.
                </li>
                <li>
                  Kolom <strong>Jenis Kelamin</strong> hanya dapat diisi dengan “L” (Laki-laki) atau “P” (Perempuan).
                </li>
                <li>
                  Kolom <strong>Pendidikan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “SD”, “SMP”, “SMA”, “SMK”, “MA”, “D1”, “D2”, “D3”, “D4”, “S1”, “S2”, atau “S3”.
                </li>
                <li>
                  Kolom <strong>Agama</strong> hanya dapat diisi dengan salah satu dari pilihan berikut: “Islam”, “Kristen”, “Katolik”, “Hindu”, “Buddha”, “Konghucu”, atau “Atheis”. Pengisian di luar opsi ini akan dianggap tidak valid.
                </li>
                <li>
                  Sebelum mengisi kolom <strong>Divisi</strong>, <strong>Jabatan</strong>, <strong>Bagian</strong>, dan <strong>Lokasi Kerja</strong>, pastikan bahwa data tersebut sudah terdaftar dalam aplikasi yang digunakan serta penulisannya harus sama persis antara data yang tersedia di sistem dengan data yang diisi di Excel.
                </li>
                <li>
                  Kolom <strong>Kategori Karyawan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Magang”, “PKWT”, “PKWTT”, “KHL”, “Harian”, atau “Borongan”.
                </li>
                <li>
                  Kolom <strong>Status Marital</strong> hanya dapat diisi dengan salah satu pilihan berikut: “TK/0”, “TK/1”, “TK/2”, “TK/3”, “K/0”, “K/1”, “K/2”, atau “K/3”.
                </li>
                <li>
                  Kolom <strong>Nomor KTP, KK, NPWP, KPJ, JKN, SIM</strong>, dan <strong>STNK</strong> harus diisi sesuai format resmi yang berlaku.
                </li>
                <li>
                  Kolom <strong>Hubungan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Orang Tua (Ayah)”, “Orang Tua (Ibu)”, “Suami”, “Istri”, “Saudara Kandung”, “Saudara Sepupu”, “Teman”, atau “Lainnya”.
                </li>
              </ul>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

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
      {isContractModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">

            <h2 className="text-xl font-bold mb-2">Perbarui Kontrak</h2>

            {/* CONTRACT TYPE */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Jenis Kontrak</label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kontrak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKWT">PKWT</SelectItem>
                  <SelectItem value="PKWTT">PKWTT</SelectItem>
                  <SelectItem value="Internship">Magang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* START DATE */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Mulai</label>
              <Input
                type="date"
                value={contractStart}
                onChange={(e) => setContractStart(e.target.value)}
              />
            </div>

            {/* END DATE */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Berakhir</label>
              <Input
                type="date"
                value={contractEnd}
                onChange={(e) => setContractEnd(e.target.value)}
              />
            </div>

            {/* NOTES */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Catatan (opsional)</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                rows={3}
                placeholder="Tambahkan catatan jika diperlukan"
                value={contractNotes}
                onChange={(e) => setContractNotes(e.target.value)}
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeContractModal}>
                Batal
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={submitUpdateContract}
                disabled={updateContractMutation.isPending}
              >
                {updateContractMutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};