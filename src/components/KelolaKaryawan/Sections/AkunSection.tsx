import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AkunSectionProps {
    formData: any;
    updateForm: (key: string, value: any) => void;
}

const AkunSection: React.FC<AkunSectionProps> = ({ formData, updateForm }) => {
    return (
        <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-md">

            {/* Username */}
            <div className="flex flex-col">
                <Label className="font-semibold mb-1">Username *</Label>
                <Input
                    type="text"
                    placeholder="Masukkan username"
                    value={formData.username || ""}
                    onChange={(e) => updateForm("username", e.target.value)}
                />
            </div>

            {/* Email */}
            <div className="flex flex-col">
                <Label className="font-semibold mb-1">Email *</Label>
                <Input
                    type="email"
                    placeholder="contoh@mail.com"
                    value={formData.email || ""}
                    onChange={(e) => updateForm("email", e.target.value)}
                />
            </div>

            {/* Password */}
            <div className="flex flex-col">
                <Label className="font-semibold mb-1">Password *</Label>
                <Input
                    type="password"
                    placeholder="********"
                    value={formData.password || ""}
                    onChange={(e) => updateForm("password", e.target.value)}
                />
            </div>

            {/* Role */}
            <div className="flex flex-col">
                <Label className="font-semibold mb-1">Role *</Label>
                <Input
                    type="text"
                    placeholder="Administrator / Staff / User"
                    value={formData.role || ""}
                    onChange={(e) => updateForm("role", e.target.value)}
                />
            </div>

        </div>
    );
};

export default AkunSection;
