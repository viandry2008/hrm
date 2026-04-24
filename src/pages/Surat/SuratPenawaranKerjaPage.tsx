import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';
import { Search, Eye, Trash2, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <TableCard icon={FileText} title="Data Surat Penawaran">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari nomor surat, nama, posisi..."
          showEntriesValue={itemsPerPage.toString()}
          onShowEntriesChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          onAddClick={handleOpenModal}
          addButtonLabel="Buat Surat"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nomor Surat</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Posisi</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Gaji</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tnj</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tanggal</TableHead>
                <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length > 0 ? (
                paginated.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.noSurat}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.posisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatCurrency(item.gaji)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap text-center">
                      {item.tunjangan ? '✔' : '-'}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDate(item.tanggal)}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700"
                          title="Download"
                          onClick={() => handleDownloadPDF(item)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
                          onClick={() => handleDelete(item.no)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          pagination={{ current_page: currentPage, last_page: totalPages, per_page: itemsPerPage, total: filtered.length }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          items={paginated}
        />
      </TableCard>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Surat Penawaran Kerja</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmitModal} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <select
                      name="jenisKelamin"
                      value={formData.jenisKelamin}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">-- Pilih Jenis Kelamin --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Rincian Jam Kerja *</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          name="rincianJamKerja.jamHari"
                          value={formData.rincianJamKerja.jamHari}
                          onChange={handleChange}
                          placeholder="Jam/hari"
                        />
                        <span className="text-sm text-gray-500">Jam/hari</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          name="rincianJamKerja.jamMinggu"
                          value={formData.rincianJamKerja.jamMinggu}
                          onChange={handleChange}
                          placeholder="Jam/minggu"
                        />
                        <span className="text-sm text-gray-500">Jam/minggu</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Lama Kontrak</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          name="lamaKontrak.bulan"
                          value={formData.lamaKontrak.bulan}
                          onChange={handleChange}
                          placeholder="Bulan"
                        />
                        <span className="text-sm text-gray-500">Bulan</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          name="lamaKontrak.tahun"
                          value={formData.lamaKontrak.tahun}
                          onChange={handleChange}
                          placeholder="Tahun"
                        />
                        <span className="text-sm text-gray-500">Tahun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tunjangan</label>
                <Button type="button" variant="default" className="mt-2" onClick={handleAddTunjangan}>
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

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
