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
import { Edit, Trash2, Briefcase } from "lucide-react";
import { TableCard } from "@/components/ui/table-card";
import {
  useCreatePosition,
  useDeletePosition,
  useGetPositions,
  useUpdatePosition,
} from "@/api/position/position.query";
import { PositionItem } from "@/api/position/position.types";
import { PositionFormModal } from "@/components/KelolaKaryawan/PositionFormModal";

export const JabatanPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<PositionItem | null>(null);

  const { data, isLoading, refetch } = useGetPositions({
    search: searchTerm,
    page: currentPage,
    limit: Number(showEntries),
  });

  const createMutation = useCreatePosition(() => {
    refetch();
    setModalOpen(false);
  });

  const updateMutation = useUpdatePosition(() => {
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

  const deleteMutation = useDeletePosition(() => refetch());

  const items = data?.data ?? [];
  const pagination = data?.meta;

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      <TableCard icon={Briefcase} title="Data Jabatan">

        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari jabatan..."
          showEntriesValue={showEntries}
          onShowEntriesChange={(v) => { setShowEntries(v); setCurrentPage(1); }}
          onAddClick={() => { setEditData(null); setModalOpen(true); }}
          addButtonLabel="Tambah Jabatan"
        />

        {/* Table */}
        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="text-white border border-gray-200">No.</TableHead>
                <TableHead className="text-white border border-gray-200">Nama Jabatan</TableHead>
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
                  <TableRow key={item.id} className="hover:bg-[#F5F9FF] transition">
                    <TableCell className="border border-gray-300">
                      {(currentPage - 1) * Number(showEntries) + idx + 1}
                    </TableCell>

                    <TableCell className="border border-gray-300">{item.name}</TableCell>

                    <TableCell className="border border-gray-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-brand text-white hover:bg-brand/90 shadow-sm"
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

      <PositionFormModal
        open={modalOpen}
        onClose={setModalOpen}
        initialData={editData}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
