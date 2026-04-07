import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Upload, X } from 'lucide-react';

interface PinjamanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const PinjamanModal = ({ isOpen, onClose, onSave }: PinjamanModalProps) => {
  const [jumlahPinjaman, setJumlahPinjaman] = useState('');
  const [tujuanPinjaman, setTujuanPinjaman] = useState('');
  const [termin, setTermin] = useState('');
  const [skemaPembayaran, setSkemaPembayaran] = useState<'gajian' | 'luar_gajian'>('gajian');
  const [tanggalPotong, setTanggalPotong] = useState('');
  const [ulangSetiapBulanGajian, setUlangSetiapBulanGajian] = useState(true);
  const [ulangSetiapBulan, setUlangSetiapBulan] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Data karyawan (nanti bisa diambil dari props atau context)
  const karyawanData = {
    id: 'EMP001',
    nama: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer'
  };

  // Hitung simulasi cicilan
  const hitungCicilan = () => {
    const jumlah = parseFloat(jumlahPinjaman.replace(/\./g, '')) || 0;
    const bulan = parseInt(termin) || 12;
    const cicilan = jumlah / bulan;
    return cicilan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleAjukan = () => {
    const data = {
      karyawan: karyawanData,
      jumlahPinjaman,
      tujuanPinjaman,
      termin,
      skemaPembayaran,
      tanggalPotong: skemaPembayaran === 'gajian' ? '25' : tanggalPotong,
      ulangSetiapBulan: skemaPembayaran === 'gajian' ? ulangSetiapBulanGajian : ulangSetiapBulan,
      cicilan: hitungCicilan(),
      file: uploadedFile
    };
    onSave(data);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
        
        {/* Modal Content dengan struktur yang lebih baik */}
        <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-3xl rounded-lg shadow-lg focus:outline-none max-h-[85vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
            <Dialog.Title className="text-2xl font-bold text-gray-900">Ajukan Pinjaman</Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-200"
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Informasi Karyawan */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">ID Karyawan</Label>
                  <Input
                    value={karyawanData.id}
                    disabled
                    className="bg-gray-300 border-gray-400 text-black font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Nama Karyawan</Label>
                  <Input
                    value={karyawanData.nama}
                    disabled
                    className="bg-gray-300 border-gray-400 text-black font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Divisi</Label>
                  <Input
                    value={karyawanData.divisi}
                    disabled
                    className="bg-gray-300 border-gray-400 text-black font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Jabatan</Label>
                  <Input
                    value={karyawanData.jabatan}
                    disabled
                    className="bg-gray-300 border-gray-400 text-black font-semibold"
                  />
                </div>
              </div>

              {/* Detail Pinjaman */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah Pinjaman</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">Rp</span>
                    <Input
                      placeholder="5.000.000"
                      value={jumlahPinjaman}
                      onChange={(e) => setJumlahPinjaman(e.target.value)}
                      className="pl-12 bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Tujuan Pinjaman</Label>
                  <Input
                    placeholder="Contoh: Renovasi rumah"
                    value={tujuanPinjaman}
                    onChange={(e) => setTujuanPinjaman(e.target.value)}
                    className="bg-white border-gray-300"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Termin</Label>
                  <Select value={termin} onValueChange={setTermin}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue placeholder="Pilih Termin" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      <SelectItem value="3">3 bulan</SelectItem>
                      <SelectItem value="6">6 bulan</SelectItem>
                      <SelectItem value="12">12 bulan</SelectItem>
                      <SelectItem value="18">18 bulan</SelectItem>
                      <SelectItem value="24">24 bulan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Skema Pembayaran */}
              <div className="pt-4 border-t border-gray-200">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Skema Pembayaran</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        checked={skemaPembayaran === 'gajian'}
                        onChange={() => setSkemaPembayaran('gajian')}
                        className="mt-1 h-4 w-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">Potong saat Gajian</span>
                        <p className="text-xs text-gray-500 mt-1 mb-3">
                          Dipotong setiap tanggal 25<br />
                          (Mengikuti jadwal payroll perusahaan)
                        </p>
                        {skemaPembayaran === 'gajian' && (
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            <span className="text-xs text-gray-600">Ulang setiap bulan</span>
                            <button
                              type="button"
                              onClick={() => setUlangSetiapBulanGajian(!ulangSetiapBulanGajian)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                ulangSetiapBulanGajian ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  ulangSetiapBulanGajian ? 'translate-x-5' : 'translate-x-0.5'
                                }`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        checked={skemaPembayaran === 'luar_gajian'}
                        onChange={() => setSkemaPembayaran('luar_gajian')}
                        className="mt-1 h-4 w-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">Potong di Luar Gajian</span>
                        {skemaPembayaran === 'luar_gajian' && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1">
                                <Input
                                  type="date"
                                  value={tanggalPotong}
                                  onChange={(e) => setTanggalPotong(e.target.value)}
                                  className="h-8 text-xs bg-white border-gray-300"
                                />
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs text-gray-600 whitespace-nowrap">Ulang setiap bulan</span>
                                <button
                                  type="button"
                                  onClick={() => setUlangSetiapBulan(!ulangSetiapBulan)}
                                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                    ulangSetiapBulan ? 'bg-blue-600' : 'bg-gray-300'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      ulangSetiapBulan ? 'translate-x-5' : 'translate-x-0.5'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Simulasi Cicilan */}
              {jumlahPinjaman && termin && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900">Simulasi Cicilan</h4>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">Cicilan:</span> {hitungCicilan()} / bulan
                          </p>
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">Potong:</span> tiap tanggal {skemaPembayaran === 'gajian' ? '25' : tanggalPotong}
                          </p>
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">Mulai:</span> {new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Upload File */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Upload <span className="text-gray-500 font-normal">(Opsional)</span>
                </h3>
                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Upload className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Upload className="h-5 w-5" />
                      <span className="text-sm">Upload file</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons - Fixed */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            <Dialog.Close asChild>
              <Button
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button
                onClick={handleAjukan}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ajukan
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};