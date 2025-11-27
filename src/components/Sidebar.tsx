import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Clock,
  FileText,
  Calendar,
  DollarSign,
  CalendarClock,
  CreditCard,
  Receipt,
  AlertTriangle,
  FileCheck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Mail,
  MapPinCheck,
  Menu,
  ArrowLeft,
} from 'lucide-react';
import { useLogout } from '@/api/auth/auth.query';

interface SidebarProps {
  onLogout: () => void;
  currentPath: string;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    id: 'kelola-karyawan',
    label: 'Kelola Karyawan',
    icon: Users,
    submenu: [
      { id: 'divisi', label: 'Divisi' },
      { id: 'jabatan', label: 'Jabatan' },
      { id: 'data-karyawan', label: 'Data Karyawan' },
    ],
  },
  {
    id: 'kehadiran',
    label: 'Kehadiran',
    icon: Clock,
    submenu: [
      { id: 'data-kehadiran', label: 'Data Kehadiran' },
      { id: 'rekap-kehadiran', label: 'Rekap Kehadiran' },
    ],
  },
  { id: 'request-absen', label: 'Request Absen', icon: MapPinCheck },
  {
    id: 'cuti',
    label: 'Cuti',
    icon: CalendarClock,
    submenu: [
      { id: 'data-cuti', label: 'Data Cuti' },
      { id: 'rekap-cuti', label: 'Rekap Cuti' },
      { id: 'kategori-cuti', label: 'Kategori Cuti' },
    ],
  },
  {
    id: 'izin',
    label: 'Izin',
    icon: FileText,
    submenu: [
      { id: 'data-izin', label: 'Data Izin' },
      { id: 'rekap-izin', label: 'Rekap Izin' },
    ],
  },
  {
    id: 'lembur',
    label: 'Lembur',
    icon: CalendarClock,
    submenu: [
      { id: 'data-lembur', label: 'Data Lembur' },
      { id: 'rekap-lembur', label: 'Rekap Lembur' },
    ],
  },
  {
    id: 'penggajian',
    label: 'Penggajian',
    icon: DollarSign,
    submenu: [
      { id: 'hitung-gaji', label: 'Hitung Gaji' },
      { id: 'rekap-gaji', label: 'Rekap Gaji' },
    ],
  },
  {
    id: 'jadwal-shift',
    label: 'Jadwal Shift',
    icon: Calendar,
    submenu: [
      { id: 'shift', label: 'Shift' },
      { id: 'group', label: 'Group' },
      { id: 'atur-shift', label: 'Atur Shift' },
      { id: 'rekap-jadwal', label: 'Rekap Jadwal' },
    ],
  },
  { id: 'pinjaman', label: 'Pinjaman', icon: CreditCard },
  { id: 'reimbursement', label: 'Reimbursement', icon: Receipt },
  { id: 'kontrak-kerja', label: 'Kontrak Kerja', icon: Users },
  { id: 'paklaring', label: 'Paklaring', icon: FileCheck },
  { id: 'surat-peringatan', label: 'Surat Peringatan', icon: AlertTriangle },
  { id: 'pengunduran-diri', label: 'Surat Pengunduran Diri', icon: Mail },
  { id: 'keterangan-bekerja', label: 'Surat Keterangan Bekerja', icon: Mail },
  { id: 'po', label: 'PO', icon: ShoppingCart },
  { id: 'kpi', label: 'KPI', icon: BarChart3 },
  { id: 'pengaturan', label: 'Pengaturan Akun', icon: Settings },
];

export const Sidebar = ({ onLogout, currentPath }: SidebarProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(); // Panggil API logout
  };

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: typeof menuItems[number]) => {
    const Icon = item.icon;
    const isActive = currentPath === item.id;
    const isOpenDropdown = openDropdowns[item.id] ?? false;

    if (item.submenu) {
      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-800'
            )}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              {isOpen && <span>{item.label}</span>}
            </div>
            {isOpen && (isOpenDropdown ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </Button>

          {isOpen && (
            <div
              className={cn(
                'transition-all duration-300 ease-in-out overflow-hidden',
                isOpenDropdown ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
              )}
            >
              <div className="ml-6 bg-white rounded-xl py-2 px-3 space-y-1 shadow-md">
                {item.submenu.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleNavigate(sub.id)}
                    className={cn(
                      'block w-full text-left px-3 py-1.5 rounded-md text-sm transition-all',
                      currentPath === sub.id
                        ? 'bg-white text-blue-900 font-semibold'
                        : 'text-gray-800 hover:bg-gray-100'
                    )}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        title={!isOpen ? item.label : undefined}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 justify-start',
          isActive ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'
        )}
        onClick={() => handleNavigate(item.id)}
      >
        <Icon className="h-5 w-5" />
        {isOpen && <span className="truncate">{item.label}</span>}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        'bg-[#2794eb] text-white h-screen flex flex-col shadow-lg transition-all duration-300 fixed md:static top-0 left-0 z-40',
        isOpen ? 'w-64' : 'w-16',
      )}
    >
      {/* Header dengan 1 tombol kontrol */}
      <div className="p-4 border-b border-blue-800 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">SMART HRM</h1>}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ArrowLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-3 py-4 space-y-1">{menuItems.map(renderMenuItem)}</nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-800 transition-all duration-150 justify-start"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && (logoutMutation.isPending ? "Logging out..." : "Log out")}
        </Button>
      </div>
    </div>
  );
};
