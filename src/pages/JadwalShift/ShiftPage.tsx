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
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Plus, Search, Clock } from 'lucide-react';

const shiftData = [
  { id: 1, keterangan: 'Shift Pagi', jam: '08:00 - 15:00' },
  { id: 2, keterangan: 'Shift Siang', jam: '15:00 - 22:00' },
  { id: 3, keterangan: 'Shift Malam', jam: '22:00 - 06:00' },
];

export const ShiftPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('10');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Update jumlah data per halaman jika dropdown berubah
  useEffect(() => {
    setEntriesPerPage(Number(showEntries));
    setCurrentPage(1); // reset ke halaman 1 jika showEntries berubah
  }, [showEntries]);

  // Filter data berdasarkan pencarian
  const filteredData = shiftData.filter((item) =>
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Data Shift
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
                  placeholder="Cari shift..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Shift
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-brand text-white hover:bg-brand">
                  <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Keterangan Shift</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jam</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="border">{(currentPage - 1) * entriesPerPage + idx + 1}</TableCell>
                      <TableCell className="border">{item.keterangan}</TableCell>
                      <TableCell className="border">{item.jam}</TableCell>
                      <TableCell className="border">
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
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      Tidak ada data ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                 {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} sampai {' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong> data
            </div>
            <div className="flex gap-2">
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
