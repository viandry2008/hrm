import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/api/auth/auth.store';
import { showLogoutDialog } from '@/components/ui/confirm-dialog';
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
  FileSignature,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  currentPath: string;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['HR', 'KARYAWAN', 'ATASAN'] },

  {
    id: 'kelola-karyawan',
    label: 'Kelola Karyawan',
    icon: Users,
    roles: ['HR'], // HANYA HR
    submenu: [
      { id: 'divisi', label: 'Divisi' },
      { id: 'jabatan', label: 'Jabatan' },
      { id: 'bagian', label: 'Bagian' },
      { id: 'data-karyawan', label: 'Data Karyawan' },
    ],
  },

  {
    id: 'kehadiran',
    label: 'Kehadiran',
    icon: Clock,
    roles: ['HR', 'KARYAWAN', 'ATASAN'], // TAMBAH ATASAN
    submenu: [
      { id: 'data-kehadiran', label: 'Data Kehadiran' },
      { id: 'rekap-kehadiran', label: 'Rekap Kehadiran' },
    ],
  },

  { id: 'request-absen', label: 'Request Absen', icon: MapPinCheck, roles: ['HR', 'KARYAWAN', 'ATASAN'] }, // TAMBAH ATASAN

  {
    id: 'cuti',
    label: 'Cuti',
    icon: CalendarClock,
    roles: ['HR', 'KARYAWAN', 'ATASAN'], // TAMBAH ATASAN
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
    roles: ['HR', 'KARYAWAN', 'ATASAN'], // TAMBAH ATASAN
    submenu: [
      { id: 'data-izin', label: 'Data Izin' },
      { id: 'rekap-izin', label: 'Rekap Izin' },
    ],
  },

  {
    id: 'lembur',
    label: 'Lembur',
    icon: CalendarClock,
    roles: ['HR', 'ATASAN'], // SUDAH BENAR
    submenu: [
      { id: 'data-lembur', label: 'Data Lembur' },
      { id: 'rekap-lembur', label: 'Rekap Lembur' },
    ],
  },

  {
    id: 'penggajian',
    label: 'Penggajian',
    icon: DollarSign,
    roles: ['HR'], // HANYA HR (TIDAK ADA ATASAN)
    submenu: [
      { id: 'hitung-gaji', label: 'Hitung Gaji' },
      { id: 'rekap-gaji', label: 'Rekap Gaji' },
    ],
  },

  {
    id: 'jadwal-shift',
    label: 'Jadwal Shift',
    icon: Calendar,
    roles: ['HR', 'ATASAN'], // TAMBAH ATASAN
    submenu: [
      { id: 'shift', label: 'Shift' },
      { id: 'grup', label: 'Grup' },
      { id: 'atur-shift', label: 'Atur Shift' },
      { id: 'rekap-jadwal', label: 'Rekap Jadwal' },
    ],
  },

  // 🔥 PERBAIKAN: PINJAMAN HANYA HR & KARYAWAN (ATASAN DIHAPUS)
  { id: 'pinjaman', label: 'Pinjaman', icon: CreditCard, roles: ['HR', 'KARYAWAN'] },

  { id: 'reimbursement', label: 'Reimbursement', icon: Receipt, roles: ['HR', 'KARYAWAN', 'ATASAN'] }, // TAMBAH ATASAN

  { id: 'kontrak-kerja', label: 'Kontrak Kerja', icon: Users, roles: ['HR'] },
  { id: 'paklaring', label: 'Paklaring', icon: FileCheck, roles: ['HR'] },
  { id: 'surat-peringatan', label: 'Surat Peringatan', icon: AlertTriangle, roles: ['HR'] },

  { id: 'pengunduran-diri', label: 'Surat Pengunduran Diri', icon: Mail, roles: ['HR', 'KARYAWAN'] },
  { id: 'keterangan-bekerja', label: 'Surat Keterangan Bekerja', icon: Mail, roles: ['HR'] },
  { id: 'penawaran-kerja', label: 'Surat Penawaran Kerja', icon: FileSignature, roles: ['HR'] },

  { id: 'po', label: 'PO', icon: ShoppingCart, roles: ['HR'] },

  { id: 'kpi', label: 'KPI', icon: BarChart3, roles: ['HR'] }, // HANYA HR (ATASAN DIHAPUS)

  { id: 'pengaturan', label: 'Pengaturan Akun', icon: Settings, roles: ['HR', 'KARYAWAN', 'ATASAN'] },
];

