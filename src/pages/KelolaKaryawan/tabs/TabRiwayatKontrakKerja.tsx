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
  // Dummy data riwayat kontrak
  const kontrakHistory = [
    {
      no: 1,
      tanggalKontrak: '15/03/2021',
      selesaiKontrak: '15/03/2022',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '15/03/2021',
      status: 'Selesai',
    },
    {
      no: 2,
      tanggalKontrak: '15/03/2022',
      selesaiKontrak: '15/03/2023',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '10/03/2022',
      status: 'Selesai',
    },
    {
      no: 3,
      tanggalKontrak: '15/03/2023',
      selesaiKontrak: '15/03/2024',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '08/03/2023',
      status: 'Selesai',
    },
    {
      no: 4,
      tanggalKontrak: '15/03/2024',
      selesaiKontrak: '15/03/2027',
      durasi: '3 Tahun',
      terakhirDiperbaharui: '10/03/2024',
      status: 'Aktif',
    },
  ];

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  No.
                </TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  Tanggal Kontrak Kerja
                </TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  Selesai Kontrak Kerja
                </TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  Durasi Kontrak
                </TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  Terakhir Diperbaharui
                </TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kontrakHistory.map((kontrak, index) => (
                <TableRow
                  key={kontrak.no}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center font-medium border-r border-gray-200 border-b border-gray-200">
                    {kontrak.no}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 border-b border-gray-200">{kontrak.tanggalKontrak}</TableCell>
                  <TableCell className="border-r border-gray-200 border-b border-gray-200">{kontrak.selesaiKontrak}</TableCell>
                  <TableCell className="border-r border-gray-200 border-b border-gray-200">{kontrak.durasi}</TableCell>
                  <TableCell className="border-r border-gray-200 border-b border-gray-200">{kontrak.terakhirDiperbaharui}</TableCell>
                  <TableCell className="text-center border-b border-gray-200">
                    {kontrak.status === 'Aktif' ? (
                      <Badge
                        className="bg-green-100 text-green-700 rounded-sm px-3 py-1 flex items-center gap-1.5 w-fit mx-auto font-medium hover:bg-green-100"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {kontrak.status}
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-red-100 text-red-600 rounded-sm px-3 py-1 flex items-center gap-1.5 w-fit mx-auto font-medium hover:bg-red-100"
                      >
                        <X className="w-3.5 h-3.5" />
                        {kontrak.status}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#1E40AF] shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Total Riwayat Kontrak: {kontrakHistory.length} kali
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Kontrak aktif saat ini berlaku hingga {kontrakHistory.find(k => k.status === 'Aktif')?.selesaiKontrak}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabRiwayatKontrakKerja;