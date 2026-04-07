import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, X, Edit, Upload, Eye, Trash2, FileText } from 'lucide-react';

const TabIdentitasKendaraan = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<any>(null);

  const [formData, setFormData] = useState({
    sim: { file: null as File | null, preview: '', nomor: '' },
    stnk: { file: null as File | null, preview: '', nomor: '' },
    kendaraanDepan: { file: null as File | null, preview: '' },
    kendaraanBelakang: { file: null as File | null, preview: '' },
    kendaraanSamping: { file: null as File | null, preview: '' },
  });

  const [originalData, setOriginalData] = useState(formData);

  const fileInputRefs = {
    sim: useRef<HTMLInputElement>(null),
    stnk: useRef<HTMLInputElement>(null),
    kendaraanDepan: useRef<HTMLInputElement>(null),
    kendaraanBelakang: useRef<HTMLInputElement>(null),
    kendaraanSamping: useRef<HTMLInputElement>(null),
  };

  // Dummy data dengan file upload
  const dummyFiles = {
    sim: {
      name: 'SIM_Andi_Prasetyo.jpg',
      preview: 'https://images.unsplash.com/photo-1544256272-1880d4c8c2b3?w=400',
      nomor: 'B1234567'
    },
    stnk: {
      name: 'STNK_D1234ABC.jpg',
      preview: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
      nomor: 'D1234ABC'
    },
    kendaraanDepan: {
      name: 'Kendaraan_Depan.jpg',
      preview: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
    },
    kendaraanBelakang: {
      name: 'Kendaraan_Belakang.jpg',
      preview: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400'
    },
    kendaraanSamping: {
      name: 'Kendaraan_Samping.jpg',
      preview: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'
    }
  };

  useEffect(() => {
    if (data) {
      const initialData = {
        sim: {
          file: null,
          preview: dummyFiles.sim.preview,
          nomor: data.nomorSIM || dummyFiles.sim.nomor
        },
        stnk: {
          file: null,
          preview: dummyFiles.stnk.preview,
          nomor: data.nomorSTNK || dummyFiles.stnk.nomor
        },
        kendaraanDepan: {
          file: null,
          preview: dummyFiles.kendaraanDepan.preview
        },
        kendaraanBelakang: {
          file: null,
          preview: dummyFiles.kendaraanBelakang.preview
        },
        kendaraanSamping: {
          file: null,
          preview: dummyFiles.kendaraanSamping.preview
        },
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [data]);

  const handleFileChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          file,
          preview,
          name: file.name
        },
      }));
    }
  };

  const handleRemoveFile = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { file: null, preview: '', nomor: prev[type].nomor },
    }));
  };

  const handleNomorChange = (type: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], nomor: value },
    }));
  };

  const triggerFileInput = (type: string) => {
    fileInputRefs[type].current?.click();
  };

  const handleSave = () => {
    console.log('Saving vehicle documents:', formData);
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Upload SIM */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload SIM</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.sim}
                onChange={(e) => handleFileChange('sim', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('sim')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.sim.preview ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">SIM_Andi_Prasetyo.jpg</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.sim.preview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('sim')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.sim.preview && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'SIM', preview: formData.sim.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat SIM
              </Button>
            )}
          </div>

          {/* Nomor SIM */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor SIM</Label>
            <Input
              placeholder="Nomor SIM"
              value={formData.sim.nomor}
              onChange={(e) => handleNomorChange('sim', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload STNK */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload STNK</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.stnk}
                onChange={(e) => handleFileChange('stnk', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('stnk')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.stnk.preview ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">STNK_D1234ABC.jpg</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.stnk.preview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('stnk')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.stnk.preview && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'STNK', preview: formData.stnk.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat STNK
              </Button>
            )}
          </div>

          {/* Nomor STNK */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor STNK</Label>
            <Input
              placeholder="Nomor STNK"
              value={formData.stnk.nomor}
              onChange={(e) => handleNomorChange('stnk', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload Gambar Kendaraan Depan */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload Gambar Kendaraan Depan</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.kendaraanDepan}
                onChange={(e) => handleFileChange('kendaraanDepan', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('kendaraanDepan')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.kendaraanDepan.preview ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">Kendaraan_Depan.jpg</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.kendaraanDepan.preview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('kendaraanDepan')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.kendaraanDepan.preview && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'Kendaraan Depan', preview: formData.kendaraanDepan.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Gambar
              </Button>
            )}
          </div>

          {/* Upload Gambar Kendaraan Belakang */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload Gambar Kendaraan Belakang</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.kendaraanBelakang}
                onChange={(e) => handleFileChange('kendaraanBelakang', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('kendaraanBelakang')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.kendaraanBelakang.preview ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">Kendaraan_Belakang.jpg</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.kendaraanBelakang.preview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('kendaraanBelakang')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.kendaraanBelakang.preview && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'Kendaraan Belakang', preview: formData.kendaraanBelakang.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Gambar
              </Button>
            )}
          </div>

          {/* Upload Gambar Kendaraan Samping */}
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-medium">Upload Gambar Kendaraan Samping</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.kendaraanSamping}
                onChange={(e) => handleFileChange('kendaraanSamping', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('kendaraanSamping')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.kendaraanSamping.preview ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">Kendaraan_Samping.jpg</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.kendaraanSamping.preview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('kendaraanSamping')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.kendaraanSamping.preview && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'Kendaraan Samping', preview: formData.kendaraanSamping.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Gambar
              </Button>
            )}
          </div>

        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        )}

        {/* Edit Button */}
        {!isEditing && (
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        )}

        {/* View Document Dialog */}
        {viewingDoc && (
          <Dialog open={!!viewingDoc} onOpenChange={() => setViewingDoc(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Dokumen {viewingDoc.type}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {viewingDoc.preview && (
                  <img
                    src={viewingDoc.preview}
                    alt="Document preview"
                    className="w-full h-auto rounded-md"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default TabIdentitasKendaraan;