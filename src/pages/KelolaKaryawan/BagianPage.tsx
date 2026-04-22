import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { Edit, Trash2, Users } from 'lucide-react';
import { TableCard } from '@/components/ui/table-card';
import { BagianFormModal } from '@/components/KelolaKaryawan/BagianFormModal';
import {
    useCreateSection,
    useDeleteSection,
    useGetSections,
    useUpdateSection,
} from '@/api/section/section.query';
import { SectionItem } from '@/api/section/section.types';

export const BagianPage = () => {
    const [search, setSearch] = useState("");
    const [showEntries, setShowEntries] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<SectionItem | null>(null);

    const { data, isLoading, refetch } = useGetSections({
        search,
        page: currentPage,
        limit: Number(showEntries),
    });

    const createMutation = useCreateSection(() => {
        refetch();
        setModalOpen(false);
    });

    const updateMutation = useUpdateSection(() => {
        refetch();
        setModalOpen(false);
    });

    const handleSubmit = (payload: { id?: number; name: string; department_id: number }) => {
        if (payload.id) {
            updateMutation.mutate({
                id: payload.id,
                payload: {
                    name: payload.name,
                    department_id: payload.department_id,
                },
            });
        } else {
            createMutation.mutate({
                name: payload.name,
                department_id: payload.department_id,
            });
        }
    };

    const deleteMutation = useDeleteSection(() => refetch());

    const items: SectionItem[] = data?.data ?? [];
    const pagination = data?.meta;

    return (
        <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
            <TableCard icon={Users} title="Data Bagian">

                <TableToolbar
                    searchValue={search}
                    onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
                    searchPlaceholder="Cari bagian..."
                    showEntriesValue={showEntries}
                    onShowEntriesChange={(v) => { setShowEntries(v); setCurrentPage(1); }}
                    onAddClick={() => { setEditData(null); setModalOpen(true); }}
                    addButtonLabel="Tambah Bagian"
                />

                <div className="overflow-auto rounded border border-gray-300">
                    <Table className="w-full border border-gray-300 border-collapse">
                        <TableHeader>
                            <TableRow className="bg-[#0F2A4D] text-white hover:bg-[#0F2A4D]">
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
                                    <TableRow key={item.id} className="hover:bg-gray-50 transition">
                                        <TableCell className="border border-gray-300">
                                            {(currentPage - 1) * Number(showEntries) + idx + 1}
                                        </TableCell>
                                        <TableCell className="border border-gray-300">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="border border-gray-300">
                                            {item.department?.name || '-'}
                                        </TableCell>
                                        <TableCell className="border border-gray-300">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-[#0F2A4D] text-white hover:bg-[#0F2A4D]/90 shadow-sm"
                                                    onClick={() => {
                                                        setEditData(item);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
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

                <TablePagination
                    pagination={pagination}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    items={items}
                />

            </TableCard>

            <BagianFormModal
                open={modalOpen}
                onClose={setModalOpen}
                initialData={editData ? { id: editData.id, name: editData.name, department_id: editData.department_id } : null}
                loading={createMutation.isPending || updateMutation.isPending}
                onSubmit={handleSubmit}
            />

        </div>
    );
};