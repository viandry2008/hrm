import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus, Eye, Trash2, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface LemburData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  tanggalLembur: Date;
  jamMulai: string;
  jamSelesai: string;
  alasan: string;
  status: "Menunggu Disetujui" | "Disetujui" | "Ditolak";
  tanggalPengajuan: Date;
  tanggalDisetujui?: Date;
}

const mockLembur: LemburData[] = [
  {
    no: 1,
    idKaryawan: "EMP003",
    nama: "Budi Santoso",
    divisi: "Finance",
    jabatan: "Staff",
    tanggalLembur: new Date("2024-06-20"),
    jamMulai: "18:00",
    jamSelesai: "21:00",
    alasan: "Laporan akhir bulan",
    tanggalPengajuan: new Date("2024-06-15T14:30:00"),
    status: "Menunggu Disetujui",
  },
  {
    no: 2,
    idKaryawan: "EMP004",
    nama: "Siti Aminah",
    divisi: "IT",
    jabatan: "Programmer",
    tanggalLembur: new Date("2024-06-18"),
    jamMulai: "19:00",
    jamSelesai: "22:00",
    alasan: "Maintenance sistem",
    tanggalPengajuan: new Date("2024-06-14T10:15:00"),
    status: "Disetujui",
    tanggalDisetujui: new Date("2024-06-01T09:30:00"),
  },
];

export const DataLemburPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<LemburData[]>(mockLembur);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // state untuk modal hapus
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LemburData | null>(null);

  const filteredData = data.filter((item) =>
    [item.idKaryawan, item.nama, item.divisi, item.jabatan]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => date.toLocaleDateString("id-ID");

  const formatDateTime = (date: Date) =>
    date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const confirmDelete = (item: LemburData) => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (selectedItem) {
      setData(data.filter((d) => d.no !== selectedItem.no));
      setSelectedItem(null);
      setOpenDeleteDialog(false);
    }
  };

  const getStatusBadge = (
    status: string,
    tanggalDisetujui?: Date
  ) => {
    const badgeColor =
      status === "Disetujui"
        ? "bg-green-100 text-green-800 hover:bg-green-100"
        : status === "Ditolak"
        ? "bg-red-100 text-red-800 hover:bg-red-100"
        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";

    return (
      <div className="flex flex-col items-start">
        <Badge className={badgeColor}>{status}</Badge>
        {status === "Disetujui" && tanggalDisetujui && (
          <span className="text-xs text-gray-500 mt-1">
            {formatDateTime(tanggalDisetujui)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* ... bagian card summary tetap sama ... */}

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* ... bagian filter/search tetap sama ... */}

          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">ID</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Nama</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Tanggal Lembur</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jam Mulai</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jam Selesai</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Alasan Lembur</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Tanggal Pengajuan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell className="text-left border whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{formatDate(item.tanggalLembur)}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jamMulai}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jamSelesai}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.alasan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">
                      {getStatusBadge(item.status, item.tanggalDisetujui)}
                    </TableCell>
                    <TableCell className="text-left border">
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
                          onClick={() => confirmDelete(item)}
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

          {/* ... bagian pagination tetap sama ... */}
        </CardContent>
      </Card>

      {/* Modal konfirmasi hapus */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin menghapus data{" "}
            <strong>{selectedItem?.nama}</strong>?
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Batal
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="mt-10 text-xs text-left">
        © 2025 PT Proven Force Indonesia, All Rights Reserved.
      </footer>
    </div>
  );
};
