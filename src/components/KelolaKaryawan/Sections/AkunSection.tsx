import React from "react";
import { User } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormSection } from "@/components/ui/form-section";
import { useGetRoles } from "@/api/role/role.query";

interface AkunSectionProps {
    formData: Record<string, any>;
    updateForm: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

const AkunSection = ({ formData, updateForm, errors }: AkunSectionProps) => {
    const { data: roleData, isLoading: isLoadingRoles } = useGetRoles({
        search: "",
        page: 1,
        limit: 1000,
    });

    const roles = roleData?.data ?? [];
    const roleOptions = roles.map((role) => ({
        value: role.id.toString(),
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
                id="field-username"
                error={errors?.username}
                onChange={(value) => updateForm("username", value)}
            />

            <FormInput
                label="Email"
                required
                type="email"
                placeholder="Masukkan email"
                value={formData.email || ""}
                id="field-email"
                error={errors?.email}
                onChange={(value) => updateForm("email", value)}
            />

            <FormInput
                label="Password"
                required
                type="password"
                placeholder="••••"
                value={formData.password || ""}
                id="field-password"
                error={errors?.password}
                onChange={(value) => updateForm("password", value)}
            />

            <FormSelect
                label="Role"
                required
                placeholder="-- Pilih Role --"
                value={formData.role || ""}
                id="field-role"
                error={errors?.role}
                onValueChange={(value) => updateForm("role", value)}
                loading={isLoadingRoles}
                emptyMessage="Tidak ada data role"
                options={roleOptions}
            />
        </FormSection>
    );
};

export default AkunSection;