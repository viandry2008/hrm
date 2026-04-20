import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Paperclip, 
  Clock, 
  FileText,
  DollarSign,
  UserCheck,
  X,
  Download // 👈 tambahkan ini
} from 'lucide-react';

const currentUser = {
  idKaryawan: 'EMP001',
  namaKaryawan: 'Andi Pratama',
  divisi: 'IT',
  jabatan: 'Developer'
};

interface Item {
  id: number;
  tanggal: Date;
  keterangan: string;
  kategori: string;
  jumlah: number;
}

interface ReimbursementData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  keterangan: string;
  total: number;
  lampiran: string;
  tanggalPengajuan: Date;
  catatan: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
  disetujuiOleh?: string;
  ditolakOleh?: string;
  diketahuiOleh?: string;
  tanggalDiketahui?: Date;
  statusPembayaran: 'Menunggu Dibayar' | 'Telah Dibayar';
  tanggalDibayar?: Date;
}

const mockData: ReimbursementData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Andi Pratama',
    divisi: 'IT',
    jabatan: 'Developer',
    keterangan: 'Biaya transportasi meeting client',
    total: 150000,
    lampiran: 'receipt_transport.pdf',
    tanggalPengajuan: new Date('2024-01-15T10:30:00'),
    catatan: 'Meeting dengan client di Jakarta',
    status: 'Menunggu Disetujui',
    statusPembayaran: 'Menunggu Dibayar'
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Rahayu',
    divisi: 'HR',
    jabatan: 'HR Manager',
    keterangan: 'Biaya makan siang training karyawan',
    total: 500000,
    lampiran: 'receipt_catering.pdf',
    tanggalPengajuan: new Date('2024-01-12T14:20:00'),
    catatan: 'Training untuk 25 karyawan',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-14T09:15:00'),
    disetujuiOleh: 'Rommy Gani',
    diketahuiOleh: 'HRD Personalia',
    tanggalDiketahui: new Date('2024-01-14T10:00:00'),
    statusPembayaran: 'Telah Dibayar',
    tanggalDibayar: new Date('2024-01-15T10:00:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP003',
    namaKaryawan: 'Budi Santoso',
    divisi: 'Finance',
    jabatan: 'Finance Staff',
    keterangan: 'Biaya pulsa dan internet',
    total: 100000,
    lampiran: 'receipt_pulsa.jpg',
    tanggalPengajuan: new Date('2024-01-18T16:45:00'),
    catatan: 'Untuk keperluan WFH bulan Januari',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-19T11:30:00'),
    disetujuiOleh: 'Rommy Gani',
    diketahuiOleh: 'HRD Personalia',
    tanggalDiketahui: new Date('2024-01-19T12:00:00'),
    statusPembayaran: 'Menunggu Dibayar'
  },
  {
    no: 4,
    idKaryawan: 'EMP004',
    namaKaryawan: 'Dewi Lestari',
    divisi: 'Marketing',
    jabatan: 'Marketing Executive',
    keterangan: 'Biaya iklan sosial media',
    total: 300000,
    lampiran: 'receipt_ads.pdf',
    tanggalPengajuan: new Date('2024-01-20T11:00:00'),
    catatan: 'Promosi produk baru',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-01-22T11:45:00'),
    ditolakOleh: 'Rommy Gani',
    statusPembayaran: 'Menunggu Dibayar'
  },
  {
    no: 5,
    idKaryawan: 'EMP005',
    namaKaryawan: 'Agung Wijaya',
    divisi: 'IT',
    jabatan: 'System Analyst',
    keterangan: 'Biaya pembelian software lisensi',
    total: 1200000,
    lampiran: 'invoice_software.pdf',
    tanggalPengajuan: new Date('2024-01-10T09:00:00'),
    catatan: 'Lisensi untuk 1 tahun',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-11T14:20:00'),
    disetujuiOleh: 'Rommy Gani',
    diketahuiOleh: 'HRD Personalia',
    tanggalDiketahui: new Date('2024-01-11T15:00:00'),
    statusPembayaran: 'Menunggu Dibayar'
  }
];

