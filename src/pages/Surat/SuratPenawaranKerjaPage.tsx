import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, Download, X } from 'lucide-react';
import jsPDF from 'jspdf';

// Radix Dialog
import * as Dialog from '@radix-ui/react-dialog';

interface OfferData {
  no: number;
  noSurat: string;
  nama: string;
  posisi: string;
  gaji: number;
  tunjangan: boolean;
  tanggal: Date;
}

const mockData: OfferData[] = [
  {
    no: 1,
    noSurat: '2/PFI-MPO/INDOLOK/XII/2025',
    nama: 'Fasya Gani',
    posisi: 'Direktur',
    gaji: 5000000,
    tunjangan: true,
    tanggal: new Date('2025-12-09T11:19:00')
  }
];

export const SuratPenawaranKerjaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(mockData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nomorSurat: '',
    tanggalSurat: new Date().toISOString().split('T')[0],
    namaKaryawan: '',
    jenisKelamin: '',
    jabatan: '',
    gajiGross: '',
    waktuKerja: 'normal',
    rincianJamKerja: { jamHari: '', jamMinggu: '' },
    tanggalPembayaranGaji: '',
    lamaKontrak: { bulan: '', tahun: '' },
    tunjangan: [] as { nama: string; nominal: string }[]
  });

  const filtered = data.filter((item) =>
    item.noSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.posisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  const formatDate = (date: Date) =>
    date.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

  // PDF
  const handleDownloadPDF = (item: OfferData) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Surat Penawaran Kerja', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Nomor Surat: ${item.noSurat}`, 20, 40);
    doc.text(`Nama: ${item.nama}`, 20, 50);
    doc.text(`Posisi: ${item.posisi}`, 20, 60);
    doc.text(`Gaji: ${formatCurrency(item.gaji)}`, 20, 70);
    doc.text(`Tunjangan: ${item.tunjangan ? 'Ya' : 'Tidak'}`, 20, 80);
    doc.text(`Tanggal Pembuatan: ${formatDate(item.tanggal)}`, 20, 90);

    doc.save(`Surat_Penawaran_${item.nama}.pdf`);
  };

  const handleDelete = (no: number) => {
    setData((prev) => prev.filter((d) => d.no !== no));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      nomorSurat: '',
      tanggalSurat: new Date().toISOString().split('T')[0],
      namaKaryawan: '',
      jenisKelamin: '',
      jabatan: '',
      gajiGross: '',
      waktuKerja: 'normal',
      rincianJamKerja: { jamHari: '', jamMinggu: '' },
      tanggalPembayaranGaji: '',
      lamaKontrak: { bulan: '', tahun: '' },
      tunjangan: []
    });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    const gajiValue = parseInt(formData.gajiGross.replace(/\D/g, '')) || 0;

    const newData: OfferData = {
      no: data.length + 1,
      noSurat: formData.nomorSurat || `NEW/${new Date().getFullYear()}`,
      nama: formData.namaKaryawan,
      posisi: formData.jabatan,
      gaji: gajiValue,
      tunjangan: formData.tunjangan.length > 0,
      tanggal: new Date(formData.tanggalSurat)
    };

    setData((prev) => [...prev, newData]);
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('rincianJamKerja.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        rincianJamKerja: { ...prev.rincianJamKerja, [key]: value }
      }));
    } else if (name.startsWith('lamaKontrak.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        lamaKontrak: { ...prev.lamaKontrak, [key]: value }
      }));
    } else if (name === 'gajiGross') {
      let formattedValue = value.replace(/[^\d]/g, '');
      if (formattedValue) {
        formattedValue = 'Rp' + parseInt(formattedValue).toLocaleString('id-ID');
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, waktuKerja: e.target.value }));
  };

  const handleAddTunjangan = () => {
    setFormData((prev) => ({
      ...prev,
      tunjangan: [...prev.tunjangan, { nama: '', nominal: '' }]
    }));
  };

  const handleRemoveTunjangan = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tunjangan: prev.tunjangan.filter((_, i) => i !== index)
    }));
  };

  const handleNominalChange = (index: number, value: string) => {
    let formattedValue = value.replace(/[^\d]/g, '');
    if (formattedValue) {
      formattedValue = 'Rp' + parseInt(formattedValue).toLocaleString('id-ID');
    }

    setFormData((prev) => {
      const updated = [...prev.tunjangan];
      updated[index].nominal = formattedValue;
      return { ...prev, tunjangan: updated };
    });
  };

  const handleNamaTunjanganChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.tunjangan];
      updated[index].nama = value;
      return { ...prev, tunjangan: updated };
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Surat Penawaran Kerja</h1>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Surat Penawaran</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {/* --- FILTER --- */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(Number(v))}>
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">entries</span>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nomor surat, nama, posisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-fit" onClick={handleOpenModal}>
              <Plus className="w-4 h-4 mr-2" /> Buat Surat
            </Button>
          </div>

          {/* --- TABLE --- */}
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white whitespace-nowrap">No</TableHead>
                  <TableHead className="text-white whitespace-nowrap">No Surat</TableHead>
                  <TableHead className="text-white whitespace-nowrap">Nama</TableHead>
                  <TableHead className="text-white whitespace-nowrap">Posisi</TableHead>
                  <TableHead className="text-white whitespace-nowrap">Gaji</TableHead>
                  <TableHead className="text-white whitespace-nowrap">Tunjangan</TableHead>
                  <TableHead className="text-white whitespace-nowrap">Tanggal</TableHead>
                  <TableHead className="text-white whitespace-nowrap text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.noSurat}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.posisi}</TableCell>
                    <TableCell>{formatCurrency(item.gaji)}</TableCell>
                    <TableCell>{item.tunjangan ? '✔' : '-'}</TableCell>
                    <TableCell>{formatDate(item.tanggal)}</TableCell>

                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" className="bg-blue-600 text-white">
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          className="bg-green-600 text-white"
                          onClick={() => handleDownloadPDF(item)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          className="bg-red-600 text-white"
                          onClick={() => handleDelete(item.no)}
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

          {/* --- PAGINATION --- */}
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan <strong>{start + 1}</strong> –
              <strong>{Math.min(start + itemsPerPage, filtered.length)}</strong> dari{' '}
              <strong>{filtered.length}</strong> data
            </div>

            <div className="flex gap-2">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                Sebelumnya
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}
                >
                  {i + 1}
                </Button>
              ))}

              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- MODAL --- */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90vw] max-w-4xl max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto">

            <div className="flex justify-between items-center mb-2">
              <Dialog.Title className="text-xl font-semibold">Surat Penawaran Kerja</Dialog.Title>

              <Dialog.Close asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <X className="h-5 w-5" />
                </Button>
              </Dialog.Close>
            </div>

            <div className="border-t my-4"></div>

            <form onSubmit={handleSubmitModal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- KOLOM KIRI --- */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nomor Surat</label>
                    <Input name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Nama Karyawan *</label>
                    <Input name="namaKaryawan" value={formData.namaKaryawan} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Jabatan *</label>
                    <Input name="jabatan" value={formData.jabatan} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Waktu Kerja *</label>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="waktuKerja"
                          value="normal"
                          checked={formData.waktuKerja === 'normal'}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        Jam Kerja Normal
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="waktuKerja"
                          value="proyek"
                          checked={formData.waktuKerja === 'proyek'}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        Jam Kerja Proyek
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tanggal Pembayaran Gaji *</label>
                    <Input
                      name="tanggalPembayaranGaji"
                      value={formData.tanggalPembayaranGaji}
                      onChange={handleChange}
                      placeholder="Contoh: 09 Desember 2025"
                      required
                    />
                  </div>
                </div>

                {/* --- KOLOM KANAN --- */}
                <div className="space-y-4">

                  <div>
                    <label className="text-sm font-medium">Tanggal Surat</label>
                    <Input
                      name="tanggalSurat"
                      type="date"
                      value={formData.tanggalSurat}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Jenis Kelamin *</label>
                    <Select
                      value={formData.jenisKelamin}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, jenisKelamin: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- Pilih Jenis Kelamin --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Gaji Gross *</label>
                    <Input
                      name="gajiGross"
                      value={formData.gajiGross}
                      onChange={handleChange}
                      placeholder="Rp0"
                    />
                  </div>

                  {/* --- RINCIAN JAM KERJA DAN LAMA KONTRAK SEJAJAR --- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rincian Jam Kerja */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium">Rincian Jam Kerja *</label>

                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="relative">
                          <Input
                            name="rincianJamKerja.jamHari"
                            value={formData.rincianJamKerja.jamHari}
                            onChange={handleChange}
                            className="text-right pr-20"
                          />
                          <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500">
                            Jam/hari
                          </span>
                        </div>

                        <div className="relative">
                          <Input
                            name="rincianJamKerja.jamMinggu"
                            value={formData.rincianJamKerja.jamMinggu}
                            onChange={handleChange}
                            className="text-right pr-24"
                          />
                          <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500">
                            Jam/minggu
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lama Kontrak */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium">Lama Kontrak</label>

                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="relative">
                          <Input
                            name="lamaKontrak.bulan"
                            value={formData.lamaKontrak.bulan}
                            onChange={handleChange}
                            className="text-right pr-14"
                          />
                          <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500">
                            Bulan
                          </span>
                        </div>

                        <div className="relative">
                          <Input
                            name="lamaKontrak.tahun"
                            value={formData.lamaKontrak.tahun}
                            onChange={handleChange}
                            className="text-right pr-14"
                          />
                          <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500">
                            Tahun
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* --- BAGIAN TUNJANGAN --- */}
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">Tunjangan</label>

                {/* Tombol "Tambah Tunjangan" diubah menjadi warna biru */}
                <Button
                  type="button"
                  variant="default" // Ini akan memberikan warna biru sesuai tema UI Anda
                  className="mt-2"
                  onClick={handleAddTunjangan}
                >
                  + Tambah Tunjangan
                </Button>

                {formData.tunjangan.map((tunjangan, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Input
                      className="flex-1"
                      placeholder="Nama Tunjangan"
                      value={tunjangan.nama}
                      onChange={(e) => handleNamaTunjanganChange(index, e.target.value)}
                    />

                    <Input
                      className="flex-1"
                      placeholder="Nominal"
                      value={tunjangan.nominal}
                      onChange={(e) => handleNominalChange(index, e.target.value)}
                    />

                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveTunjangan(index)}>
                      -
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Dialog.Close asChild>
                  <Button variant="outline">Batal</Button>
                </Dialog.Close>

                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  Simpan
                </Button>
              </div>
            </form>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}