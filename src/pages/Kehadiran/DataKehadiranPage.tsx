import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface KehadiranData {
    no: number;
    idKaryawan: string;
    nama: string;
    karyawan: string;
    divisi: string;
    jabatan: string;
    tanggal: string;
    absenMasuk: {
        jam: string;
        lokasi: string;
        detail: string;
        catatan: string;
    };
    absenPulang: {
        jam: string;
        lokasi: string;
        detail: string;
        catatan: string;
    };
}

const mockData: KehadiranData[] = [
    {
        no: 1,
        idKaryawan: 'EMP001',
        nama: 'Andi Saputra',
        karyawan: 'Tetap',
        divisi: 'IT',
        jabatan: 'Frontend Developer',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:30', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Terlambat' },
        absenPulang: { jam: '18:00', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: '-' },
    },
    {
        no: 2,
        idKaryawan: 'EMP002',
        nama: 'Budi Hartono',
        karyawan: 'Kontrak',
        divisi: 'Finance',
        jabatan: 'Accountant',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:10', lokasi: 'Remote', detail: 'Rumah, Bekasi', catatan: '' },
        absenPulang: { jam: '17:00', lokasi: 'Remote', detail: 'Rumah, Bekasi', catatan: '' },
    },
    {
        no: 3,
        idKaryawan: 'EMP003',
        nama: 'Citra Dewi',
        karyawan: 'Tetap',
        divisi: 'HRD',
        jabatan: 'Recruiter',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:00', lokasi: 'Kantor Cabang', detail: 'Jl. Gatot Subroto No.20', catatan: '' },
        absenPulang: { jam: '18:30', lokasi: 'Kantor Cabang', detail: 'Jl. Gatot Subroto No.20', catatan: 'Lembur' },
    },
    {
        no: 4,
        idKaryawan: 'EMP004',
        nama: 'Dian Permana',
        karyawan: 'Magang',
        divisi: 'IT',
        jabatan: 'Backend Intern',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:15', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: '' },
        absenPulang: { jam: '17:45', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: '' },
    },
    {
        no: 5,
        idKaryawan: 'EMP005',
        nama: 'Eka Lestari',
        karyawan: 'Tetap',
        divisi: 'Marketing',
        jabatan: 'Content Strategist',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:00', lokasi: 'Remote', detail: 'Jl. Cendana No.5', catatan: '' },
        absenPulang: { jam: '17:15', lokasi: 'Remote', detail: 'Jl. Cendana No.5', catatan: '' },
    },
    {
        no: 6,
        idKaryawan: 'EMP006',
        nama: 'Fajar Nugroho',
        karyawan: 'Tetap',
        divisi: 'IT',
        jabatan: 'DevOps Engineer',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '08:50', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: '' },
        absenPulang: { jam: '18:10', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Meeting' },
    },
    {
        no: 7,
        idKaryawan: 'EMP007',
        nama: 'Gita Sari',
        karyawan: 'Kontrak',
        divisi: 'Customer Service',
        jabatan: 'CS Online',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:05', lokasi: 'Remote', detail: 'Bandung', catatan: '' },
        absenPulang: { jam: '17:00', lokasi: 'Remote', detail: 'Bandung', catatan: '' },
    },
    {
        no: 8,
        idKaryawan: 'EMP008',
        nama: 'Hadi Santoso',
        karyawan: 'Tetap',
        divisi: 'Logistik',
        jabatan: 'Driver',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '08:00', lokasi: 'Gudang Utama', detail: 'Jl. Raya Cibubur', catatan: '' },
        absenPulang: { jam: '16:30', lokasi: 'Gudang Utama', detail: 'Jl. Raya Cibubur', catatan: '' },
    },
    {
        no: 9,
        idKaryawan: 'EMP009',
        nama: 'Irfan Maulana',
        karyawan: 'Magang',
        divisi: 'Design',
        jabatan: 'UI Intern',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '09:20', lokasi: 'Remote', detail: 'Tangerang', catatan: '' },
        absenPulang: { jam: '17:40', lokasi: 'Remote', detail: 'Tangerang', catatan: '' },
    },
    {
        no: 10,
        idKaryawan: 'EMP010',
        nama: 'Joko Widodo',
        karyawan: 'Tetap',
        divisi: 'Manajemen',
        jabatan: 'Direktur',
        tanggal: '08/09/2025',
        absenMasuk: { jam: '08:30', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: '' },
        absenPulang: { jam: '18:30', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Lembur & Rapat' },
    },
];

