import React from "react";
import { User } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormSection } from "@/components/ui/form-section";
import { useGetRoles } from "@/api/role/role.query";

interface AkunSectionProps {
    formData: Record<string, any>;
    updateForm: (key: string, value: any) => void;
}

const AkunSection = ({ formData, updateForm }: AkunSectionProps) => {
    const { data: roleData, isLoading: isLoadingRoles } = useGetRoles({
        search: "",
        page: 1,
        limit: 1000,
    });

    const roles = roleData?.data ?? [];
    const roleOptions = roles.map((role) => ({
        value: role.name_role,
        label: role.name_role,
    }));

    return (
        <FormSection
            title="Informasi Akun"
            icon={<User className="w-5 h-5" />}
        >
            <FormInput
                label="Username"
                required
                placeholder="Masukkan username"
                value={formData.username || ""}
                onChange={(value) => updateForm("username", value)}
            />

            <FormInput
                label="Email"
                required
                type="email"
                placeholder="Masukkan email"
                value={formData.email || ""}
                onChange={(value) => updateForm("email", value)}
            />

            <FormInput
                label="Password"
                required
                type="password"
                placeholder="••••"
                value={formData.password || ""}
                onChange={(value) => updateForm("password", value)}
            />

            <FormSelect
                label="Role"
                required
                placeholder="-- Pilih Role --"
                value={formData.role || ""}
                onValueChange={(value) => updateForm("role", value)}
                loading={isLoadingRoles}
                emptyMessage="Tidak ada data role"
                options={roleOptions}
            />
        </FormSection>
    );
};

export default AkunSection;