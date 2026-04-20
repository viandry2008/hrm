import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, Calendar, Users, Clock, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmployeeDropdown } from '@/components/EmployeeDropdown';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const shiftData = [
  { id: 1, keterangan: 'Shift Pagi', jam: '08:00 - 15:00' },
  { id: 2, keterangan: 'Shift Siang', jam: '15:00 - 22:00' },
  { id: 3, keterangan: 'Shift Malam', jam: '22:00 - 06:00' }
];

const groupData = [
  { id: 1, keterangan: 'Group A - Admin' },
  { id: 2, keterangan: 'Group B - Operasional' },
  { id: 3, keterangan: 'Group C - Security' }
];

const aturShiftData = [
  { id: 1, tanggal: '2024-01-15', group: 'Group A', shift: 'Pagi (08:00 - 15:00)', jumlahOrang: 12 },
  { id: 2, tanggal: '2024-01-15', group: 'Group B', shift: 'Siang (15:00 - 22:00)', jumlahOrang: 8 },
  { id: 3, tanggal: '2024-01-16', group: 'Group C', shift: 'Malam (22:00 - 06:00)', jumlahOrang: 6 }
];

const employeeData = [
  { id: 'PF10023', name: 'Meida Dwi', selected: false },
  { id: 'PF10024', name: 'Ahmad Rizki', selected: false },
  { id: 'PF10025', name: 'Sari Indah', selected: false },
  { id: 'PF10026', name: 'Budi Santoso', selected: false },
  { id: 'PF10027', name: 'Dewi Lestari', selected: false }
];

export const JadwalShiftPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('10');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState(employeeData);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('shift');

  const handleEmployeeToggle = (id: string) => {
    setSelectedEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, selected: !emp.selected } : emp
      )
    );
  };

  const handleSaveSchedule = () => {
    // Show sweet alert
    if (window.Swal) {
      window.Swal.fire({
        title: 'Berhasil!',
        text: 'Jadwal berhasil disimpan',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      alert('Jadwal berhasil disimpan!');
    }
    setIsModalOpen(false);
  };

  const DataTable = ({ data, columns, type }: any) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          {type === 'atur' ? (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Atur Shift
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Atur Shift</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Tanggal Shift</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label>Group</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Pilih Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="group-a">Group A</SelectItem>
                          <SelectItem value="group-b">Group B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Shift</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Pilih Shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pagi">Pagi (08:00 - 15:00)</SelectItem>
                          <SelectItem value="siang">Siang (15:00 - 22:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Di setting oleh: <Badge variant="secondary">HRD</Badge></p>
                    </div>
                  </div>
                  <div>
                    <Label>Karyawan yang dijadwalkan</Label>
                    <div className="mt-2">
                      <EmployeeDropdown
                        employees={selectedEmployees}
                        onEmployeeToggle={handleEmployeeToggle}
                        searchTerm={employeeSearchTerm}
                        onSearchChange={setEmployeeSearchTerm}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                  <Button onClick={handleSaveSchedule} className="bg-green-600 hover:bg-green-700">Simpan</Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {type === 'shift' ? 'Tambah Shift' : 'Tambah Group'}
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-auto rounded border border-gray-300">
        <Table className="w-full border border-gray-300 border-collapse">
          <TableHeader>
            <TableRow className="bg-brand text-white hover:bg-brand">
              {columns.map((col: string, idx: number) => (
                <TableHead key={idx} className="text-white font-semibold">{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, idx: number) => (
              <TableRow key={idx} className="border-b hover:bg-gray-50">
                <TableCell className="border-r">{idx + 1}</TableCell>
                {type === 'shift' && (
                  <>
                    <TableCell className="border-r">{item.keterangan}</TableCell>
                    <TableCell className="border-r">{item.jam}</TableCell>
                  </>
                )}
                {type === 'group' && (
                  <TableCell className="border-r">{item.keterangan}</TableCell>
                )}
                {type === 'atur' && (
                  <>
                    <TableCell className="border-r">{item.tanggal}</TableCell>
                    <TableCell className="border-r">{item.group}</TableCell>
                    <TableCell className="border-r">{item.shift}</TableCell>
                    <TableCell className="border-r">{item.jumlahOrang}</TableCell>
                  </>
                )}
                <TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Showing 1 to {data.length} of {data.length} entries</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shift</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Jadwal</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setActiveTab('shift')}>Shift</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('group')}>Group</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('atur-shift')}>Atur Shift</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('jadwal')}>Rekap Jadwal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeTab === 'shift' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Data Shift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={shiftData} columns={['No.', 'Keterangan Shift', 'Jam', 'Aksi']} type="shift" />
          </CardContent>
        </Card>
      )}

      {activeTab === 'group' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Data Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={groupData} columns={['No.', 'Keterangan', 'Aksi']} type="group" />
          </CardContent>
        </Card>
      )}

      {activeTab === 'atur-shift' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Atur Shift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={aturShiftData} columns={['No.', 'Tanggal', 'Group', 'Shift', 'Jumlah Orang', 'Aksi']} type="atur" />
          </CardContent>
        </Card>
      )}

      {activeTab === 'jadwal' && (
        <Card>
          <CardHeader>
            <CardTitle>Rekap Jadwal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Fitur rekap jadwal akan ditampilkan di sini</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};