export const Sidebar = ({ onLogout, currentPath, isOpen, onToggle }: SidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isManagement = useAuthStore((s) => s.isManagement);
  const userRole = user?.role?.slug_role || "";

  const effectiveRole = isManagement ? userRole : "KARYAWAN";

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(effectiveRole)
  );

  useEffect(() => {
    const parentId = filteredMenuItems.find(
      (item) => item.submenu?.some((sub) => sub.id === currentPath)
    )?.id;

    if (parentId && openDropdown !== parentId) {
      setOpenDropdown(parentId);
    }
  }, [currentPath]);

  const findParentId = (path: string): string | undefined => {
    return filteredMenuItems.find(
      (item) => item.submenu?.some((sub) => sub.id === path)
    )?.id;
  };

  const handleNavigate = (path: string) => {
    const parentId = findParentId(path);
    if (parentId) {
      setOpenDropdown(parentId);
    } else {
      setOpenDropdown(null);
    }
    navigate(`/${path}`);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const renderMenuItem = (item: typeof menuItems[number]) => {
    const Icon = item.icon;
    const isActive = !item.submenu && currentPath === item.id;
    const isParentActive = item.submenu?.some(
      (sub) => sub.id === currentPath
    );
    const isOpenDropdown = openDropdown === item.id;

    if (item.submenu) {
      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-[#1E4F85]/40 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown(item.id);
            }}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              {isOpen && <span>{item.label}</span>}
            </div>
            {isOpen &&
              (isOpenDropdown ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              ))}
          </Button>

          {isOpen && (
            <div
              className={cn(
                'transition-all duration-500 ease-in-out overflow-hidden',
                isOpenDropdown
                  ? 'max-h-96 opacity-100 mt-2 scale-100'
                  : 'max-h-0 opacity-0 scale-95'
              )}
            >
              <div className="ml-6 bg-[#0F2A4D]/80 backdrop-blur-md rounded-xl py-2 px-3 space-y-1 border border-[#1E4F85]/40">
                {item.submenu.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNavigate(sub.id);
                    }}
                    className={cn(
                      'block w-full text-left px-3 py-1.5 rounded-md text-sm text-white/80 hover:text-white transition-all',
                      currentPath === sub.id
                        ? 'bg-[#3FA7FF]/20 text-white font-semibold border border-[#3FA7FF]/30'
                        : 'hover:bg-[#3FA7FF]/20'
                    )}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )
          }
        </div >
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        title={!isOpen ? item.label : undefined}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 justify-start',
          (isActive || isParentActive)
            ? 'bg-[#3FA7FF]/20 text-white font-semibold border border-[#3FA7FF]/30'
            : 'text-white/80 hover:text-white hover:bg-[#1E4F85]/40'
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
        'bg-gradient-to-b from-[#0B1F3A] via-[#0F2A4D] to-[#133A63] text-white h-screen flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-all duration-300 fixed md:static top-0 left-0 z-40',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold tracking-wide">SMART HRM</h1>}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-[#1E4F85]/40 transition-all duration-200"
          onClick={onToggle}
        >
          {isOpen ? <ArrowLeft className="h-5 w-5 " /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-3 py-4 space-y-1">
          {filteredMenuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-[#1E4F85]/40 transition-all duration-150 justify-start"
          onClick={async () => {
            const confirmed = await showLogoutDialog();
            if (confirmed) onLogout();
          }}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span>Log out</span>}
        </Button>
      </div>
    </div>
  );
};