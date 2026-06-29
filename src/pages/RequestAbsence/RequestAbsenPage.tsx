import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table-pagination';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Clock, Eye } from 'lucide-react';
import { useGetAttendanceRequests } from '@/api/attendance/attendance.query';
import { AttendanceRequestItem } from '@/api/attendance/attendance.types';
import { TableCard } from "@/components/ui/table-card";

export const RequestAbsenPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRequestItem | null>(null);

  const { data: attendanceRequestsResp, isLoading } = useGetAttendanceRequests({
    search: searchTerm || undefined,
    page: currentPage,
    limit: itemsPerPage,
  });

  const apiItems = attendanceRequestsResp?.data || [];
  const meta = attendanceRequestsResp?.meta || {
    current_page: 1,
    per_page: itemsPerPage,
    total: 0,
    last_page: 1,
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatTime = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatLabel = (value?: string | null) => {
    if (!value) return '-';
    return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const getStatusBadge = (status?: string | null) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === 'approved') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 rounded-none">Approved</Badge>;
    }

    if (normalizedStatus === 'rejected') {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 rounded-none">Rejected</Badge>;
    }

    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 rounded-none">{formatLabel(status || 'pending')}</Badge>;
  };

  const hasCoordinates = Boolean(selectedRequest?.latitude && selectedRequest?.longitude);
  const mapsUrl = hasCoordinates
    ? `https://maps.google.com/maps?q=${selectedRequest?.latitude},${selectedRequest?.longitude}&z=16&output=embed`
    : '';
  const mapsLink = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${selectedRequest?.latitude},${selectedRequest?.longitude}`
    : '';

  const attendanceClockIn = (item: AttendanceRequestItem) => {
    const firstAttendance = item.attendances?.[0];
    return firstAttendance?.clock_in ?? formatTime(item.requested_clock_in_at);
  };

  return (
    <div className="p-6 space-y-6">
      <TableCard icon={Clock} title="Data Request Absen">

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
                <TableHead className="border text-white whitespace-nowrap">Cabang</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Tanggal Request</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Tipe Request</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Jam Masuk</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Lokasi</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Alasan</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Status</TableHead>
                <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={13} className="h-24 text-center text-gray-500">
                    Memuat data request absen...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && apiItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={13} className="h-24 text-center text-gray-500">
                    Data request absen tidak ditemukan
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && apiItems.map((it: AttendanceRequestItem, idx: number) => (
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
                    {it.branch?.name ?? '-'}
                  </TableCell>
                  <TableCell className="border-r">{formatDate(it.request_date)}</TableCell>
                  <TableCell className="border-r">{formatLabel(it.request_type)}</TableCell>
                  <TableCell className="border-r">{attendanceClockIn(it)}</TableCell>
                  <TableCell className="border-r">{it.location ?? '-'}</TableCell>
                  <TableCell className="border-r">{it.reason ?? '-'}</TableCell>
                  <TableCell className="border-r">{getStatusBadge(it.status)}</TableCell>
                  <TableCell className="border-r">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => setSelectedRequest(it)}
                      disabled={!it.latitude || !it.longitude}
                      title={it.latitude && it.longitude ? 'Lihat lokasi' : 'Koordinat tidak tersedia'}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Lihat lokasi</span>
                    </Button>
                  </TableCell>
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

      <Dialog open={Boolean(selectedRequest)} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Lokasi Request Absen</DialogTitle>
            <DialogDescription>
              {selectedRequest?.employee?.full_name ?? '-'} - {selectedRequest?.location ?? '-'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Tanggal Request</p>
                <p className="font-medium">{formatDate(selectedRequest?.request_date)}</p>
              </div>
              <div>
                <p className="text-gray-500">Koordinat</p>
                <p className="font-medium">
                  {hasCoordinates ? `${selectedRequest?.latitude}, ${selectedRequest?.longitude}` : '-'}
                </p>
              </div>
            </div>

            <div className="h-[420px] overflow-hidden rounded border border-gray-300 bg-gray-100">
              {hasCoordinates ? (
                <iframe
                  title="Peta lokasi request absen"
                  src={mapsUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Koordinat lokasi tidak tersedia
                </div>
              )}
            </div>

            {hasCoordinates && (
              <div className="flex justify-end">
                <Button asChild variant="outline">
                  <a href={mapsLink} target="_blank" rel="noreferrer">
                    Buka di Google Maps
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
