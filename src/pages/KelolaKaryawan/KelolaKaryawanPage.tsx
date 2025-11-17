import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { DataKaryawanPage } from './DataKaryawanPage';
import { JabatanPage } from './JabatanPage';
import { DivisiPage } from './DivisiPage';

export const KelolaKaryawanPage = () => {
  const [activeTab, setActiveTab] = useState<'divisi' | 'jabatan' | 'data-karyawan'>('data-karyawan');

  const handleTabChange = (tab: 'divisi' | 'jabatan' | 'data-karyawan') => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Karyawan</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>
                {activeTab === 'divisi' ? 'Divisi' :
                  activeTab === 'jabatan' ? 'Jabatan' :
                    'Data Karyawan'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleTabChange('divisi')}>
              Divisi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTabChange('jabatan')}>
              Jabatan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTabChange('data-karyawan')}>
              Data Karyawan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeTab === 'divisi' && <DivisiPage />}
      {activeTab === 'jabatan' && <JabatanPage />}
      {activeTab === 'data-karyawan' && <DataKaryawanPage />}
    </div>
  );
};

export default KelolaKaryawanPage;