export const ReimbursementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<ReimbursementData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), tanggal: new Date(), keterangan: '', kategori: '', jumlah: 0 }
  ]);

  const [form, setForm] = useState({
    idKaryawan: currentUser.idKaryawan,
    namaKaryawan: currentUser.namaKaryawan,
    divisi: currentUser.divisi,
    jabatan: currentUser.jabatan,
    lampiran: null as File | null,
    namaRekening: '',
    nomorRekening: '',
    bank: ''
  });

  // --- 🔹 TAMBAHAN: State untuk modal lampiran ---
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  // Fungsi viewAttachment 
  const viewAttachment = (filename: string) => {
    let fileUrl = '';

    if (filename.endsWith('.pdf')) {
      fileUrl = 'https://pdfobject.com/pdf/sample.pdf';
    } else if (filename.match(/\.(jpg|jpeg|png)$/i)) {
      fileUrl = 'https://picsum.photos/800/600';
    } else {
      fileUrl = 'https://pdfobject.com/pdf/sample.pdf';
    }

    setSelectedAttachment(filename);
    setAttachmentUrl(fileUrl);
    setIsAttachmentModalOpen(true);
  };

  // Format Currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount).replace(/\s/g, '');
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID') + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // Total dari semua item
  const totalBiaya = items.reduce((sum, item) => sum + item.jumlah, 0);

  const handleApprove = (no: number) => {
    setData(prev =>
      prev.map(item =>
        item.no === no
          ? {
              ...item,
              status: 'Disetujui' as const,
              tanggalDisetujui: new Date(),
              tanggalDitolak: undefined,
              disetujuiOleh: 'Rommy Gani',
              ditolakOleh: undefined,
              diketahuiOleh: 'HRD Personalia',
              tanggalDiverifikasi: new Date(),
              statusPembayaran: 'Menunggu Dibayar'
            }
          : item
      )
    );
    setCurrentPage(1);
  };

  const handleReject = (no: number) => {
    setData(prev =>
      prev.map(item =>
        item.no === no
          ? {
              ...item,
              status: 'Ditolak' as const,
              tanggalDitolak: new Date(),
              tanggalDisetujui: undefined,
              ditolakOleh: 'Rommy Gani',
              disetujuiOleh: undefined,
              diketahuiOleh: 'HRD Personalia',
              tanggalDiverifikasi: new Date(),
              statusPembayaran: 'Menunggu Dibayar'
            }
          : item
      )
    );
    setCurrentPage(1);
  };

  const handleDeleteSingle = (idKaryawan: string) => {
    if (confirm(`Yakin ingin menghapus pengajuan dari karyawan ${idKaryawan}?`)) {
      setData(prev => prev.filter(item => item.idKaryawan !== idKaryawan));
      setCurrentPage(prev => Math.max(1, Math.ceil((data.length - 1) / itemsPerPage)));
    }
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), tanggal: new Date(), keterangan: '', kategori: '', jumlah: 0 }]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, lampiran: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tanggalPengajuan = new Date();
    const keteranganGabungan = items.map(i => i.keterangan).filter(Boolean).join(', ');

    const newItem: ReimbursementData = {
      no: data.length + 1,
      ...form,
      total: totalBiaya,
      lampiran: form.lampiran?.name || '',
      tanggalPengajuan,
      keterangan: keteranganGabungan || 'Detail pengeluaran',
      status: 'Menunggu Disetujui',
      statusPembayaran: 'Menunggu Dibayar'
    };
    setData(prev => [...prev, newItem]);
    setIsModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 300); 
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsModalVisible(true), 10); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 300); 
  };

  const filteredData = data.filter(item => 
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reimbursement</h1>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-yellow-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Menunggu Disetujui
            </CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Menunggu Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        <Card className="bg-green-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Disetujui
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        <Card className="bg-red-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Ditolak
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Ditolak').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Reimbursement
            </CardTitle>
            <FileText className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.length}</div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>
      </div>
          
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari berdasarkan ID, nama, divisi, dll..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={openModal}>
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Reimbursement
            </Button>
          </div>

          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Keterangan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Total</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Lampiran</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal Pengajuan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Catatan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Diketahui Oleh</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Pembayaran</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="font-medium border-r whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap font-medium">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.keterangan}</TableCell>
                    <TableCell className="font-semibold border-r whitespace-nowrap">{formatCurrency(item.total)}</TableCell>
                    <TableCell className="border-r">
                      <div className="flex items-center space-x-1">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span
                          className="text-sm text-blue-600 hover:underline cursor-pointer truncate max-w-24 font-medium"
                          onClick={() => viewAttachment(item.lampiran)}
                          title="Klik untuk lihat lampiran"
                        >
                          {item.lampiran}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.catatan}</TableCell>
                    
                    {/* Status */}
                    <TableCell className="border-r whitespace-nowrap">
                      {item.status === 'Disetujui' && item.disetujuiOleh && (
                        <div className="flex flex-col">
                          <Badge 
                            className="inline-block bg-green-600 text-white hover:bg-green-600 hover:text-white transition-none py-1 px-2 rounded font-medium max-w-fit"
                            style={{ display: 'inline-block', maxWidth: 'max-content' }}
                          >
                            Disetujui oleh {item.disetujuiOleh}
                          </Badge>
                          <span className="text-xs text-gray-500 mt-1">
                            {formatDateTime(item.tanggalDisetujui!)}
                          </span>
                        </div>
                      )}

                      {item.status === 'Ditolak' && item.ditolakOleh && (
                        <div className="flex flex-col">
                          <Badge 
                            className="inline-block bg-red-600 text-white hover:bg-red-600 hover:text-white transition-none py-1 px-2 rounded font-medium max-w-fit"
                            style={{ display: 'inline-block', maxWidth: 'max-content' }}
                          >
                            Ditolak oleh {item.ditolakOleh}
                          </Badge>
                          <span className="text-xs text-black mt-1">
                            <strong className="font-bold">Catatan</strong> : Terlalu banyak reimbursement
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {formatDateTime(item.tanggalDitolak!)}
                          </span>
                        </div>
                      )}

                      {item.status === 'Menunggu Disetujui' && (
                        <Badge 
                          className="inline-block bg-yellow-300 text-black hover:bg-yellow-300 hover:text-black transition-none py-1 px-2 rounded max-w-fit"
                          style={{ display: 'inline-block', maxWidth: 'max-content' }}
                        >
                          Menunggu Disetujui
                        </Badge>
                      )}
                    </TableCell>

                    {/* Diverifikasi Oleh (HRD) */}
                    <TableCell className="border-r whitespace-nowrap">
                      {item.diketahuiOleh ? (
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <UserCheck className="w-3 h-3 text-blue-500" />
                            <span className="text-sm text-gray-700">{item.diketahuiOleh}</span>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">
                            {formatDateTime(item.tanggalDiketahui!)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>

                   {/* Pembayaran */}
                    <TableCell className="border-r whitespace-nowrap">
                      {item.status === 'Disetujui' && item.statusPembayaran === 'Telah Dibayar' ? (
                        <div className="flex flex-col">
                          <Badge 
                            className="inline-block bg-blue-600 text-white hover:bg-blue-600 hover:text-white transition-none py-1 px-2 rounded font-medium max-w-fit"
                            style={{ display: 'inline-block', maxWidth: 'max-content' }}
                          >
                            Telah Dibayar
                          </Badge>
                          {item.tanggalDibayar && (
                            <span className="text-xs text-gray-500 mt-1">
                              {formatDateTime(item.tanggalDibayar)}
                            </span>
                          )}
                        </div>
                      ) : item.status === 'Disetujui' && item.statusPembayaran === 'Menunggu Dibayar' ? (
                        <Badge 
                          className="inline-block bg-yellow-300 text-black hover:bg-yellow-300 hover:text-black transition-none py-1 px-2 rounded max-w-fit"
                          style={{ display: 'inline-block', maxWidth: 'max-content' }}
                        >
                          Menunggu Dibayar
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>

                    {/* Aksi */}
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {item.status === 'Menunggu Disetujui' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                            title="Setujui Pengajuan"
                            onClick={() => handleApprove(item.no)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}

                        {item.status === 'Menunggu Disetujui' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700"
                            title="Tolak Pengajuan"
                            onClick={() => handleReject(item.no)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
                          onClick={() => handleDeleteSingle(item.idKaryawan)}
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal Ajukan Reimbursement */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out"
          style={{ opacity: isModalVisible ? 1 : 0 }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto transition-all duration-300 ease-out transform"
            style={{
              opacity: isModalVisible ? 1 : 0,
              transform: isModalVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Ajukan Reimbursement</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Auto-fill Info Karyawan (readonly, tampilan seperti disable) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Karyawan</label>
                  <Input 
                    name="idKaryawan" 
                    value={form.idKaryawan} 
                    readOnly 
                    className="mt-1 block w-full bg-gray-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Karyawan</label>
                  <Input 
                    name="namaKaryawan" 
                    value={form.namaKaryawan} 
                    readOnly 
                    className="mt-1 block w-full bg-gray-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Divisi</label>
                  <Input 
                    name="divisi" 
                    value={form.divisi} 
                    readOnly 
                    className="mt-1 block w-full bg-gray-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                  <Input 
                    name="jabatan" 
                    value={form.jabatan} 
                    readOnly 
                    className="mt-1 block w-full bg-gray-300 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Tabel Input Detail Pengeluaran */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Detail Pengeluaran</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="w-1/6 text-gray-900">Tanggal</TableHead>
                      <TableHead className="w-2/6 text-gray-900">Keterangan</TableHead>
                      <TableHead className="w-1/6 text-gray-900">Kategori</TableHead>
                      <TableHead className="w-1/6 text-gray-900">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <input
                            type="date"
                            value={item.tanggal.toISOString().split('T')[0]}
                            onChange={(e) => handleItemChange(item.id, 'tanggal', new Date(e.target.value))}
                            className="block w-full border-gray-300 rounded-md shadow-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.keterangan}
                            onChange={(e) => handleItemChange(item.id, 'keterangan', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Select value={item.kategori} onValueChange={(value) => handleItemChange(item.id, 'kategori', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Transportasi">Transportasi</SelectItem>
                              <SelectItem value="Makanan">Makanan</SelectItem>
                              <SelectItem value="Komunikasi">Komunikasi</SelectItem>
                              <SelectItem value="Perjalanan">Perjalanan</SelectItem>
                              <SelectItem value="Lainnya">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                       <TableCell>
                      <div className="flex items-center">
                        <span className="text-gray-500 px-2 whitespace-nowrap">Rp</span>
                        <Input
                          type="text"
                          value={item.jumlah === 0 ? '' : new Intl.NumberFormat('id-ID').format(item.jumlah)}
                          onChange={(e) => {
                            const rawValue = e.target.value
                              .replace(/[^0-9]/g, ''); // Hanya angka
                            const numberValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
                            handleItemChange(item.id, 'jumlah', numberValue);
                          }}
                          placeholder="0"
                          className="pl-2 text-right"
                        />
                      </div>
                    </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Tambah dan Hapus Baris */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addItem}
                    className="flex items-center bg-blue-600 text-white border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 transition-transform duration-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Baris
                  </Button>

                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setItems(prev => prev.slice(0, -1))}
                      className="flex items-center bg-red-600 text-white border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 transition-transform duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus Baris
                    </Button>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  Total: {formatCurrency(totalBiaya)}
                </p>
              </div>

             {/* Upload Lampiran */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Lampiran Bukti</label>
              <div
                className="mt-2 w-full border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer bg-white hover:border-gray-400 transition-all duration-200"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload lampiran"
                />
                {form.lampiran ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <Paperclip className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Terpilih:</span>
                    <span className="text-blue-600 truncate max-w-xs">{form.lampiran.name}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 underline">Choose File</span> or drag and drop
                  </p>
                )}
              </div>
            </div>
              {/* Informasi Transfer */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Rekening</label>
                    <Input 
                      name="namaRekening" 
                      value={form.namaRekening} 
                      onChange={(e) => setForm(prev => ({ ...prev, namaRekening: e.target.value }))} 
                      className="mt-1 block w-full" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">No. Rekening</label>
                    <Input 
                      name="nomorRekening" 
                      value={form.nomorRekening} 
                      onChange={(e) => setForm(prev => ({ ...prev, nomorRekening: e.target.value }))} 
                      className="mt-1 block w-full" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank</label>
                    <Select value={form.bank} onValueChange={(value) => setForm(prev => ({ ...prev, bank: value }))}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Pilih bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BCA">BCA</SelectItem>
                        <SelectItem value="BNI">BNI</SelectItem>
                        <SelectItem value="Mandiri">Mandiri</SelectItem>
                        <SelectItem value="BRI">BRI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeModal}
                >
                  Batal
                </Button>
                <Button type="kirim" className="bg-blue-600 hover:bg-blue-700">
                  Kirim
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 MODAL VIEW LAMPIRAN */}
      {isAttachmentModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsAttachmentModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Lampiran: {selectedAttachment}
              </h2>
              <button
                onClick={() => setIsAttachmentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {selectedAttachment?.endsWith('.pdf') ? (
                <iframe
                  src={`${attachmentUrl}#toolbar=1&zoom=100`}
                  className="w-full h-96 border rounded"
                  title="PDF Viewer"
                />
              ) : (
                <img
                  src={attachmentUrl || ''}
                  alt="Lampiran"
                  className="w-full h-auto rounded border"
                />
              )}
            </div>
            <div className="p-6 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = attachmentUrl!;
                  link.download = selectedAttachment!;
                  link.click();
                }}
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="default"
                onClick={() => setIsAttachmentModalOpen(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
       <footer className="mt-10 text-xs text-left">
        © 2025 PT Proven Force Indonesia, All Rights Reserved.
      </footer>
    </div>
  );
};