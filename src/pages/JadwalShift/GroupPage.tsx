import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Edit, Trash2, Plus, Search, Users } from 'lucide-react';
import { TableCard } from '@/components/ui/table-card';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { TablePagination } from '@/components/ui/table-pagination';

const groupData = [
  { id: 1, keterangan: 'Group A - Admin' },
  { id: 2, keterangan: 'Group B - Operasional' },
  { id: 3, keterangan: 'Group C - Security' },
  { id: 4, keterangan: 'Group D - Produksi' },
  { id: 5, keterangan: 'Group E - Marketing' },
  { id: 6, keterangan: 'Group F - Maintenance' },
  { id: 7, keterangan: 'Group G - Engineering' },
];

export const GroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = groupData.filter((item) =>
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / Number(showEntries));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * Number(showEntries),
    currentPage * Number(showEntries)
  );

  return (
    <div className="p-6 space-y-6">
      <TableCard icon={Users} title="Data Group">
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
          searchPlaceholder="Cari grup..."
          showEntriesValue={showEntries.toString()}
          onShowEntriesChange={(v) => { setShowEntries(Number(v)); setCurrentPage(1); }}
          onAddClick={() => { }}
          addButtonLabel="Tambah Grup"
        />

        <div className="overflow-auto rounded border border-gray-300">
          <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
              <TableRow className="bg-brand text-white hover:bg-brand">
                <TableHead className="border border-gray-300 text-white font-semibold">No.</TableHead>
                <TableHead className="border border-gray-300 text-white font-semibold">Keterangan</TableHead>
                <TableHead className="border border-gray-300 text-white font-semibold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="border border-gray-200">{currentPage === 1 ? idx + 1 : (currentPage - 1) * Number(showEntries) + idx + 1}</TableCell>
                    <TableCell className="border border-gray-200">{item.keterangan}</TableCell>
                    <TableCell className="border border-gray-200">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          pagination={{ current_page: currentPage, last_page: totalPages, per_page: showEntries, total: filteredData.length }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          items={paginatedData}
        />
      </TableCard>
    </div>
  );
};
