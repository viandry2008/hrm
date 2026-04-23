import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable'; // ✅ Import sudah benar
import { EmployeeDropdown } from '@/components/EmployeeDropdown';
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
//   Button, Input, Select, SelectTrigger, SelectValue, SelectContent,
//   SelectItem, Label, Badge
// } from '@/components/ui';

export const AturShiftPage = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [data, setData] = useState([
    // Contoh data awal
    { id: 1, namaKaryawan: 'Andi', shift: 'Pagi', tanggal: '2025-06-15' },
    { id: 2, namaKaryawan: 'Budi', shift: 'Siang', tanggal: '2025-06-16' }
  ]);

  const handleEdit = (row: any) => {
    alert(`Edit ${row.namaKaryawan}`);
  };

  const handleDelete = (row: any) => {
    if (confirm(`Hapus jadwal ${row.namaKaryawan}?`)) {
      setData(prev => prev.filter(item => item.id !== row.id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Atur Shift
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={data}
          columns={['No.', 'Nama Karyawan', 'Shift', 'Tanggal', 'Aksi']}
          type="atur-shift"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
};
