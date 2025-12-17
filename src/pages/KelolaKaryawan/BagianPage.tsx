import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Edit, Trash2, Plus, Search, Users } from 'lucide-react';
import {
    useCreateSection,
    useDeleteSection,
    useGetSections,
    useUpdateSection,
} from '@/api/section/section.query';
import { SectionItem } from '@/api/section/section.types';
import { useGetDepartments } from '@/api/division/division.query';

const dummyBagian = [
    { id: 1, nama: 'IT Support', divisi: 'Divisi IT' },
    { id: 2, nama: 'IT Helpdesk', divisi: 'Divisi IT' },
    { id: 3, nama: 'System Analyst', divisi: 'Divisi IT' },
];

const listDivisi = [
    { id: 1, nama: "Divisi IT" },
    { id: 2, nama: "Divisi HR" },
    { id: 3, nama: "Divisi Finance" },
];

export const BagianPage = () => {
    const [search, setSearch] = useState("");
    const [showEntries, setShowEntries] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<SectionItem | null>(null);

    const [sectionName, setSectionName] = useState("");
    const [departmentId, setDepartmentId] = useState<number | null>(null);

    useEffect(() => {
        if (editData) {
            setSectionName(editData.section_name);
            setDepartmentId(editData.department_id);
        } else {
            setSectionName("");
            setDepartmentId(null);
        }
    }, [editData, modalOpen]);

    /**
     * GET
     */
    const { data, isLoading, refetch } = useGetSections({
        search,
        page: currentPage,
        limit: Number(showEntries),
    });

    const { data: departmentData, isLoading: isLoadingDepartment } =
        useGetDepartments({
            search: "",
            page: 1,
            limit: 1000, // ambil semua untuk select
        });

    const departments = departmentData?.data.items ?? [];

    /**
     * CREATE
     */
    const createMutation = useCreateSection(() => {
        refetch();
        setModalOpen(false);
    });

    /**
     * UPDATE
     */
    const updateMutation = useUpdateSection(() => {
        refetch();
        setModalOpen(false);
    });

    /**
     * SUBMIT HANDLER
     */
    const handleSubmit = (payload: {
        id?: number;
        section_name: string;
        department_id: number;
    }) => {
        if (payload.id) {
            updateMutation.mutate({
                id: payload.id,
                payload: {
                    section_name: payload.section_name,
                    department_id: payload.department_id,
                },
            });
        } else {
            createMutation.mutate({
                section_name: payload.section_name,
                department_id: payload.department_id,
            });
        }
    };

    /**
     * DELETE
     */
    const deleteMutation = useDeleteSection(() => refetch());

    const items: SectionItem[] = data?.data.items ?? [];
    const pagination = data?.data.pagination;

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Data Bagian
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* Controls */}
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select
                                value={showEntries}
                                onValueChange={(v) => {
                                    setShowEntries(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-gray-600">entries</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Cari bagian..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => {
                                    setEditData(null);
                                    setModalOpen(true);
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Bagian
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <Table className="w-full border border-gray-300 border-collapse">
                            <TableHeader>
                                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                                    <TableHead className="text-white border border-gray-200">No.</TableHead>
                                    <TableHead className="text-white border border-gray-200">Nama Bagian</TableHead>
                                    <TableHead className="text-white border border-gray-200">Divisi</TableHead>
                                    <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item, idx) => (
                                        <TableRow key={item.id} className="hover:bg-gray-50">
                                            <TableCell className="border">
                                                {(currentPage - 1) * Number(showEntries) + idx + 1}
                                            </TableCell>
                                            <TableCell className="border">
                                                {item.section_name}
                                            </TableCell>
                                            <TableCell className="border">
                                                {item.department?.department_name}
                                            </TableCell>
                                            <TableCell className="border">
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                                        onClick={() => {
                                                            setEditData(item);
                                                            setModalOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="bg-red-600 text-white hover:bg-red-700"
                                                        onClick={() => deleteMutation.mutate(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer / Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                            Menampilkan{" "}
                            <strong>
                                {items.length > 0
                                    ? (pagination?.current_page - 1) * pagination?.per_page + 1
                                    : 0}
                            </strong>{" "}
                            sampai{" "}
                            <strong>
                                {items.length > 0
                                    ? (pagination?.current_page - 1) *
                                    pagination?.per_page +
                                    items.length
                                    : 0}
                            </strong>{" "}
                            dari <strong>{pagination?.total ?? 0}</strong> data
                        </div>

                        <div className="flex gap-2">
                            <Button
                                disabled={pagination?.current_page === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="bg-blue-500 text-white"
                            >
                                Sebelumnya
                            </Button>

                            {[...Array(pagination?.last_page || 1)].map((_, i) => (
                                <Button
                                    key={i}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={
                                        pagination?.current_page === i + 1
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-blue-600 border border-blue-600"
                                    }
                                >
                                    {i + 1}
                                </Button>
                            ))}

                            <Button
                                disabled={
                                    pagination?.current_page === pagination?.last_page
                                }
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="bg-blue-500 text-white"
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>

                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />

                    {/* Modal Content*/}
                    <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-lg shadow-lg p-5">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-semibold">
                                {editData ? "Edit Bagian" : "Tambah Bagian"}
                            </Dialog.Title>

                            <Dialog.Close asChild>
                                <Button variant="ghost" size="sm">
                                    <Cross2Icon />
                                </Button>
                            </Dialog.Close>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Nama Bagian</label>
                                <Input
                                    value={sectionName}
                                    onChange={(e) => setSectionName(e.target.value)}
                                    placeholder="Masukkan nama bagian"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Relasi Divisi</label>
                                <Select
                                    value={departmentId?.toString()}
                                    onValueChange={(v) => setDepartmentId(Number(v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                isLoadingDepartment ? "Loading divisi..." : "Pilih divisi"
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent className="z-[10000]">
                                        {departments.map((dept) => (
                                            <SelectItem key={dept.id} value={String(dept.id)}>
                                                {dept.department_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setModalOpen(false)}>
                                Batal
                            </Button>

                            <Button
                                className="bg-blue-600 text-white"
                                onClick={() =>
                                    handleSubmit({
                                        id: editData?.id,
                                        section_name: sectionName,
                                        department_id: departmentId!,
                                    })
                                }
                            >
                                Simpan
                            </Button>
                        </div>
                    </Dialog.Content>

                </Dialog.Portal>
            </Dialog.Root>

        </div>
    );
};