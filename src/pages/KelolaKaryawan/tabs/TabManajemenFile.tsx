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
const TabManajemenFile = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ type: string; preview: string } | null>(null);

  const [formData, setFormData] = useState({
    ktp: { file: null as File | null, preview: '', name: '', nomor: '' },
    kk: { file: null as File | null, preview: '', name: '', nomor: '' },
    npwp: { file: null as File | null, preview: '', name: '', nomor: '' },
    kpj: { file: null as File | null, preview: '', name: '', nomor: '' },
    jkn: { file: null as File | null, preview: '', name: '', nomor: '' },
    cv: { file: null as File | null, preview: '', name: '' },
    lainnya: { file: null as File | null, preview: '', name: '' },
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
        ktp: { file: null, preview: data.ktpFile || '', name: data.ktpFile?.split('/').pop() || '', nomor: data.nomorKTP || '' },
        kk: { file: null, preview: data.kkFile || '', name: data.kkFile?.split('/').pop() || '', nomor: data.noKK || '' },
        npwp: { file: null, preview: data.npwpFile || '', name: data.npwpFile?.split('/').pop() || '', nomor: (data.nomorNPWP || '').replace(/\D/g, '').slice(0, 15) },
        kpj: { file: null, preview: data.kpjFile || '', name: data.kpjFile?.split('/').pop() || '', nomor: data.nomorKPJ || '' },
        jkn: { file: null, preview: data.jknFile || '', name: data.jknFile?.split('/').pop() || '', nomor: data.nomorJKN || '' },
        cv: { file: null, preview: data.cvFile || '', name: data.cvFile?.split('/').pop() || '' },
        lainnya: { file: null, preview: data.lainnyaFile || '', name: data.lainnyaFile?.split('/').pop() || '' },
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
        [type]: { ...prev[type], file, preview: URL.createObjectURL(file), name: file.name },
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
    const appendIfValue = (key: string, value: any) => {
      if (value !== undefined && value !== null && value !== "") {
        payload.append(key, String(value));
      }
    };

    const appendDocument = (index: number, type: string, file?: File | null, number?: string) => {
      if (!file && !number) return;
      payload.append(`documents[${index}][document_type]`, type);
      if (number) {
        payload.append(`documents[${index}][document_number]`, String(number));
      }
      if (file) {
        payload.append(`documents[${index}][document_file]`, file);
      }
    };

    appendIfValue('national_id', formData.ktp.nomor);
    appendIfValue('family_card_number', formData.kk.nomor);
    appendIfValue('tax_number', formData.npwp.nomor);
    appendIfValue('bpjstk_number', formData.kpj.nomor);
    appendIfValue('bpjs_number', formData.jkn.nomor);

    let documentIndex = 0;
    appendDocument(documentIndex++, 'ktp', formData.ktp.file, formData.ktp.nomor);
    appendDocument(documentIndex++, 'kk', formData.kk.file, formData.kk.nomor);
    appendDocument(documentIndex++, 'npwp', formData.npwp.file, formData.npwp.nomor);
    appendDocument(documentIndex++, 'kpj', formData.kpj.file, formData.kpj.nomor);
    appendDocument(documentIndex++, 'jkn', formData.jkn.file, formData.jkn.nomor);
    appendDocument(documentIndex++, 'cv', formData.cv.file);
    appendDocument(documentIndex++, 'lainnya', formData.lainnya.file);

    // File — hanya kirim jika ada file baru dipilih (array documents handles update requests)

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