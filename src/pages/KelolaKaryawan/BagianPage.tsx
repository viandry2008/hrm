import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Edit, Trash2, Plus, Search, Users } from 'lucide-react';

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
    const [bagian, setBagian] = useState(dummyBagian);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEntries, setShowEntries] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal Create
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newNamaBagian, setNewNamaBagian] = useState('');
    const [selectedDivisi, setSelectedDivisi] = useState('');

    // Filter
    const filteredData = bagian.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const entriesPerPage = parseInt(showEntries);
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
                        <Users className="h-5 w-5 mr-2" />
                        Data Bagian
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
                                    placeholder="Cari bagian..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setShowCreateModal(true)}
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
                                    <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.map((item, idx) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell className="border border-gray-200">
                                            {(currentPage - 1) * entriesPerPage + idx + 1}
                                        </TableCell>
                                        <TableCell className="border border-gray-200">{item.nama}</TableCell>
                                        <TableCell className="border border-gray-200">
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="bg-blue-400 text-white hover:bg-blue-500"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer / Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                            Menampilkan{' '}
                            <strong>
                                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} sampai{' '}
                                {Math.min(currentPage * entriesPerPage, filteredData.length)}
                            </strong>{' '}
                            dari <strong>{filteredData.length}</strong> data
                        </div>

                        <div className="flex gap-2">
                            <Button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                className="bg-blue-700 text-white hover:bg-blue-600"
                            >
                                Sebelumnya
                            </Button>

                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={
                                        currentPage === i + 1
                                            ? 'bg-blue-700 text-white'
                                            : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                                    }
                                >
                                    {i + 1}
                                </Button>
                            ))}

                            <Button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                className="bg-blue-700 text-white hover:bg-blue-600"
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog.Root open={showCreateModal} onOpenChange={setShowCreateModal}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />

                    {/* Modal Content*/}
                    <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-lg shadow-lg p-5 focus:outline-none">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-semibold">Tambah Bagian</Dialog.Title>
                            <Dialog.Close asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-gray-200"
                                >
                                    <Cross2Icon className="h-4 w-4" />
                                </Button>
                            </Dialog.Close>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Nama Bagian</label>
                            <Input
                                placeholder="Masukkan nama bagian"
                                value={newNamaBagian}
                                onChange={(e) => setNewNamaBagian(e.target.value)}
                            />

                            <label className="text-sm font-medium">Relasi Divisi</label>
                            <Select value={selectedDivisi} onValueChange={setSelectedDivisi}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih divisi" />
                                </SelectTrigger>
                                <SelectContent className="z-[10000]">
                                    {listDivisi.map((div) => (
                                        <SelectItem key={div.id} value={div.nama}>
                                            {div.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <Dialog.Close asChild>
                                <Button variant="outline">Batal</Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => {
                                        const newItem = {
                                            id: bagian.length + 1,
                                            nama: newNamaBagian,
                                            divisi: selectedDivisi,
                                        };
                                        setBagian([...bagian, newItem]);
                                        setNewNamaBagian('');
                                        setSelectedDivisi('');
                                    }}
                                >
                                    Simpan
                                </Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    );
};