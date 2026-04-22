import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { TableToolbar } from "@/components/ui/table-toolbar";
import { Edit, Trash2, Users } from "lucide-react";
import { TableCard } from "@/components/ui/table-card";

import {
  useCreateDepartment,
  useDeleteDepartment,
  useGetDepartments,
  useUpdateDepartment,
} from "@/api/division/division.query";

import { DivisionFormModal } from "@/components/KelolaKaryawan/DivisionFormModal";
import { DepartmentItem } from "@/api/division/division.types";

export const DivisiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<DepartmentItem | null>(null);

  const { data, isLoading, refetch } = useGetDepartments({
    search: searchTerm,
    page: currentPage,
    limit: Number(showEntries),
  });

  const createMutation = useCreateDepartment(() => {
    refetch();
    setModalOpen(false);
  });

  const updateMutation = useUpdateDepartment(() => {
    refetch();
    setModalOpen(false);
  });

  const handleSubmit = (payload: { id?: number; name: string }) => {
    if (payload.id) {
      updateMutation.mutate({
        id: payload.id,
        payload: { name: payload.name },
      });
    } else {
      createMutation.mutate({
        name: payload.name,
      });
    }
  };

  const deleteMutation = useDeleteDepartment(() => refetch());

  const items: DepartmentItem[] = data?.data ?? [];
  const pagination = data?.meta;

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      <TableCard icon={Users} title="Data Divisi">

        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari divisi..."
          showEntriesValue={showEntries}
          onShowEntriesChange={(v) => { setShowEntries(v); setCurrentPage(1); }}
          onAddClick={() => { setEditData(null); setModalOpen(true); }}
          addButtonLabel="Tambah Divisi"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">

            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200">No.</TableHead>
                <TableHead className="text-white border border-gray-200">Nama Divisi</TableHead>
                <TableHead className="text-white border border-gray-200">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-transparent">

                    <TableCell className="border border-gray-300 bg-white">
                      {(currentPage - 1) * Number(showEntries) + idx + 1}
                    </TableCell>

                    <TableCell className="border border-gray-300 bg-white">
                      {item.name}
                    </TableCell>

                    <TableCell className="border border-gray-300 bg-white">
                      <div className="flex gap-2">

                        <Button
                          size="sm"
                          className="bg-brand text-white hover:bg-brand/90"
                          onClick={() => { setEditData(item); setModalOpen(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-600"
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

      <DivisionFormModal
        open={modalOpen}
        onClose={setModalOpen}
        initialData={editData ? { id: editData.id, name: editData.name } : null}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
