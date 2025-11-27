import React from "react";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AkunSectionProps {
    formData: any;
    updateForm: (key: string, value: any) => void;
}

const AkunSection: React.FC<AkunSectionProps> = ({ formData, updateForm }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Header Biru #2794EB */}
            <div className="flex items-center space-x-2 p-3 bg-[#2794EB] text-white rounded-t-lg">
                <User className="w-5 h-5" />
                <h3 className="font-semibold">Informasi Akun</h3>
            </div>

            {/* Konten Form */}
            <div className="p-4">
                <div className="grid grid-cols-2 gap-6">
                    {/* USERNAME */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Username *</Label>
                        <Input
                            type="text"
                            placeholder="Masukkan username"
                            value={formData.username || ""}
                            onChange={(e) => updateForm("username", e.target.value)}
                            className="bg-white text-sm"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Email *</Label>
                        <Input
                            type="text"
                            placeholder="Masukkan email"
                            value={formData.email || ""}
                            onChange={(e) => updateForm("email", e.target.value)}
                            className="bg-white text-sm"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Password *</Label>
                        <Input
                            type="password"
                            placeholder="••••"
                            value={formData.password || ""}
                            onChange={(e) => updateForm("password", e.target.value)}
                            className="bg-white text-sm"
                        />
                    </div>

                    {/* ROLE */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold text-sm">Role *</Label>
                        <Select
                            onValueChange={(value) => updateForm("role", value)}
                            value={formData.role || ""}
                        >
                            <SelectTrigger className="h-[42px] bg-white text-sm">
                                <SelectValue placeholder="-- Pilih Role --" />
                            </SelectTrigger>
                            <SelectContent className="text-sm">
                                <SelectItem value="Staff">Staff</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Supervisor">Supervisor</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Head">Head</SelectItem>
                                <SelectItem value="Direktur">Direktur</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AkunSection;