import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table-pagination';
import { Input } from '@/components/ui/input';
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
import { Search, Clock } from 'lucide-react';
import { useGetShifts, useGetAttendances } from '@/api/attendance/attendance.query';
import { TableCard } from "@/components/ui/table-card";

export const DataKehadiranPage = () => {
    const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'); // format YYYY-MM-DD
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [shiftFilter, setShiftFilter] = useState<string>('all');

    const formatDateToInput = (dateString: string): string => {
        const [d, m, y] = dateString.split('/');
        return `${y}-${m}-${d}`;
    };

    const formatDateToDisplay = (dateString: string): string => {
        const [y, m, d] = dateString.split('-');
        return `${d}/${m}/${y}`;
    };

    const { data: shiftsResp } = useGetShifts({ page: 1, limit: 100 });
    const shifts = shiftsResp?.data || [];

    const shiftParam = shiftFilter === 'all'
        ? undefined
        : shiftFilter === 'non-shift'
            ? null
            : Number(shiftFilter);

    const { data: attendancesResp } = useGetAttendances({
        search: searchTerm || undefined,
        shift: shiftParam,
        start_date: startDate ? startDate.split('/').reverse().join('-') : undefined,
        end_date: endDate ? endDate.split('/').reverse().join('-') : undefined,
        page: currentPage,
        limit: itemsPerPage,
    });

    const apiItems = attendancesResp?.data || [];
    const meta = attendancesResp?.meta || {
        current_page: 1,
        per_page: itemsPerPage,
        total: 0,
        last_page: 1,
    };

    return (
        <div className="p-6 space-y-6">
            <TableCard icon={Clock} title="Data Kehadiran">

                {/* Filter Field */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-6">

                    {/* Filter Shift */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Filter berdasarkan Shift pekerja <span className="text-red-500">*</span>
                        </label>
                        <Select value={shiftFilter} onValueChange={(val) => { setShiftFilter(val); setCurrentPage(1); }}>
                            <SelectTrigger className="border border-gray-400 focus:border-blue-600">
                                <SelectValue placeholder="-- Semua Shift --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">-- Semua Shift --</SelectItem>
                                <SelectItem value="non-shift">Non Shift</SelectItem>
                                {shifts.map((s: any) => (
                                    <SelectItem key={s.id} value={String(s.id)}>
                                        {s.type} {s.to} ({s.start_time} - {s.end_time})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tanggal Mulai */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mulai dari tanggal</label>
                        <div className="relative">
                            <Input
                                type="text"
                                value={startDate}
                                readOnly
                                className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer"
                                onClick={() => document.getElementById('hidden-start-date')?.focus()}
                            />
                            <svg
                                onClick={() => document.getElementById('hidden-start-date')?.focus()}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                id="hidden-start-date"
                                type="date"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                defaultValue={formatDateToInput(startDate)}
                                onChange={(e) => { setStartDate(formatDateToDisplay(e.target.value)); setCurrentPage(1); }}
                            />
                        </div>
                    </div>

                    {/* Tanggal Selesai */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sampai dengan tanggal</label>
                        <div className="relative">
                            <Input
                                type="text"
                                value={endDate}
                                readOnly
                                className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer"
                                onClick={() => document.getElementById('hidden-end-date')?.focus()}
                            />
                            <svg
                                onClick={() => document.getElementById('hidden-end-date')?.focus()}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                id="hidden-end-date"
                                type="date"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                defaultValue={formatDateToInput(endDate)}
                                onChange={(e) => { setEndDate(formatDateToDisplay(e.target.value)); setCurrentPage(1); }}
                            />
                        </div>
                    </div>
                </div>

                {/* Search and Table Controls */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select value={itemsPerPage.toString()} onValueChange={(value) => { setItemsPerPage(Number(value)); setCurrentPage(1); }}>
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
                                placeholder="Cari ID, nama, divisi dan jabatan"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="pl-10 pr-4 py-2 border border-gray-400 hover:border-gray-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 rounded-md shadow-sm transition-colors"
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
                                <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Tanggal</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Shift</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Absen Masuk</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Lokasi Absen</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Detail Lokasi</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Catatan</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Absen Pulang</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Lokasi Absen</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Detail Lokasi</TableHead>
                                <TableHead className="border text-white whitespace-nowrap">Catatan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apiItems.map((it: any, idx: number) => (
                                <TableRow key={it.id ?? idx}>
                                    <TableCell className="border-r">
                                        {(meta.current_page - 1) * meta.per_page + idx + 1}
                                    </TableCell>
                                    <TableCell className="font-medium border-r">
                                        {it.employee?.employee_code ?? '-'}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {it.employee?.full_name ?? '-'}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {it.employee?.department?.name ?? '-'}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {it.employee?.position?.name ?? '-'}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {it.attendance_date
                                            ? new Date(it.attendance_date).toLocaleDateString('en-GB')
                                            : '-'}
                                    </TableCell>
                                    <TableCell className="border-r">{it.shift ? it.shift.type + '-' + it.shift.to : 'Non shift'}</TableCell>
                                    <TableCell className="border-r">{it.clock_in ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_in_location ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_in_location_detail ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.notes ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_out ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_out_location ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_out_location_detail ?? '-'}</TableCell>
                                    <TableCell className="border-r">{it.clock_out_notes ?? '-'}</TableCell>
                                </TableRow>
                            ))}
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
                    items={apiItems}
                />

            </TableCard>
        </div>
    );
};