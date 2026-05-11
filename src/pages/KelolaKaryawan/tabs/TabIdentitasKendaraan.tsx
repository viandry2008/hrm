import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, X, Edit, Upload, Eye, Trash2, FileText } from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';

// ─── Reusable FileUploadInput Component ───────────────────────────────────────
interface FileUploadInputProps {
  label: string;
  fieldKey: string;
  fileData: { file: File | null; preview: string; name?: string };
  isEditing: boolean;
  viewLabel?: string;
  accept?: string;
  colSpan?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (key: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (key: string) => void;
  onView: (type: string, preview: string) => void;
}

const FileUploadInput = ({
  label,
  fieldKey,
  fileData,
  isEditing,
  viewLabel,
  accept = 'image/*,.pdf',
  colSpan = false,
  inputRef,
  onFileChange,
  onRemove,
  onView,
}: FileUploadInputProps) => {
  const displayName = fileData.file?.name ?? fileData.name ?? null;

  return (
    <div className={`space-y-2${colSpan ? ' md:col-span-2' : ''}`}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => onFileChange(fieldKey, e)}
          accept={accept}
          disabled={!isEditing}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={!isEditing}
          className="shrink-0"
        >
          <Upload className="w-4 h-4 mr-2" />
          Pilih File
        </Button>
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
          {displayName ? (
            <>
              <FileText className="w-4 h-4 shrink-0" />
              <span className="truncate">{displayName}</span>
            </>
          ) : (
            'Tidak ada file yang dipilih'
          )}
        </div>
        {isEditing && displayName && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRemove(fieldKey)}
            className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      {fileData.preview && (
        <Button
          type="button"
          size="sm"
          onClick={() => onView(viewLabel ?? label, fileData.preview)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          Lihat {viewLabel ?? label}
        </Button>
      )}
    </div>
  );
};

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const dummyFiles = {
  sim: {
    name: 'SIM_Andi_Prasetyo.jpg',
    preview: 'https://images.unsplash.com/photo-1544256272-1880d4c8c2b3?w=400',
    nomor: 'B1234567',
  },
  stnk: {
    name: 'STNK_D1234ABC.jpg',
    preview: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
    nomor: 'D1234ABC',
  },
  kendaraanDepan: {
    name: 'Kendaraan_Depan.jpg',
    preview: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
  },
  kendaraanBelakang: {
    name: 'Kendaraan_Belakang.jpg',
    preview: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
  },
  kendaraanSamping: {
    name: 'Kendaraan_Samping.jpg',
    preview: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
  },
};

// ─── Main Tab Component ────────────────────────────────────────────────────────
const TabIdentitasKendaraan = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ type: string; preview: string } | null>(null);

  const initialState = {
    sim: { file: null as File | null, preview: dummyFiles.sim.preview, name: dummyFiles.sim.name, nomor: dummyFiles.sim.nomor },
    stnk: { file: null as File | null, preview: dummyFiles.stnk.preview, name: dummyFiles.stnk.name, nomor: dummyFiles.stnk.nomor },
    kendaraanDepan: { file: null as File | null, preview: dummyFiles.kendaraanDepan.preview, name: dummyFiles.kendaraanDepan.name },
    kendaraanBelakang: { file: null as File | null, preview: dummyFiles.kendaraanBelakang.preview, name: dummyFiles.kendaraanBelakang.name },
    kendaraanSamping: { file: null as File | null, preview: dummyFiles.kendaraanSamping.preview, name: dummyFiles.kendaraanSamping.name },
  };

  const [formData, setFormData] = useState(initialState);
  const [originalData, setOriginalData] = useState(initialState);

  const fileInputRefs = {
    sim: useRef<HTMLInputElement>(null),
    stnk: useRef<HTMLInputElement>(null),
    kendaraanDepan: useRef<HTMLInputElement>(null),
    kendaraanBelakang: useRef<HTMLInputElement>(null),
    kendaraanSamping: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (data) {
      const loaded = {
        sim: { file: null, preview: dummyFiles.sim.preview, name: dummyFiles.sim.name, nomor: data.nomorSIM || dummyFiles.sim.nomor },
        stnk: { file: null, preview: dummyFiles.stnk.preview, name: dummyFiles.stnk.name, nomor: data.nomorSTNK || dummyFiles.stnk.nomor },
        kendaraanDepan: { file: null, preview: dummyFiles.kendaraanDepan.preview, name: dummyFiles.kendaraanDepan.name },
        kendaraanBelakang: { file: null, preview: dummyFiles.kendaraanBelakang.preview, name: dummyFiles.kendaraanBelakang.name },
        kendaraanSamping: { file: null, preview: dummyFiles.kendaraanSamping.preview, name: dummyFiles.kendaraanSamping.name },
      };
      setFormData(loaded);
      setOriginalData(loaded);
    }
  }, [data]);

  const handleFileChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: { ...prev[type], file, preview, name: file.name },
      }));
    }
  };

  const handleRemoveFile = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], file: null, preview: '', name: undefined },
    }));
  };

  const handleNomorChange = (type: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], nomor: value },
    }));
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

          {/* SIM */}
          <FileUploadInput
            label="Upload SIM"
            viewLabel="SIM"
            fieldKey="sim"
            fileData={formData.sim}
            isEditing={isEditing}
            inputRef={fileInputRefs.sim}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />
          <FormInput
            label="Nomor SIM"
            placeholder="Nomor SIM"
            value={formData.sim.nomor ?? ''}
            onChange={(value) => handleNomorChange('sim', value)}
            disabled={!isEditing}
          />

          {/* STNK */}
          <FileUploadInput
            label="Upload STNK"
            viewLabel="STNK"
            fieldKey="stnk"
            fileData={formData.stnk}
            isEditing={isEditing}
            inputRef={fileInputRefs.stnk}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />
          <FormInput
            label="Nomor STNK"
            placeholder="Nomor STNK"
            value={formData.stnk.nomor ?? ''}
            onChange={(value) => handleNomorChange('stnk', value)}
            disabled={!isEditing}
          />

          {/* Kendaraan Depan */}
          <FileUploadInput
            label="Upload Gambar Kendaraan Depan"
            viewLabel="Gambar"
            fieldKey="kendaraanDepan"
            fileData={formData.kendaraanDepan}
            isEditing={isEditing}
            inputRef={fileInputRefs.kendaraanDepan}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />

          {/* Kendaraan Belakang */}
          <FileUploadInput
            label="Upload Gambar Kendaraan Belakang"
            viewLabel="Gambar"
            fieldKey="kendaraanBelakang"
            fileData={formData.kendaraanBelakang}
            isEditing={isEditing}
            inputRef={fileInputRefs.kendaraanBelakang}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />

          {/* Kendaraan Samping */}
          <FileUploadInput
            label="Upload Gambar Kendaraan Samping"
            viewLabel="Gambar"
            fieldKey="kendaraanSamping"
            fileData={formData.kendaraanSamping}
            isEditing={isEditing}
            colSpan
            inputRef={fileInputRefs.kendaraanSamping}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />

        </div>

        {/* Action Buttons */}
        {isEditing ? (
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Check className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button size="sm" onClick={() => setIsEditing(true)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
                <img
                  src={viewingDoc.preview}
                  alt="Document preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default TabIdentitasKendaraan;