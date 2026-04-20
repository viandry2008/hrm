import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, XCircle, AlertCircle, Trophy, Calendar } from 'lucide-react';

const TabRiwayatPinjaman = ({ data }: any) => {
  // Dummy data pinjaman - sudah lunas
  const pinjamanData = {
    totalPinjaman: 10000000,
    sisaPinjaman: 0,
    cicilanPerBulan: 1000000,
    status: 'Lunas',
    periodePotong: 'Jan 2024 - Oct 2024',
    progress: 100,
    totalCicilan: 10,
    cicilanTerbayar: 10,
  };

  const riwayatPotongan = [
    {
      bulan: 'Jan 2024',
      totalPinjaman: 10000000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Jan 2024',
    },
    {
      bulan: 'Feb 2024',
      totalPinjaman: 9000000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Feb 2024',
    },
    {
      bulan: 'Mar 2024',
      totalPinjaman: 8000000,
      potonganPinjaman: 0,
      status: 'Gagal',
      keterangan: 'Gaji Tidak Cukup',
      tanggalPotong: '-',
    },
    {
      bulan: 'Apr 2024',
      totalPinjaman: 8000000,
      potonganPinjaman: 1500000,
      status: 'Dipotong',
      tanggalPotong: '25 Apr 2024',
    },
    {
      bulan: 'Mei 2024',
      totalPinjaman: 6500000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Mei 2024',
    },
    {
      bulan: 'Jun 2024',
      totalPinjaman: 5500000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Jun 2024',
    },
    {
      bulan: 'Jul 2024',
      totalPinjaman: 4500000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Jul 2024',
    },
    {
      bulan: 'Agu 2024',
      totalPinjaman: 3500000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Agu 2024',
    },
    {
      bulan: 'Sep 2024',
      totalPinjaman: 2500000,
      potonganPinjaman: 1000000,
      status: 'Dipotong',
      tanggalPotong: '25 Sep 2024',
    },
    {
      bulan: 'Oct 2024',
      totalPinjaman: 1500000,
      potonganPinjaman: 1500000,
      status: 'Lunas',
      tanggalPotong: '25 Oct 2024',
    },
  ];

  const aktivitasPinjaman = [
    {
      tanggal: '5 Jan 2024',
      aktivitas: 'Pinjaman Dibuat',
      jumlah: 10000000,
      status: 'success',
    },
    {
      tanggal: '25 Jan 2024',
      aktivitas: 'Cicilan Januari Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Feb 2024',
      aktivitas: 'Cicilan Februari Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Mar 2024',
      aktivitas: 'Potongan Gagal - Gaji Tidak Mencukupi',
      jumlah: 0,
      status: 'error',
    },
    {
      tanggal: '25 Apr 2024',
      aktivitas: 'Cicilan Maret & April Dipotong (Double)',
      jumlah: 1500000,
      status: 'success',
    },
    {
      tanggal: '25 Mei 2024',
      aktivitas: 'Cicilan Mei Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Jun 2024',
      aktivitas: 'Cicilan Juni Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Jul 2024',
      aktivitas: 'Cicilan Juli Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Agu 2024',
      aktivitas: 'Cicilan Agustus Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Sep 2024',
      aktivitas: 'Cicilan September Dipotong dari Gaji',
      jumlah: 1000000,
      status: 'success',
    },
    {
      tanggal: '25 Oct 2024',
      aktivitas: 'Cicilan Terakhir - PINJAMAN LUNAS',
      jumlah: 1500000,
      status: 'success',
      isLunas: true,
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
    <Card className="bg-white">
      <CardContent className="p-6 space-y-6">

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Pinjaman - Deep Blue */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] p-4 rounded-lg text-white">
            <p className="text-sm text-white/90 mb-1">Total Pinjaman:</p>
            <p className="text-lg font-bold">
              {formatRupiah(pinjamanData.totalPinjaman)}
            </p>
          </div>

          {/* Sisa Pinjaman - Merah/Hijau */}
          <div className={`${pinjamanData.sisaPinjaman === 0 ? 'bg-green-600' : 'bg-red-600'} p-4 rounded-lg text-white`}>
            <p className="text-sm text-white/90 mb-1">Sisa Pinjaman</p>
            <p className="text-lg font-bold">
              {formatRupiah(pinjamanData.sisaPinjaman)}
            </p>
          </div>

          {/* Cicilan per Bulan - Hijau */}
          <div className="bg-green-600 p-4 rounded-lg text-white">
            <p className="text-sm text-white/90 mb-1">Cicilan per Bulan:</p>
            <p className="text-lg font-bold">
              {formatRupiah(pinjamanData.cicilanPerBulan)}
            </p>
          </div>

          {/* Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Status:</p>
            {pinjamanData.status === 'Lunas' ? (
              <Badge className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 w-fit">
                <Trophy className="w-3.5 h-3.5" />
                {pinjamanData.status}
              </Badge>
            ) : (
              <Badge
                className={
                  pinjamanData.status === 'Aktif'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-500 hover:bg-gray-600'
                }
              >
                {pinjamanData.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Periode */}
        <div className="text-left text-sm text-gray-600">
          Periode Potong: <span className="font-medium">{pinjamanData.periodePotong}</span>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">
              Progress Pembayaran: <span className="text-green-600 font-bold">{pinjamanData.progress}%</span> Terbayar
            </p>
            <p className="text-sm text-gray-600">
              {pinjamanData.cicilanTerbayar} dari {pinjamanData.totalCicilan} Cicilan
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${pinjamanData.progress === 100 ? 'bg-green-600' : 'bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF]'} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${pinjamanData.progress}%` }}
            />
          </div>
          {pinjamanData.progress === 100 && (
            <p className="text-sm text-green-600 font-semibold mt-2 flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Selamat! Pinjaman telah lunas
            </p>
          )}
        </div>

        {/* Keterangan Potongan */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#1E40AF] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Keterangan Potongan Pinjaman
              </h4>
              <p className="text-sm text-blue-700">
                Pinjaman dipotong otomatis dari gaji setiap tanggal <span className="font-bold">25</span> setiap bulannya.
                Potongan dilakukan bersamaan dengan proses penggajian.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-[#1E40AF] border-[#1E40AF] bg-white/50">
                  <Calendar className="w-3 h-3 mr-1" />
                  Potong Tanggal 25
                </Badge>
                <Badge variant="outline" className="text-[#1E40AF] border-[#1E40AF] bg-white/50">
                  Otomatis dari Gaji
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Potongan Pinjaman */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Riwayat Potongan Pinjaman
          </h3>
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Bulan
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Total Pinjaman
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Potongan Pinjaman
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Tanggal Potong
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riwayatPotongan.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`hover:bg-gray-50 ${item.status === 'Lunas' ? 'bg-green-50' : ''}`}
                  >
                    <TableCell className="font-medium border-r border-gray-200 border-b border-gray-200">
                      {item.bulan}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 border-b border-gray-200">
                      {formatRupiah(item.totalPinjaman)}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 border-b border-gray-200">
                      {formatRupiah(item.potonganPinjaman)}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 border-b border-gray-200">
                      {item.tanggalPotong !== '-' ? (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-3.5 h-3.5 text-[#1E40AF]" />
                          <span className="text-sm">{item.tanggalPotong}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="border-b border-gray-200">
                      {item.status === 'Dipotong' && (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Dipotong</span>
                        </div>
                      )}
                      {item.status === 'Lunas' && (
                        <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm font-medium">LUNAS</span>
                        </div>
                      )}
                      {item.status === 'Gagal' && (
                        <div className="flex items-center gap-1.5 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">Gagal Potong</p>
                            <p className="text-xs">(Gaji Tidak Cukup)</p>
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Aktivitas Pinjaman */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Aktivitas Pinjaman
          </h3>
          <div className="space-y-3">
            {aktivitasPinjaman.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${item.isLunas ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'}`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.isLunas ? (
                    <Trophy className="w-5 h-5 text-green-600" />
                  ) : item.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.tanggal}</p>
                  <p className={`text-sm ${item.isLunas ? 'text-green-700 font-semibold' : item.status === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.aktivitas} {item.jumlah > 0 && `- ${formatRupiah(item.jumlah)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default TabRiwayatPinjaman;