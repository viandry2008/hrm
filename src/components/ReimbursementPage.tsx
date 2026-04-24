import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, CheckCircle, XCircle, Clock, FileText, File, Paperclip, Plus, Trash2, X, Download } from 'lucide-react';
import { StatCard, StatCardGrid } from '@/components/ui/stat-card';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import Swal from 'sweetalert2';

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
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Diproses Finance' | 'Ditransfer' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;
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
    status: 'Diproses Finance',
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
    status: 'Ditransfer',
    statusPembayaran: 'Telah Dibayar',
    tanggalDibayar: new Date('2024-01-16T10:00:00')
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

  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount).replace(/\s/g, '');
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID') + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const totalBiaya = items.reduce((sum, item) => sum + item.jumlah, 0);

  const handleApprove = (no: number) => {
    setData(prev =>
      prev.map(item =>
        item.no === no
          ? {
            ...item,
            status: 'Disetujui' as const,
            tanggalDisetujui: new Date(),
            tanggalDitolak: undefined
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
            tanggalDisetujui: undefined
          }
          : item
      )
    );
    setCurrentPage(1);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), tanggal: new Date(), keterangan: '', kategori: '', jumlah: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
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
      catatan: keteranganGabungan || 'Detail pengeluaran',
      status: 'Menunggu Disetujui',
      statusPembayaran: 'Menunggu Dibayar'
    };
    setData(prev => [...prev, newItem]);
    closeModal();
    Swal.fire({
      title: 'Berhasil!',
      text: 'Pengajuan reimbursement berhasil diajukan.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
    setItems([{ id: Date.now(), tanggal: new Date(), keterangan: '', kategori: '', jumlah: 0 }]);
    setForm({
      idKaryawan: currentUser.idKaryawan,
      namaKaryawan: currentUser.namaKaryawan,
      divisi: currentUser.divisi,
      jabatan: currentUser.jabatan,
      lampiran: null,
      namaRekening: '',
      nomorRekening: '',
      bank: ''
    });
  };

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (item: ReimbursementData) => {
    const { status, tanggalDisetujui, tanggalDitolak } = item;

    if (status === 'Ditolak') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 w-fit rounded-none px-2 py-1">
            Ditolak
          </Badge>
          {tanggalDitolak && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDitolak)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Disetujui') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit rounded-none px-2 py-1">
            Disetujui
          </Badge>
          {tanggalDisetujui && (
            <span className="text-xs text-gray-500">
              {formatDateTime(tanggalDisetujui)}
            </span>
          )}
        </div>
      );
    }

    if (status === 'Diproses Finance') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit rounded-none px-2 py-1">
            Diproses Finance
          </Badge>
        </div>
      );
    }

    if (status === 'Ditransfer') {
      return (
        <div className="flex flex-col gap-1">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 w-fit rounded-none px-2 py-1">
            Ditransfer
          </Badge>
        </div>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
        Menunggu Disetujui
      </Badge>
    );
  };

  const handleDeleteSingle = (idKaryawan: string) => {
    if (confirm(`Yakin ingin menghapus pengajuan dari karyawan ${idKaryawan}?`)) {
      setData(prev => prev.filter(item => item.idKaryawan !== idKaryawan));
      setCurrentPage(prev => Math.max(1, Math.ceil((data.length - 1) / itemsPerPage)));
    }
  };

  const getPaymentStatusBadge = (statusPembayaran: string) => {
    if (statusPembayaran === 'Telah Dibayar') {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit rounded-none px-2 py-1">
          Telah Dibayar
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 w-fit rounded-none px-2 py-1">
        Menunggu Dibayar
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <StatCardGrid>
        <StatCard
          title="Menunggu Disetujui"
          value={data.filter(d => d.status === 'Menunggu Disetujui').length}
          subtitle="Pengajuan"
          icon={Clock}
          borderColor="yellow"
        />
        <StatCard
          title="Total Disetujui"
          value={data.filter(d => d.status === 'Disetujui' || d.status === 'Diproses Finance' || d.status === 'Ditransfer').length}
          subtitle="Pengajuan"
          icon={CheckCircle}
          borderColor="green"
        />
        <StatCard
          title="Total Ditolak"
          value={data.filter(d => d.status === 'Ditolak').length}
          subtitle="Pengajuan"
          icon={XCircle}
          borderColor="red"
        />
        <StatCard
          title="Total Reimbursement"
          value={data.length}
          subtitle="Pengajuan"
          icon={FileText}
          borderColor="blue"
        />
      </StatCardGrid>

      <TableCard icon={File} title="Data Pengajuan Reimbursement">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari berdasarkan nama, ID, divisi atau keterangan..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={openModal}
          addButtonLabel="Ajukan Reimbursement"
        />

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
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Pembayaran</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="max-w-xs truncate border-r border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap" title={item.keterangan}>
                      {item.keterangan}
                    </TableCell>
                    <TableCell className="font-semibold border-r border-gray-200 whitespace-nowrap">{formatCurrency(item.total)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span
                          className="text-sm text-blue-600 hover:underline cursor-pointer truncate max-w-24"
                          onClick={() => viewAttachment(item.lampiran)}
                          title="Klik untuk lihat lampiran"
                        >
                          {item.lampiran}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatDate(item.tanggalPengajuan)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {getStatusBadge(item)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {getPaymentStatusBadge(item.statusPembayaran)}
                    </TableCell>
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
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700"
                              title="Setujui"
                              onClick={() => handleApprove(item.no)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-red-600 text-white hover:bg-red-700"
                              title="Tolak"
                              onClick={() => handleReject(item.no)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-6">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          pagination={{ current_page: currentPage, last_page: totalPages, per_page: itemsPerPage, total: filteredData.length }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          items={paginatedData}
        />
      </TableCard>

      {/* Modal Ajukan Reimbursement */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Ajukan Reimbursement</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Karyawan</label>
                  <Input name="idKaryawan" value={form.idKaryawan} readOnly className="mt-1 block w-full bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Karyawan</label>
                  <Input name="namaKaryawan" value={form.namaKaryawan} readOnly className="mt-1 block w-full bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Divisi</label>
                  <Input name="divisi" value={form.divisi} readOnly className="mt-1 block w-full bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                  <Input name="jabatan" value={form.jabatan} readOnly className="mt-1 block w-full bg-gray-100" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Detail Pengeluaran</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-gray-900">Tanggal</TableHead>
                      <TableHead className="text-gray-900">Keterangan</TableHead>
                      <TableHead className="text-gray-900">Kategori</TableHead>
                      <TableHead className="text-gray-900">Jumlah</TableHead>
                      <TableHead className="text-gray-900">Aksi</TableHead>
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
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </TableCell>
                        <TableCell>
                          <Input value={item.keterangan} onChange={(e) => handleItemChange(item.id, 'keterangan', e.target.value)} />
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
                            <span className="text-gray-500 px-2">Rp</span>
                            <Input
                              type="text"
                              value={item.jumlah === 0 ? '' : new Intl.NumberFormat('id-ID').format(item.jumlah)}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^0-9]/g, '');
                                const numberValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
                                handleItemChange(item.id, 'jumlah', numberValue);
                              }}
                              placeholder="0"
                              className="pl-2 text-right"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {items.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex gap-2 mt-2">
                  <Button type="button" size="sm" onClick={addItem} className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-1" /> Tambah Baris
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  Total: {formatCurrency(totalBiaya)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lampiran Bukti</label>
                <div
                  className="mt-2 w-full border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer bg-white hover:border-gray-400"
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

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Rekening</label>
                    <Input name="namaRekening" value={form.namaRekening} onChange={(e) => setForm(prev => ({ ...prev, namaRekening: e.target.value }))} className="mt-1 block w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">No. Rekening</label>
                    <Input name="nomorRekening" value={form.nomorRekening} onChange={(e) => setForm(prev => ({ ...prev, nomorRekening: e.target.value }))} className="mt-1 block w-full" />
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

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Kirim
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Lampiran */}
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
                <iframe src={`${attachmentUrl}#toolbar=1&zoom=100`} className="w-full h-96 border rounded" title="PDF Viewer" />
              ) : (
                <img src={attachmentUrl || ''} alt="Lampiran" className="w-full h-auto rounded border" />
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
                <Download className="w-4 h-4" /> Download
              </Button>
              <Button variant="default" onClick={() => setIsAttachmentModalOpen(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
