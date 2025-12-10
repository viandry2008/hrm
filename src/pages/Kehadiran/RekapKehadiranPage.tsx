import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Swal from 'sweetalert2';
import { Trash2, Download } from 'lucide-react';

interface RekapKehadiran {
    id: string;
    periode: string;
    jumlahKaryawan: number;
}

const mockRekapData: RekapKehadiran[] = [
    { id: 'R001', periode: '01-06-2025 s/d 30-06-2025', jumlahKaryawan: 16 },
    { id: 'R002', periode: '01-06-2025 s/d 30-06-2025', jumlahKaryawan: 10 },
    { id: 'R003', periode: '01-06-2025 s/d 30-06-2025', jumlahKaryawan: 7 },
];

export const RekapKehadiranPage = () => {
    const [data, setData] = useState<RekapKehadiran[]>(mockRekapData);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter((r) =>
        r.periode.toLowerCase().includes(search.toLowerCase())
    );

    const entriesPerPage = parseInt(show);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [show, search]);

    const handleDeleteSingle = (id: string) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data rekap ini akan dihapus permanen!',
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
                setData((prev) => prev.filter((r) => r.id !== id));
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Rekap berhasil dihapus.',
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

    const handleDownload = (periode: string) => {
        alert(`Mengunduh rekap untuk periode: ${periode}`);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Kehadiran Karyawan</h1>
            </div>
            <Card>
                <CardHeader className="bg-blue-50 border-b mb-4">
                    <CardTitle className="text-blue-800">Data Rekap Kehadiran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        {/* Kiri: Show entries */}
                        <div className="flex items-center gap-4">
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
                        <div className="flex items-center gap-4">
                            <Input
                                placeholder="Cari Periode"
                                className="w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                + Rekap Kehadiran
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-auto rounded border border-gray-300">
                        <Table className="w-full border-collapse">
                            <TableHeader>
                                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                                    <TableHead className="text-white border border-gray-200">No</TableHead>
                                    <TableHead className="text-white border border-gray-200">Periode Absen</TableHead>
                                    <TableHead className="text-white border border-gray-200">Jumlah Karyawan</TableHead>
                                    <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.map((r, idx) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="border border-gray-200">
                                            {(currentPage - 1) * entriesPerPage + idx + 1}
                                        </TableCell>
                                        <TableCell className="border border-gray-200">{r.periode}</TableCell>
                                        <TableCell className="border border-gray-200">{r.jumlahKaryawan}</TableCell>
                                        <TableCell className="border border-gray-200 flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="bg-green-600 text-white hover:bg-green-700"
                                                title="Download"
                                                onClick={() => handleDownload(r.periode)}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="bg-red-600 text-white hover:bg-red-700"
                                                title="Hapus"
                                                onClick={() => handleDeleteSingle(r.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
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
        </div>
    );
};
