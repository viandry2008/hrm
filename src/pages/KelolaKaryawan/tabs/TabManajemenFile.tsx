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

const formatNPWP = (digits: string) => {
  if (!digits) return '';
  let formatted = '';
  const separators: Record<number, string> = { 1: '.', 4: '.', 7: '.', 8: '-', 11: '.' };
  for (let i = 0; i < digits.length; i += 1) {
    formatted += digits[i];
    if (separators[i]) formatted += separators[i];
  }
  return formatted;
};

// ─── Reusable FileUploadInput ──────────────────────────────────────────────────
interface FileUploadInputProps {
  label: string;
  fieldKey: string;
  fileData: { file: File | null; preview: string };
  isEditing: boolean;
  viewLabel?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (key: string) => void;
  onView: (type: string, preview: string) => void;
}

const FileUploadInput = ({
  label, fieldKey, fileData, isEditing, viewLabel,
  inputRef, onFileChange, onRemove, onView,
}: FileUploadInputProps) => (
  <div className="space-y-2">
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
        Pilih File
      </Button>
      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
        {fileData.file ? (
          <><FileText className="w-4 h-4 shrink-0" /><span className="truncate">{fileData.file.name}</span></>
        ) : 'Tidak ada file yang dipilih'}
      </div>
      {isEditing && fileData.file && (
        <Button type="button" variant="outline" size="sm" onClick={() => onRemove(fieldKey)} className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
    {fileData.file && (
      <Button type="button" size="sm" onClick={() => onView(viewLabel ?? label, fileData.preview)} className="bg-blue-600 hover:bg-blue-700 text-white">
        <Eye className="w-4 h-4 mr-2" />
        Lihat {viewLabel ?? label}
      </Button>
    )}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const TabManajemenFile = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ type: string; preview: string } | null>(null);

  const [formData, setFormData] = useState({
    ktp: { file: null as File | null, preview: '', nomor: '' },
    kk: { file: null as File | null, preview: '', nomor: '' },
    npwp: { file: null as File | null, preview: '', nomor: '' },
    kpj: { file: null as File | null, preview: '', nomor: '' },
    jkn: { file: null as File | null, preview: '', nomor: '' },
    cv: { file: null as File | null, preview: '' },
    lainnya: { file: null as File | null, preview: '' },
  });
  const [originalData, setOriginalData] = useState(formData);

  const fileInputRefs = {
    ktp: useRef<HTMLInputElement>(null),
    kk: useRef<HTMLInputElement>(null),
    npwp: useRef<HTMLInputElement>(null),
    kpj: useRef<HTMLInputElement>(null),
    jkn: useRef<HTMLInputElement>(null),
    cv: useRef<HTMLInputElement>(null),
    lainnya: useRef<HTMLInputElement>(null),
  };

  const { mutate: updateEmployee, isPending } = useUpdateEmployee(data?.employeeId);

  useEffect(() => {
    if (data) {
      const initialData = {
        ktp: { file: null, preview: '', nomor: data.nomorKTP || '' },
        kk: { file: null, preview: '', nomor: data.noKK || '' },
        npwp: { file: null, preview: '', nomor: (data.nomorNPWP || '').replace(/\D/g, '').slice(0, 15) },
        kpj: { file: null, preview: '', nomor: data.nomorKPJ || '' },
        jkn: { file: null, preview: '', nomor: data.nomorJKN || '' },
        cv: { file: null, preview: '' },
        lainnya: { file: null, preview: '' },
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [data]);

  const handleFileChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: { ...prev[type], file, preview: URL.createObjectURL(file) },
      }));
    }
  };

  const handleRemoveFile = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], file: null, preview: '' },
    }));
  };

  const handleNomorChange = (type: string, value: string) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], nomor: value } }));
  };

  const handleSave = () => {
    const payload = new FormData();

    // Nomor dokumen — selalu kirim
    payload.append('document_type', 'ktp');
    payload.append('document_number', formData.ktp.nomor);
    payload.append('family_card_number', formData.kk.nomor);
    payload.append('tax_number', formData.npwp.nomor);
    payload.append('bpjstk_number', formData.kpj.nomor);
    payload.append('bpjs_number', formData.jkn.nomor);

    // File — hanya kirim jika ada file baru dipilih
    if (formData.ktp.file) payload.append('document_file', formData.ktp.file);
    if (formData.cv.file) payload.append('cv_file', formData.cv.file);
    if (formData.lainnya.file) payload.append('other_file', formData.lainnya.file);

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

          <FileUploadInput label="Upload KTP" fieldKey="ktp" fileData={formData.ktp} isEditing={isEditing} viewLabel="KTP"
            inputRef={fileInputRefs.ktp} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />
          <FormInput label="Nomor KTP" required placeholder="32xxxxxx" value={formData.ktp.nomor}
            onChange={(v) => handleNomorChange('ktp', v)} disabled={!isEditing} />

          <FileUploadInput label="Upload Kartu Keluarga" fieldKey="kk" fileData={formData.kk} isEditing={isEditing} viewLabel="Kartu Keluarga"
            inputRef={fileInputRefs.kk} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />
          <FormInput label="Nomor Kartu Keluarga" placeholder="Masukkan No KK" value={formData.kk.nomor}
            onChange={(v) => handleNomorChange('kk', v)} disabled={!isEditing} />

          <FileUploadInput label="Upload NPWP" fieldKey="npwp" fileData={formData.npwp} isEditing={isEditing} viewLabel="NPWP"
            inputRef={fileInputRefs.npwp} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />
          <FormInput label="Nomor NPWP" placeholder="12.345.678.9-012.345"
            value={formatNPWP(formData.npwp.nomor)}
            onChange={(v) => handleNomorChange('npwp', v.replace(/\D/g, '').slice(0, 15))}
            disabled={!isEditing} />

          <FileUploadInput label="Upload KPJ" fieldKey="kpj" fileData={formData.kpj} isEditing={isEditing} viewLabel="KPJ"
            inputRef={fileInputRefs.kpj} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />
          <FormInput label="Nomor KPJ" placeholder="Masukan Nomor KPJ" value={formData.kpj.nomor}
            onChange={(v) => handleNomorChange('kpj', v)} disabled={!isEditing} />

          <FileUploadInput label="Upload JKN" fieldKey="jkn" fileData={formData.jkn} isEditing={isEditing} viewLabel="JKN"
            inputRef={fileInputRefs.jkn} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />
          <FormInput label="Nomor JKN" placeholder="Masukan Nomor JKN" value={formData.jkn.nomor}
            onChange={(v) => handleNomorChange('jkn', v)} disabled={!isEditing} />

          <FileUploadInput label="Upload CV" fieldKey="cv" fileData={formData.cv} isEditing={isEditing} viewLabel="CV"
            inputRef={fileInputRefs.cv} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />

          <FileUploadInput label="Upload Dokumen Lainnya" fieldKey="lainnya" fileData={formData.lainnya} isEditing={isEditing} viewLabel="Dokumen Lainnya"
            inputRef={fileInputRefs.lainnya} onFileChange={handleFileChange} onRemove={handleRemoveFile}
            onView={(type, preview) => setViewingDoc({ type, preview })} />

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

export default TabManajemenFile;