import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { HRISApp } from "@/layouts/HRISApp";
import NotFound from "./pages/NotFound";

// Pages - Dashboard & Jadwal Shift
import { DashboardPage } from "./pages/main/DashboardPage";
import { ShiftPage } from "./pages/JadwalShift/ShiftPage";
import { GroupPage } from "./pages/JadwalShift/GroupPage";
// import { JadwalShiftPage } from "./pages/JadwalShift/JadwalShiftPage";
// import { AturShiftPage } from "./pages/JadwalShift/AturShiftPage";

// Pages - Kehadiran & Request Absen
// import { KehadiranPage } from "./components/Kehadiran/KehadiranPage";
import { DataKehadiranPage } from "./pages/Kehadiran/DataKehadiranPage";
import { RekapKehadiranPage } from "./pages/Kehadiran/RekapKehadiranPage";
import { RequestAbsenPage } from "./components/RequestAbsenPage";

// Pages - Cuti, Izin, Lembur
import { DataCutiPage } from "./components/Cuti/DataCutiPage";
import { DataIzinPage } from "./components/Izin/DataIzinPage";
import { DataLemburPage } from "./components/Lembur/DataLemburPage";

// Pages - Keuangan & Lainnya
import { PinjamanPage } from "./components/PinjamanPage";
import { ReimbursementPage } from "./components/ReimbursementPage";
import { POPage } from "./components/POPage";

// Pages - Surat-menyurat
import { PengunduranDiriPage } from './components/PengunduranDiriPage';
import { KeteranganBekerjaPage } from './components/KeteranganBekerjaPage';
import { PaklaringPage } from './components/PaklaringPage';
import { SuratPeringatanPage } from "./components/SuratPeringatanPage";
import { KontrakKerjaPage } from "./components/KontrakKerjaPage";
import { SuratPenawaranKerjaPage } from "./pages/Surat/SuratPenawaranKerjaPage";

// Pages - Kelola Karyawan
import { KelolaKaryawanPage } from "./pages/KelolaKaryawan/KelolaKaryawanPage";

import { DivisiPage } from "./pages/KelolaKaryawan/DivisiPage";
import { JabatanPage } from "./pages/KelolaKaryawan/JabatanPage";
import { BagianPage } from "./pages/KelolaKaryawan/BagianPage";

// Pages - Data Karyawan (Detail View)
import { DataKaryawanPage } from "./pages/KelolaKaryawan/DataKaryawanPage";
import TambahKaryawanPage from "./pages/KelolaKaryawan/TambahKaryawanPage";
import DetailKaryawanPage from "./pages/KelolaKaryawan/DetailKaryawanPage";

// Auth & Login
import { RegisterPage } from "./pages/trial/RegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPassword } from "./components/ResetPassword";

// Auth Context & Guards
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleRoute } from "@/components/RoleRoute";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              {/* ================= PUBLIC ROUTES ================= */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* ================= PROTECTED ROUTES ================= */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HRISApp />}>

                  {/*  SEMUA ROLE (HR, KARYAWAN, ATASAN) */}
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="shift" element={<ShiftPage />} />
                  <Route path="grup" element={<GroupPage />} />
                  {/* <Route path="jadwal-shift" element={<JadwalShiftPage />} /> */}
                  <Route path="keterangan-bekerja" element={<KeteranganBekerjaPage />} />
                  <Route path="paklaring" element={<PaklaringPage />} />
                  <Route path="/detail-karyawan/:id" element={<DetailKaryawanPage />} />

                  {/* HR ONLY */}
                  <Route element={<RoleRoute allowedRoles={["HR"]} />}>
                    <Route path="kelola-karyawan" element={<KelolaKaryawanPage />} />
                    <Route path="data-karyawan" element={<DataKaryawanPage />} />
                    <Route path="tambah-karyawan" element={<TambahKaryawanPage />} />
                    <Route path="divisi" element={<DivisiPage />} />
                    <Route path="jabatan" element={<JabatanPage />} />
                    <Route path="bagian" element={<BagianPage />} />
                    <Route path="kontrak-kerja" element={<KontrakKerjaPage />} />
                    <Route path="surat-peringatan" element={<SuratPeringatanPage />} />
                    <Route path="penawaran-kerja" element={<SuratPenawaranKerjaPage />} />
                    <Route path="po" element={<POPage />} />
                    <Route path="kpi" element={<DataCutiPage />} />
                  </Route>

                  {/*  HR + KARYAWAN */}
                  <Route element={<RoleRoute allowedRoles={["HR", "KARYAWAN"]} />}>
                    {/* <Route path="kehadiran-page" element={<KehadiranPage />} /> */}
                    <Route path="data-kehadiran" element={<DataKehadiranPage />} />
                    <Route path="rekap-kehadiran" element={<RekapKehadiranPage />} />
                    <Route path="data-cuti" element={<DataCutiPage />} />
                    <Route path="data-izin" element={<DataIzinPage />} />
                    <Route path="pinjaman" element={<PinjamanPage />} />
                    <Route path="reimbursement" element={<ReimbursementPage />} />
                  </Route>

                  {/*  KARYAWAN ONLY */}
                  <Route element={<RoleRoute allowedRoles={["KARYAWAN"]} />}>
                    <Route path="request-absen" element={<RequestAbsenPage />} />
                    <Route path="pengunduran-diri" element={<PengunduranDiriPage />} />
                  </Route>

                  {/* 🔐 HR + ATASAN */}
                  <Route element={<RoleRoute allowedRoles={["HR", "ATASAN"]} />}>
                    <Route path="data-lembur" element={<DataLemburPage />} />
                    <Route path="data-cuti" element={<DataCutiPage />} />
                    <Route path="data-izin" element={<DataIzinPage />} />
                    {/* <Route path="jadwal-shift" element={<JadwalShiftPage />} /> */}
                    <Route path="reimbursement" element={<ReimbursementPage />} />
                  </Route>

                  {/* ❌ NOT FOUND */}
                  <Route path="*" element={<NotFound />} />

                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
