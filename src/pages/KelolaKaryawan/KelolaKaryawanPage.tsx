import { useState } from 'react';
import { DataKaryawanPage } from './DataKaryawanPage';
import { JabatanPage } from './JabatanPage';
import { DivisiPage } from './DivisiPage';

export const KelolaKaryawanPage = () => {
  const [activeTab, setActiveTab] = useState<'divisi' | 'jabatan' | 'data-karyawan'>('data-karyawan');

  const handleTabChange = (tab: 'divisi' | 'jabatan' | 'data-karyawan') => {
    setActiveTab(tab);
  };

  return (
    <div >
      {activeTab === 'divisi' && <DivisiPage />}
      {activeTab === 'jabatan' && <JabatanPage />}
      {activeTab === 'data-karyawan' && <DataKaryawanPage />}
    </div>
  );
};

export default KelolaKaryawanPage;
