import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  CalendarDays,
  Check,
} from 'lucide-react';

const TabRiwayatPinjaman = ({ data }: any) => {
  // Dummy data pinjaman
  const pinjamanData = [
    {
      no: 1,
      noPinjaman: 'PJN-2024-001234',
      totalPinjaman: 10000000,
      tanggalPengajuan: 'Senin, 12 Desember 2026, 10:43',
      durasiPinjaman: '12 Bulan',
      biayaCicilan: 1000000,
      terminBerjalan: 4,
      totalTermin: 12,
      status: 'Belum Lunas',
    },
    {
      no: 2,
      noPinjaman: 'PJN-2024-001235',
      totalPinjaman: 5000000,
      tanggalPengajuan: 'Rabu, 15 Januari 2026, 13:20',
      durasiPinjaman: '6 Bulan',
      biayaCicilan: 900000,
      terminBerjalan: 6,
      totalTermin: 6,
      status: 'Lunas',
    },
    {
      no: 3,
      noPinjaman: 'PJN-2024-001236',
      totalPinjaman: 15000000,
      tanggalPengajuan: 'Jumat, 20 Februari 2026, 09:15',
      durasiPinjaman: '10 Bulan',
      biayaCicilan: 1650000,
      terminBerjalan: 3,
      totalTermin: 10,
      status: 'Belum Lunas',
    },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full border-gray-200 bg-white p-5 shadow-sm">

      {/* Table Container */}
      <div className="overflow-hidden border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1E40AF] hover:bg-[#1E40AF]">
              <TableHead className="w-14 border-r border-white/20 text-white font-semibold">
                No.
              </TableHead>

              <TableHead className="min-w-[220px] border-r border-white/20 text-white font-semibold">
                No. Pinjaman
              </TableHead>

              <TableHead className="min-w-[220px] border-r border-white/20 text-white font-semibold">
                Total Pinjaman
              </TableHead>

              <TableHead className="min-w-[260px] border-r border-white/20 text-white font-semibold">
                Tanggal Pengajuan
              </TableHead>

              <TableHead className="min-w-[180px] border-r border-white/20 text-white font-semibold">
                Durasi Pinjaman
              </TableHead>

              <TableHead className="min-w-[170px] border-r border-white/20 text-white font-semibold">
                Biaya Cicilan
              </TableHead>

              <TableHead className="min-w-[170px] border-r border-white/20 text-white font-semibold">
                Periode Cicilan
              </TableHead>

              <TableHead className="min-w-[170px] text-white font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pinjamanData.map((item) => {
              const sisaTermin =
                item.totalTermin - item.terminBerjalan;

              return (
                <TableRow
                  key={item.noPinjaman}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* No */}
                  <TableCell className="border-r border-b border-gray-200 font-medium">
                    {item.no}
                  </TableCell>

                  {/* No Pinjaman */}
                  <TableCell className="border-r border-b border-gray-200">
                    <span className="font-mono text-sm text-gray-800">
                      {item.noPinjaman}
                    </span>
                  </TableCell>

                  {/* Total Pinjaman */}
                  <TableCell className="border-r border-b border-gray-200 font-medium text-gray-800">
                    {formatRupiah(item.totalPinjaman)}
                  </TableCell>

                  {/* Tanggal Pengajuan */}
                  <TableCell className="border-r border-b border-gray-200">
                    <div className="flex items-start gap-2">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF]" />

                      <span className="text-sm leading-relaxed text-gray-700">
                        {item.tanggalPengajuan}
                      </span>
                    </div>
                  </TableCell>

                  {/* Durasi */}
                  <TableCell className="border-r border-b border-gray-200">
                    <span className="text-sm text-gray-700">
                      {item.durasiPinjaman}
                    </span>
                  </TableCell>

                  {/* Cicilan */}
                  <TableCell className="border-r border-b border-gray-200">
                    <span className="font-semibold text-green-700">
                      {formatRupiah(item.biayaCicilan)}
                    </span>
                  </TableCell>

                  {/* Progress Cicilan */}
                  <TableCell className="border-r border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {item.terminBerjalan}/{item.totalTermin}
                      </span>

                      {item.status !== 'Lunas' && (
                        <span className="text-xs text-gray-500">
                          ({sisaTermin} tersisa)
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="border-b border-gray-200">
                    {item.status === 'Lunas' ? (
                      <Badge
                        className="
                          bg-green-100
                          text-green-700
                          rounded-sm
                          border
                          border-green-200
                          px-3
                          py-1
                          flex
                          items-center
                          gap-1.5
                          w-fit
                          font-medium
                          hover:bg-green-100
                        "
                      >
                        <Check className="w-3.5 h-3.5" />
                        {item.status}
                      </Badge>
                    ) : (
                      <Badge
                        className="
                          inline-flex
                          h-7
                          items-center
                          gap-1.5
                          rounded-sm
                          border
                          border-amber-300
                          bg-amber-50
                          px-2.5
                          text-xs
                          font-medium
                          text-amber-700
                          hover:bg-amber-50
                        "
                      >
                        <Clock className="h-3 w-3 shrink-0 text-amber-500" />
                        Belum Lunas
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Information Box */}
      <div className="mt-4 rounded-sm border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-sm border border-[#1E40AF]">
            <span className="text-[11px] font-bold text-[#1E40AF]">
              i
            </span>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1E40AF]">
              Informasi Status Pinjaman
            </h4>

            <p className="mt-1 text-sm leading-relaxed text-blue-700">
              Status{' '}
              <span className="font-semibold">
                "Belum Lunas"
              </span>{' '}
              menunjukkan pinjaman masih berjalan dan masih
              terdapat sisa cicilan yang belum dibayarkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabRiwayatPinjaman;