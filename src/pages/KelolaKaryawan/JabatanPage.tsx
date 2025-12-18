import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const handleSubmit = (payload: { id?: number; position_name: string }) => {
    if (payload.id) {
      updateMutation.mutate({
        id: payload.id,
        payload: { position_name: payload.position_name },
      });
    } else {
      createMutation.mutate({
        position_name: payload.position_name,
      });
    }
  };

  const deleteMutation = useDeletePosition(() => refetch());

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Data Jabatan
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
                  placeholder="Cari jabatan..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-64"
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jabatan
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                  <TableHead className="text-white border border-gray-200">
                    No.
                  </TableHead>
                  <TableHead className="text-white border border-gray-200">
                    Nama Jabatan
                  </TableHead>
                  <TableHead className="text-white border border-gray-200">
                    Aksi
                  </TableHead>
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
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="border border-gray-200">
                        {(currentPage - 1) * Number(showEntries) + idx + 1}
                      </TableCell>

                      <TableCell className="border border-gray-200">
                        {item.position_name}
                      </TableCell>

                      <TableCell className="border border-gray-200">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-blue-400 text-white hover:bg-blue-500"
                            onClick={() => {
                              setEditData(item);
                              setModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMutation.mutate(item.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
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
            {/* Info */}
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

            {/* Navigation */}
            <div className="flex gap-2">
              <Button
                disabled={pagination?.current_page === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-blue-500 text-white hover:bg-blue-600"
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
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={pagination?.current_page === pagination?.last_page}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Modal */}
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
