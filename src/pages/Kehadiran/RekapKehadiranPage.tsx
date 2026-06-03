import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { Trash2, Download, Calendar } from 'lucide-react';
import { TableCard } from "@/components/ui/table-card";
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { RecapCreateModal } from '@/components/Kehadiran/RecapCreateModal';
import { useGetAttendanceRecaps, useDownloadAttendanceRecap, useDeleteAttendanceRecap } from '@/api/attendance/attendance.query';
import { AttendanceRecapItem } from '@/api/attendance/attendance.types';

interface RekapKehadiran {
    id: string;
    periode: string;
    jumlahKaryawan: number;
}

export const RekapKehadiranPage = () => {
    const [search, setSearch] = useState('');
    const [show, setShow] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const { data: recapsResp } = useGetAttendanceRecaps({
        page: currentPage,
        limit: parseInt(show),
    });

    const { mutate: downloadRecap, isPending: isDownloading } = useDownloadAttendanceRecap();
    const { mutate: deleteRecap, isPending: isDeleting } = useDeleteAttendanceRecap();

    const apiData = recapsResp?.data || [];
    const meta = recapsResp?.meta || { current_page: 1, per_page: parseInt(show), total: 0, last_page: 1 };

    const mappedData: RekapKehadiran[] = apiData.map((recap: AttendanceRecapItem) => {
        const startDate = new Date(recap.periode_absen.split(' - ')[0]).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const endDate = new Date(recap.periode_absen.split(' - ')[1]).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return {
            id: String(recap.id),
            periode: `${startDate} s/d ${endDate}`,
            jumlahKaryawan: recap.jumlah_karyawan,
        };
    });

    const handleDeleteSingle = (id: string) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data rekap ini akan dihapus permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRecap(Number(id));
            }
        });
    };

    const handleDownload = (id: string) => {
        downloadRecap(Number(id));
    };

    return (
        <div className="p-6 space-y-6">
            <RecapCreateModal open={modalOpen} onOpenChange={setModalOpen} />

            <TableCard icon={Calendar} title="Data Rekap Kehadiran">
                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari rekap kehadiran..."
                    showEntriesValue={show}
                    onShowEntriesChange={setShow}
                    onAddClick={() => setModalOpen(true)}
                    addButtonLabel="Rekap Kehadiran"
                />

                <div className="overflow-auto rounded border border-gray-300">
                    <Table className="w-full border border-gray-300 border-collapse">
                        <TableHeader>
                            <TableRow className="bg-brand text-white hover:bg-brand">
                                <TableHead className="text-white border border-gray-200">No</TableHead>
                                <TableHead className="text-white border border-gray-200">Periode Absen</TableHead>
                                <TableHead className="text-white border border-gray-200">Jumlah Karyawan</TableHead>
                                <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mappedData.length > 0 ? (
                                mappedData.map((r, idx) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="border border-gray-200">
                                            {(meta.current_page - 1) * meta.per_page + idx + 1}
                                        </TableCell>
                                        <TableCell className="border border-gray-200">{r.periode}</TableCell>
                                        <TableCell className="border border-gray-200">{r.jumlahKaryawan}</TableCell>
                                        <TableCell className="border border-gray-200 flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                                title="Download"
                                                disabled={isDownloading}
                                                onClick={() => handleDownload(r.id)}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                                title="Hapus"
                                                disabled={isDeleting}
                                                onClick={() => handleDeleteSingle(r.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="border border-gray-200 text-center py-4 text-gray-500">
                                        Tidak ada data rekap kehadiran
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    pagination={{
                        current_page: meta.current_page,
                        per_page: meta.per_page,
                        total: meta.total,
                        last_page: meta.last_page,
                    }}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    items={mappedData}
                />

            </TableCard>
        </div>
    );
};
