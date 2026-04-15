const menuConfig = [
  {
    name: "Dashboard",
    path: "/dashboard",
    roles: ["HR", "KARYAWAN", "ATASAN"],
  },
  {
    name: "Kelola Karyawan",
    path: "/karyawan",
    roles: ["HR"],
  },
  {
    name: "Penggajian",
    path: "/penggajian",
    roles: ["HR"],
  },
  {
    name: "Kehadiran",
    path: "/kehadiran",
    roles: ["KARYAWAN"],
  },
  {
    name: "Cuti",
    path: "/cuti",
    roles: ["KARYAWAN", "HR"],
  },
  {
    name: "Approval Cuti",
    path: "/approval-cuti",
    roles: ["ATASAN"],
  },
];