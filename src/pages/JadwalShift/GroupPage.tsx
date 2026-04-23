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
  const [showEntries, setShowEntries] = useState('10');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setEntriesPerPage(Number(showEntries));
    setCurrentPage(1);
  }, [showEntries]);

  const filteredData = groupData.filter((item) =>
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Data Group
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={showEntries} onValueChange={setShowEntries}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
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
                  placeholder="Cari grup..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Grup
              </Button>
            </div>
          </div>

          {/* Table */}
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
                      <TableCell className="border border-gray-200">{startIndex + idx + 1}</TableCell>
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
                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                      Tidak ada data ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.min(startIndex + 1, filteredData.length)} sampai{' '}
                {Math.min(startIndex + entriesPerPage, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong> data
            </div>
            <div className="flex space-x-2">
               <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="bg-blue-500 text-white hover:bg-blue-600"
                >
                Sebelumnya
               </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                 key={page}
                 variant={currentPage === page ? 'default' : 'outline'}
                 size="sm"
                 onClick={() => setCurrentPage(page)}
                 className={
                 currentPage === page
                 ? 'bg-blue-500 text-white'
                 : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }
                  >
                  {page}
                  </Button>
                  ))}
                 <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                  Selanjutnya
                   </Button>
                   </div>
                  </div>
                  </CardContent>
                </Card>
              </div>
            );
          };
