import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const TabRiwayatKontrakKerja = ({ data }: any) => {
  const formatDate = (date?: string | null) => {
    if (!date) return '-';
    const [year, month, day] = date.split('-');
    if (!year || !month || !day) return date;
    return `${day}/${month}/${year}`;
  };

  const getDuration = (startDate?: string | null, endDate?: string | null) => {
    if (!startDate || !endDate) return '-';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    if (diffDays >= 365) return `${Math.round(diffDays / 365)} Tahun`;
    if (diffDays >= 30) return `${Math.round(diffDays / 30)} Bulan`;
    return `${diffDays} Hari`;
  };

  // latest_contract id dipakai untuk menentukan status Aktif
  const latestContractId = data?.raw?.latest_contract?.id ?? null;

  const kontrakHistory = (data?.raw?.contracts ?? []).map((kontrak: any, index: number) => ({
    no: index + 1,
    nomorKontrak: kontrak.contract_number || '-',
    kategori: kontrak.category?.name || '-',
    tanggalKontrak: formatDate(kontrak.start_date),
    selesaiKontrak: formatDate(kontrak.end_date),
    durasi: getDuration(kontrak.start_date, kontrak.end_date),
    terakhirDiperbaharui: formatDate(kontrak.updated_at?.split('T')[0]),
    status: kontrak.id === latestContractId ? 'Aktif' : 'Selesai',
  }));

  const activeContract = kontrakHistory.find((k) => k.status === 'Aktif');

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nomor Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Kategori</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Selesai Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Durasi Kontrak</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Terakhir Diperbaharui</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kontrakHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Tidak ada data kontrak
                  </TableCell>
                </TableRow>
              ) : (
                kontrakHistory.map((kontrak) => (
                  <TableRow key={kontrak.no} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium border-r border-b border-gray-200">
                      {kontrak.no}
                    </TableCell>
                    <TableCell className="border-r border-b border-gray-200 text-xs max-w-[180px] truncate" title={kontrak.nomorKontrak}>
                      {kontrak.nomorKontrak}
                    </TableCell>
                    <TableCell className="border-r border-b border-gray-200">{kontrak.kategori}</TableCell>
                    <TableCell className="border-r border-b border-gray-200">{kontrak.tanggalKontrak}</TableCell>
                    <TableCell className="border-r border-b border-gray-200">{kontrak.selesaiKontrak}</TableCell>
                    <TableCell className="border-r border-b border-gray-200">{kontrak.durasi}</TableCell>
                    <TableCell className="border-r border-b border-gray-200">{kontrak.terakhirDiperbaharui}</TableCell>
                    <TableCell className="text-center border-b border-gray-200">
                      {kontrak.status === 'Aktif' ? (
                        <Badge className="bg-green-100 text-green-700 rounded-sm px-3 py-1 flex items-center gap-1.5 w-fit mx-auto font-medium hover:bg-green-100">
                          <Check className="w-3.5 h-3.5" />
                          {kontrak.status}
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-600 rounded-sm px-3 py-1 flex items-center gap-1.5 w-fit mx-auto font-medium hover:bg-red-100">
                          <X className="w-3.5 h-3.5" />
                          {kontrak.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Info */}
        {kontrakHistory.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#1E40AF] shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Total Riwayat Kontrak: {kontrakHistory.length} kali
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  {activeContract
                    ? `Kontrak aktif saat ini berlaku hingga ${activeContract.selesaiKontrak}`
                    : 'Tidak ada kontrak aktif saat ini'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TabRiwayatKontrakKerja;