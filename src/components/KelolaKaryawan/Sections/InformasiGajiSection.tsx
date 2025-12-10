import React from "react";
import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InformasiGajiSectionProps {
    formData: any;
    updateForm: (key: string, value: any) => void;
}

const formatRupiah = (value: any) => {
    if (!value) return "";
    const number = typeof value === "number"
        ? value
        : parseInt(value.replace(/[^\d]/g, ""));

    if (isNaN(number)) return "";
    return number.toLocaleString("id-ID");
};

const parseNumber = (value: string) => {
    return parseInt(value.replace(/[^\d]/g, "")) || 0;
};

const InputRp = ({ value, onChange, placeholder }: any) => (
    <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            Rp
        </span>
        <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(parseNumber(e.target.value))}
            className="bg-white text-sm pl-10"
        />
    </div>
);

const InformasiGajiSection: React.FC<InformasiGajiSectionProps> = ({ formData, updateForm }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
                <Wallet className="w-5 h-5" />
                <h3 className="font-semibold">Informasi Gaji</h3>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-6">

                    {/* GAJI POKOK */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Gaji Pokok <span className="text-red-500">*</span></Label>
                        <InputRp
                            value={formatRupiah(formData.gaji_pokok)}
                            onChange={(v: any) => updateForm("gaji_pokok", v)}
                            placeholder="Masukkan gaji pokok"
                        />
                    </div>

                    {/* TUNJANGAN JABATAN */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Tunjangan Jabatan</Label>
                        <InputRp
                            value={formatRupiah(formData.tunjangan_jabatan)}
                            onChange={(v: any) => updateForm("tunjangan_jabatan", v)}
                            placeholder="Masukkan tunjangan jabatan"
                        />
                    </div>

                    {/* TUNJANGAN PROJECT */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Tunjangan Project</Label>
                        <InputRp
                            value={formatRupiah(formData.tunjangan_project)}
                            onChange={(v: any) => updateForm("tunjangan_project", v)}
                            placeholder="Masukkan tunjangan project"
                        />
                    </div>

                    {/* TUNJANGAN MAKAN */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Tunjangan Makan</Label>
                        <InputRp
                            value={formatRupiah(formData.tunjangan_makan)}
                            onChange={(v: any) => updateForm("tunjangan_makan", v)}
                            placeholder="Masukkan tunjangan makan"
                        />
                    </div>

                    {/* TUNJANGAN TRANSPORT */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Tunjangan Transport</Label>
                        <InputRp
                            value={formatRupiah(formData.tunjangan_transport)}
                            onChange={(v: any) => updateForm("tunjangan_transport", v)}
                            placeholder="Masukkan tunjangan transport"
                        />
                    </div>

                    {/* TUNJANGAN LAIN-LAIN */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Tunjangan Lain-lain</Label>
                        <InputRp
                            value={formatRupiah(formData.tunjangan_lain)}
                            onChange={(v: any) => updateForm("tunjangan_lain", v)}
                            placeholder="Masukkan tunjangan lain-lain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformasiGajiSection;
