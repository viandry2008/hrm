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
import { Check, X, Edit, Upload, Eye, Trash2, FileText, Loader2 } from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';
import { useUpdateEmployee } from '@/api/employee/employee.query';

// ─── Reusable FileUploadInput ──────────────────────────────────────────────────
interface FileUploadInputProps {
  label: string;
  fieldKey: string;
  fileData: { file: File | null; preview: string; name?: string };
  isEditing: boolean;
  viewLabel?: string;
  colSpan?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (key: string) => void;
  onView: (type: string, preview: string) => void;
}

const FileUploadInput = ({
  label, fieldKey, fileData, isEditing, viewLabel, colSpan = false,
  inputRef, onFileChange, onRemove, onView,
}: FileUploadInputProps) => (
  <div className={`space-y-2${colSpan ? ' md:col-span-2' : ''}`}>
    <Label className="text-sm font-medium">{label}</Label>
    <div className="flex gap-2">
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => onFileChange(fieldKey, e)}
        accept="image/*,.pdf"
        disabled={!isEditing}
        className="hidden"
      />
      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={!isEditing} className="shrink-0">
        <Upload className="w-4 h-4 mr-2" />
        {fileData.file || fileData.preview ? 'Ubah File' : 'Pilih File'}
      </Button>
      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
        {fileData.file ? (
          <><FileText className="w-4 h-4 shrink-0" /><span className="truncate">{fileData.file.name}</span></>
        ) : fileData.preview ? (
          <><FileText className="w-4 h-4 shrink-0" /><span className="truncate">{fileData.preview.split('/').pop()}</span></>
        ) : 'Tidak ada file yang dipilih'}
      </div>
      {isEditing && fileData.file && (
        <Button type="button" variant="outline" size="sm" onClick={() => onRemove(fieldKey)} className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
    {(fileData.file || fileData.preview) && (
      <Button type="button" size="sm" onClick={() => onView(viewLabel ?? label, fileData.preview)} className="bg-blue-600 hover:bg-blue-700 text-white">
        <Eye className="w-4 h-4 mr-2" />
        Lihat {viewLabel ?? label}
      </Button>
    )}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const TabIdentitasKendaraan = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ type: string; preview: string } | null>(null);

  const emptyState = {
    nomorSIM: '',
    nomorSTNK: '',
    sim: { file: null as File | null, preview: '', name: undefined as string | undefined },
    stnk: { file: null as File | null, preview: '', name: undefined as string | undefined },
    kendaraanDepan: { file: null as File | null, preview: '', name: undefined as string | undefined },
    kendaraanBelakang: { file: null as File | null, preview: '', name: undefined as string | undefined },
    kendaraanSamping: { file: null as File | null, preview: '', name: undefined as string | undefined },
  };

  const [formData, setFormData] = useState(emptyState);
  const [originalData, setOriginalData] = useState(emptyState);

  const fileInputRefs = {
    sim: useRef<HTMLInputElement>(null),
    stnk: useRef<HTMLInputElement>(null),
    kendaraanDepan: useRef<HTMLInputElement>(null),
    kendaraanBelakang: useRef<HTMLInputElement>(null),
    kendaraanSamping: useRef<HTMLInputElement>(null),
  };

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

  useEffect(() => {
    if (data) {
      const vehicle = data.raw?.vehicles?.[0];
      const loaded = {
        nomorSIM: data.nomorSIM || data.raw?.sim_number || '',
        nomorSTNK: data.nomorSTNK || data.raw?.stnk_number || '',
        sim: { file: null, preview: vehicle?.sim_file || '', name: undefined },
        stnk: { file: null, preview: vehicle?.stnk_file || '', name: undefined },
        kendaraanDepan: { file: null, preview: vehicle?.vehicle_front_image || '', name: undefined },
        kendaraanBelakang: { file: null, preview: vehicle?.vehicle_back_image || '', name: undefined },
        kendaraanSamping: { file: null, preview: vehicle?.vehicle_side_image || '', name: undefined },
      };
      setFormData(loaded);
      setOriginalData(loaded);
    }
  }, [data]);

  const handleFileChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: { ...prev[type], file, preview: URL.createObjectURL(file), name: file.name },
      }));
    }
  };

  const handleRemoveFile = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], file: null, preview: '', name: undefined },
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const payload = new FormData();

    // Kirim nomor selalu
    payload.append('sim_number', formData.nomorSIM);
    payload.append('stnk_number', formData.nomorSTNK);

    // File — hanya kirim jika ada file baru
    if (formData.sim.file) payload.append('sim_file', formData.sim.file);
    if (formData.stnk.file) payload.append('stnk_file', formData.stnk.file);
    if (formData.kendaraanDepan.file) payload.append('vehicle_front_image', formData.kendaraanDepan.file);
    if (formData.kendaraanBelakang.file) payload.append('vehicle_back_image', formData.kendaraanBelakang.file);
    if (formData.kendaraanSamping.file) payload.append('vehicle_side_image', formData.kendaraanSamping.file);

    updateEmployee(payload, {
      onSuccess: () => {
        setOriginalData(formData);
        setIsEditing(false);
      },
    });
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
            id="nomorSIM"
            placeholder="Nomor SIM"
            value={formData.nomorSIM ?? ''}
            onChange={(v) => handleInputChange('nomorSIM', v)}
            disabled={!isEditing}
          />

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
            id="nomorSTNK"
            placeholder="Nomor STNK"
            value={formData.nomorSTNK ?? ''}
            onChange={(v) => handleInputChange('nomorSTNK', v)}
            disabled={!isEditing}
          />

          <FileUploadInput
            label="Upload Gambar Kendaraan Depan"
            viewLabel="Gambar Depan"
            fieldKey="kendaraanDepan"
            fileData={formData.kendaraanDepan}
            isEditing={isEditing}
            inputRef={fileInputRefs.kendaraanDepan}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />

          <FileUploadInput
            label="Upload Gambar Kendaraan Belakang"
            viewLabel="Gambar Belakang"
            fieldKey="kendaraanBelakang"
            fileData={formData.kendaraanBelakang}
            isEditing={isEditing}
            inputRef={fileInputRefs.kendaraanBelakang}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })}
          />

          <FileUploadInput
            label="Upload Gambar Kendaraan Samping"
            viewLabel="Gambar Samping"
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

        {isEditing ? (
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2" disabled={isPending}>
              <X className="w-4 h-4" />Batal
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Simpan
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button size="sm" onClick={() => setIsEditing(true)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="w-4 h-4" />Edit
            </Button>
          </div>
        )}

        {viewingDoc && (
          <Dialog open={!!viewingDoc} onOpenChange={() => setViewingDoc(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader><DialogTitle>Dokumen {viewingDoc.type}</DialogTitle></DialogHeader>
              <div className="mt-4">
                <img src={viewingDoc.preview} alt="Document preview" className="w-full h-auto rounded-md" />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default TabIdentitasKendaraan;