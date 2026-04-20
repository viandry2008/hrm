import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Interface data
interface RequestAbsenData {
  no: number;
  tanggal: Date;
  idKaryawan: string;
  divisi: string;
  jabatan: string;
  nama: string;
  absenMasuk: string;
  lokasiAbsen: string;
  detailLokasi: string;
  shift: string;
  catatan: string;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
}

// Mock Data
const mockRequestAbsen: RequestAbsenData[] = [
  {
    no: 1,
    tanggal: new Date("2024-06-20"),
    idKaryawan: "EMP003",
    nama: "Budi Santoso",
    divisi: "Finance",
    jabatan: "Staff",
    absenMasuk: "08:10",
    lokasiAbsen: "Kantor Pusat",
    detailLokasi: "-6.175392, 106.827153",
    shift: "Shift 1",
    catatan: "Terlambat karena kemacetan",
    status: "Menunggu Disetujui",
  },
  {
    no: 2,
    tanggal: new Date("2024-06-18"),
    idKaryawan: "EMP004",
    nama: "Siti Aminah",
    divisi: "IT",
    jabatan: "Programmer",
    absenMasuk: "08:00",
    lokasiAbsen: "Remote",
    detailLokasi: "-6.914744, 107.609810",
    shift: "Shift 1",
    catatan: "Hadir tepat waktu",
    status: "Disetujui",
    tanggalDisetujui: new Date('2024-06-01T09:30:00'),
  },
];

export const RequestAbsenPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data] = useState<RequestAbsenData[]>(mockRequestAbsen);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

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
  const getStatusBadge = (status: string) => {
    let badgeColor = "";
    if (status.includes("Menunggu")) {
      badgeColor = "bg-yellow-100 text-yellow-800";
    } else if (status.includes("Disetujui")) {
      badgeColor = "bg-green-100 text-green-800";
    } else if (status.includes("Ditolak")) {
      badgeColor = "bg-red-100 text-red-800";
    }
    return <Badge className={badgeColor}>{status}</Badge>;
  };

  const openMapModal = (location: string) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Request Absen</h1>
      

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Request Absen</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, atau jabatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
               <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Tanggal</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Absen Masuk</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Lokasi Absen</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Detail Lokasi</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Shift</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Catatan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                   <TableRow key={item.no} className="border">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggal)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.absenMasuk}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.lokasiAbsen}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.detailLokasi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.shift}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.catatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => openMapModal(item.detailLokasi)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                          <XCircle className="w-4 h-4" />
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
                {Math.max((currentPage - 1) * itemsPerPage + 1, 1)} sampai{' '}
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
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
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

      {/* Modal Google Maps */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Detail Lokasi Absen</h2>
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${selectedLocation}&z=15&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