export const DataKehadiranPage = () => {
    const [startDate, setStartDate] = useState<string>('23/06/2025');
    const [endDate, setEndDate] = useState<string>('23/06/2025');

    const [searchTerm, setSearchTerm] = useState('');
    const [data] = useState<KehadiranData[]>(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const formatDateToInput = (dateString: string): string => {
        // Convert DD/MM/YYYY to YYYY-MM-DD for internal input
        const [d, m, y] = dateString.split('/');
        return `${y}-${m}-${d}`;
    };

    const formatDateToDisplay = (dateString: string): string => {
        // Convert YYYY-MM-DD to DD/MM/YYYY for display
        const [y, m, d] = dateString.split('-');
        return `${d}/${m}/${y}`;
    };

    const filteredData = data.filter((item) =>
        [item.idKaryawan, item.nama, item.divisi, item.jabatan, item.karyawan]
            .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Kehadiran Karyawan</h1>
            </div>

            <Card>
                <CardHeader className="bg-blue-50 border-b">
                    <CardTitle className="text-blue-800">Data Kehadiran</CardTitle>
                </CardHeader>
                <CardContent className="p-6">

                    {/* Filter Field */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-6">

                        {/* Filter Kategori Karyawan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Filter berdasarkan kategori pekerja <span className="text-red-500">*</span>
                            </label>
                            <Select>
                                <SelectTrigger className="border border-gray-400 focus:border-blue-600">
                                    <SelectValue placeholder="-- Semua Karyawan --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">-- Semua Karyawan --</SelectItem>
                                    <SelectItem value="tetap">Karyawan Tetap</SelectItem>
                                    <SelectItem value="kontrak">Karyawan Kontrak</SelectItem>
                                    <SelectItem value="magang">Magang</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tanggal Mulai */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mulai dari tanggal</label>
                            <div className="relative">
                                <Input
                                    id="start-date"
                                    type="text"
                                    value={startDate}
                                    readOnly
                                    className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer"
                                    onClick={() => document.getElementById('hidden-start-date')?.focus()}
                                />
                                <svg
                                    onClick={() => document.getElementById('hidden-start-date')?.focus()}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    id="hidden-start-date"
                                    type="date"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    defaultValue={formatDateToInput(startDate)}
                                    onChange={(e) => {
                                        setStartDate(formatDateToDisplay(e.target.value));
                                    }}
                                />
                            </div>
                        </div>

                        {/* Tanggal Selesai */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sampai dengan tanggal</label>
                            <div className="relative">
                                <Input
                                    id="end-date"
                                    type="text"
                                    value={endDate}
                                    readOnly
                                    className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer"
                                    onClick={() => document.getElementById('hidden-end-date')?.focus()}
                                />
                                <svg
                                    onClick={() => document.getElementById('hidden-end-date')?.focus()}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    id="hidden-end-date"
                                    type="date"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    defaultValue={formatDateToInput(endDate)}
                                    onChange={(e) => {
                                        setEndDate(formatDateToDisplay(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search and Table Controls */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Show</span>
                                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                    <SelectTrigger className="w-[80px] border border-gray-400 hover:border-gray-600 focus:border-blue-600 shadow-sm rounded-md">
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
                                    placeholder="Cari ID, nama, divisi, jabatan, atau status..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-400 hover:border-gray-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 rounded-md shadow-sm transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border rounded-lg">
                        <Table className="w-full border border-gray-300 border-collapse">
                            <TableHeader>
                                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                                    <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Karyawan</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Tanggal</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Jam Masuk</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Lokasi Absen</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Detail Lokasi</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Catatan</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Jam Pulang</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Lokasi Absen</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Detail Lokasi</TableHead>
                                    <TableHead className="border text-white whitespace-nowrap">Catatan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.map((item) => (
                                    <TableRow key={item.no}>
                                        <TableCell className="border-r">{item.no}</TableCell>
                                        <TableCell className="font-medium border-r">{item.idKaryawan}</TableCell>
                                        <TableCell className="border-r">{item.nama}</TableCell>
                                        <TableCell className="border-r">{item.karyawan}</TableCell>
                                        <TableCell className="border-r">{item.divisi}</TableCell>
                                        <TableCell className="border-r">{item.jabatan}</TableCell>
                                        <TableCell className="border-r">{item.tanggal}</TableCell>
                                        <TableCell className="border-r">{item.absenMasuk.jam}</TableCell>
                                        <TableCell className="border-r">{item.absenMasuk.lokasi}</TableCell>
                                        <TableCell className="border-r">{item.absenMasuk.detail}</TableCell>
                                        <TableCell className="border-r">{item.absenMasuk.catatan}</TableCell>
                                        <TableCell className="border-r">{item.absenPulang.jam}</TableCell>
                                        <TableCell className="border-r">{item.absenPulang.lokasi}</TableCell>
                                        <TableCell className="border-r">{item.absenPulang.detail}</TableCell>
                                        <TableCell className="border-r">{item.absenPulang.catatan}</TableCell>
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
        </div>
    );
};