import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { HRISApp } from "@/layouts/HRISApp";
import NotFound from "./pages/NotFound";

// Import semua halaman
import DashboardPage from "./pages/main/DashboardPage";
// import { ShiftPage } from "./components/jadwalshift/ShiftPage";
// import { GroupPage } from "./components/jadwalshift/GroupPage";
// import { JadwalShiftPage } from "./components/jadwalshift/JadwalShiftPage";
// import { KehadiranPage } from "./components/kehadiran/KehadiranPage";
// import { DataKehadiranPage } from "./components/kehadiran/DataKehadiranPage";
// import { RekapKehadiranPage } from "./components/kehadiran/RekapKehadiranPage";
import { RequestAbsenPage } from "./components/RequestAbsenPage";
import { DataCutiPage } from "./components/Cuti/DataCutiPage";
import { PinjamanPage } from "./components/PinjamanPage";
import { ReimbursementPage } from "./components/ReimbursementPage";
import { DataLemburPage } from "./components/Lembur/DataLemburPage";
import { DataIzinPage } from "./components/Izin/DataIzinPage";
import { POPage } from "./components/POPage";
import { PengunduranDiriPage } from './components/PengunduranDiriPage';
import { KeteranganBekerjaPage } from './components/KeteranganBekerjaPage';
import { PaklaringPage } from './components/PaklaringPage';
import { TrialRegisterPage } from "./pages/trial/TrialRegisterPage";
import { ResetPassword } from "./components/ResetPassword";
import { SuratPeringatanPage } from "./components/SuratPeringatanPage";
import { KelolaKaryawanPage } from "./components/KelolaKaryawan/KelolaKaryawanPage";
import { DataKaryawanPage } from "./components/KelolaKaryawan/DataKaryawanPage";
import { DivisiPage } from "./components/KelolaKaryawan/DivisiPage";
import { JabatanPage } from "./components/KelolaKaryawan/JabatanPage";
import { KontrakKerjaPage } from "./components/KontrakKerjaPage";

// Auth
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";

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

              <Route path="/register" element={<TrialRegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="" element={<HRISApp />}>
                  <Route path="dashboard" element={< DashboardPage />} />
                  {/* <Route path="kehadiran-page" element={<KehadiranPage />} />
                  <Route path="data-kehadiran" element={<DataKehadiranPage />} />
                  <Route path="rekap-kehadiran" element={<RekapKehadiranPage />} /> */}
                  <Route path="kelola-karyawan" element={<KelolaKaryawanPage />} />
                  <Route path="data-karyawan" element={<DataKaryawanPage />} />
                  <Route path="request-absen" element={<RequestAbsenPage />} />
                  <Route path="divisi" element={<DivisiPage />} />
                  <Route path="jabatan" element={<JabatanPage />} />
                  <Route path="data-cuti" element={<DataCutiPage />} />
                  <Route path="data-izin" element={<DataIzinPage />} />
                  <Route path="data-lembur" element={<DataLemburPage />} />
                  {/* <Route path="shift" element={<ShiftPage />} />
                  <Route path="group" element={<GroupPage />} />
                  <Route path="jadwal-shift" element={<JadwalShiftPage />} /> */}
                  <Route path="pinjaman" element={<PinjamanPage />} />
                  <Route path="reimbursement" element={<ReimbursementPage />} />
                  <Route path="po" element={<POPage />} />
                  <Route path="pengunduran-diri" element={<PengunduranDiriPage />} />
                  <Route path="keterangan-bekerja" element={<KeteranganBekerjaPage />} />
                  <Route path="paklaring" element={<PaklaringPage />} />
                  <Route path="kontrak-kerja" element={<KontrakKerjaPage />} />
                  <Route path="surat-peringatan" element={<SuratPeringatanPage />} />
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
