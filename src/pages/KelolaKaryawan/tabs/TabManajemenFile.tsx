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

const TabManajemenFile = ({ data }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<any>(null);
  
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

  useEffect(() => {
    if (data) {
      const initialData = {
        ktp: { file: null, preview: '', nomor: data.nomorKTP || '' },
        kk: { file: null, preview: '', nomor: data.noKK || '' },
        npwp: { file: null, preview: '', nomor: data.nomorNPWP || '' },
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
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: { ...prev[type], file, preview },
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
    console.log('Saving documents:', formData);
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
          
          {/* Upload KTP */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload KTP</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.ktp}
                onChange={(e) => handleFileChange('ktp', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('ktp')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.ktp.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.ktp.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.ktp.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('ktp')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.ktp.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'KTP', preview: formData.ktp.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat KTP
              </Button>
            )}
          </div>

          {/* Nomor KTP */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Nomor KTP <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="32xxxxxx"
              value={formData.ktp.nomor}
              onChange={(e) => handleNomorChange('ktp', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload Kartu Keluarga */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload Kartu Keluarga</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.kk}
                onChange={(e) => handleFileChange('kk', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('kk')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.kk.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.kk.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.kk.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('kk')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.kk.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'Kartu Keluarga', preview: formData.kk.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Kartu Keluarga
              </Button>
            )}
          </div>

          {/* Nomor Kartu Keluarga */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor Kartu Keluarga</Label>
            <Input
              placeholder="Masukkan No KK"
              value={formData.kk.nomor}
              onChange={(e) => handleNomorChange('kk', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload NPWP */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload NPWP</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.npwp}
                onChange={(e) => handleFileChange('npwp', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('npwp')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.npwp.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.npwp.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.npwp.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('npwp')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.npwp.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'NPWP', preview: formData.npwp.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat NPWP
              </Button>
            )}
          </div>

          {/* Nomor NPWP */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor NPWP</Label>
            {isEditing ? (
              <NPWPInput
                value={formData.npwp.nomor}
                onChange={(value: string) => handleNomorChange('npwp', value)}
              />
            ) : (
              <div className="flex gap-1">
                {formData.npwp.nomor.split('').map((char: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-8 h-10 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50 text-sm font-medium"
                  >
                    {char}
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 20 - formData.npwp.nomor.length) }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="w-8 h-10 border border-gray-200 rounded-md bg-gray-50"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upload KPJ */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload KPJ</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.kpj}
                onChange={(e) => handleFileChange('kpj', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('kpj')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.kpj.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.kpj.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.kpj.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('kpj')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.kpj.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'KPJ', preview: formData.kpj.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat KPJ
              </Button>
            )}
          </div>

          {/* Nomor KPJ */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor KPJ</Label>
            <Input
              placeholder="Masukan Nomor KPJ"
              value={formData.kpj.nomor}
              onChange={(e) => handleNomorChange('kpj', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload JKN */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload JKN</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.jkn}
                onChange={(e) => handleFileChange('jkn', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('jkn')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.jkn.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.jkn.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.jkn.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('jkn')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.jkn.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'JKN', preview: formData.jkn.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat JKN
              </Button>
            )}
          </div>

          {/* Nomor JKN */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nomor JKN</Label>
            <Input
              placeholder="Masukan Nomor JKN"
              value={formData.jkn.nomor}
              onChange={(e) => handleNomorChange('jkn', e.target.value)}
              disabled={!isEditing}
              className="bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Upload CV */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload CV</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.cv}
                onChange={(e) => handleFileChange('cv', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('cv')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.cv.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.cv.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.cv.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('cv')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.cv.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'CV', preview: formData.cv.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat CV
              </Button>
            )}
          </div>

          {/* Upload Dokumen Lainnya */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload Dokumen lainnya</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRefs.lainnya}
                onChange={(e) => handleFileChange('lainnya', e)}
                accept="image/*,.pdf"
                disabled={!isEditing}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => triggerFileInput('lainnya')}
                disabled={!isEditing}
                className="shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File
              </Button>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
                {formData.lainnya.file ? (
                  <>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{formData.lainnya.file.name}</span>
                  </>
                ) : (
                  'Tidak ada file yang dipilih'
                )}
              </div>
              {isEditing && formData.lainnya.file && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFile('lainnya')}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.lainnya.file && (
              <Button
                type="button"
                size="sm"
                onClick={() => setViewingDoc({ type: 'Dokumen Lainnya', preview: formData.lainnya.preview })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Dokumen Lainnya
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

export default TabManajemenFile;

// ================= NPWP FORMATTED INPUT =================
const NPWPInput = ({ value, onChange }: any) => {
  const formatNPWP = (val: string) => {
    const numbers = val.replace(/\D/g, '').slice(0, 16);
    let formatted = '';
    
    if (numbers.length > 0) {
      formatted = numbers.slice(0, 2);
      if (numbers.length > 2) formatted += '.' + numbers.slice(2, 5);
      if (numbers.length > 5) formatted += '.' + numbers.slice(5, 8);
      if (numbers.length > 8) formatted += '.' + numbers.slice(8, 9);
      if (numbers.length > 9) formatted += '-' + numbers.slice(9, 12);
      if (numbers.length > 12) formatted += '.' + numbers.slice(12, 16);
    }
    
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNPWP(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      placeholder="00.000.000.0-000.000"
      value={value}
      onChange={handleChange}
      className="bg-white"
      maxLength={20}
    />
  );
};