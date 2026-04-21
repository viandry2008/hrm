import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Plus, Search, Briefcase } from "lucide-react";
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
              <SelectTrigger className="w-20 border-gray-300">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari jabatan..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-64 border-gray-300 focus:border-[#1E4F85]"
                />
              </div>

              <Button
                className="bg-brand hover:bg-brand/90 text-white shadow-sm"
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jabatan
              </Button>
            </div>
          </div>

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

          {/* Pagination */}
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
                  ? (pagination?.current_page - 1) * pagination?.per_page +
                  items.length
                  : 0}
              </strong>{" "}
              dari <strong>{pagination?.total ?? 0}</strong> data
            </div>

            <div className="flex gap-2">
              <Button
                disabled={pagination?.current_page === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-brand text-white hover:bg-brand/90"
              >
                Prev
              </Button>

              {[...Array(pagination?.last_page || 1)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    pagination?.current_page === i + 1
                      ? "bg-brand text-white"
                      : "bg-white text-[#1E4F85] border border-[#1E4F85]/30 hover:bg-[#EAF2FB]"
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={pagination?.current_page === pagination?.last_page}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-brand text-white hover:bg-brand/90"
              >
                Next
              </Button>
            </div>
          </div>

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
