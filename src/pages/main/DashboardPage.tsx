import { useState, useEffect } from "react";
import {
  CalendarCheck,
  ClipboardList,
  Coffee,
  MapPin,
  ShieldCheck,
  Briefcase,
  Users,
  Building2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar as ReactCalendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function formatTanggalIndonesia(date: Date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { username } = useAuth();
  const greeting = getGreeting();
  const today = formatTanggalIndonesia(new Date());

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const timeString = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const cutiDates = [new Date(2025, 6, 22), new Date(2025, 6, 24)];
  const izinDates = [new Date(2025, 6, 25)];
  const liburNasional = [new Date(2025, 6, 23)];

  const allModifiers = {
    cuti: cutiDates,
    izin: izinDates,
    libur: liburNasional,
  };

  const modifiersClassNames = {
    cuti: "bg-yellow-300 text-black font-semibold",
    izin: "bg-orange-300 text-black font-semibold",
    libur: "bg-red-400 text-white font-semibold",
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState({
    date: "",
    items: [] as string[],
  });

  function handleDateSelect(d: Date | undefined) {
    setDate(d);
    if (!d) return;

    const agenda: string[] = [];
    if (cutiDates.some(cd => cd.toDateString() === d.toDateString())) agenda.push("Cuti: Meida, Andi");
    if (izinDates.some(id => id.toDateString() === d.toDateString())) agenda.push("Izin: Joko");
    if (liburNasional.some(ld => ld.toDateString() === d.toDateString())) agenda.push("Libur Nasional");

    if (agenda.length > 0) {
      setSelectedAgenda({ date: formatTanggalIndonesia(d), items: agenda });
      setOpenDialog(true);
    }
  }

  const topStats = [
    { label: "Total Karyawan", value: "10" },
    { label: "Hari Kerja", value: "5" },
    { label: "Shift", value: "5" },
    { label: "Tepat Waktu", value: "0" },
    { label: "Terlambat", value: "0" },
    { label: "Tidak/Belum Masuk", value: "10" },
    { label: "Izin", value: "0" },
    { label: "Cuti", value: "0" },
    { label: "Libur", value: "0" },
  ];

  const summaryStats = [
    { title: "Total Karyawan", value: "10", icon: Users },
    { title: "Divisi", value: "3", icon: Building2 },
    { title: "Admin", value: "1", icon: ShieldCheck },
    { title: "Pola Kerja", value: "5", icon: Briefcase },
    { title: "Lokasi Kehadiran", value: "2", icon: MapPin },
    { title: "Presensi", value: "470", icon: ClipboardList },
    { title: "Izin", value: "3", icon: Coffee },
    { title: "Cuti", value: "6", icon: CalendarCheck },
  ];

  return (
    <main className="flex-1 overflow-auto pb-6 px-4 md:px-6 flex flex-col min-h-screen">
      <div className="mb-4 text-sm text-gray-600">
        <span className="text-blue-600 font-medium">Home</span> / <span>Dashboard</span>
      </div>

      <div className="mt-2 mb-4">
        <h2 className="text-2xl font-bold text-blue-600">
          {greeting}, {username || "Pengguna"}
        </h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          Selamat Beraktivitas. {today} • <Clock className="w-4 h-4 text-gray-700" />
          <span className="text-gray-700">{timeString}</span>
        </p>
      </div>

      <div className="bg-white border rounded-md p-4 flex justify-between items-center shadow-sm mb-6">
        <p className="text-sm">
          Selamat mencoba masa <strong>Trial 14 hari</strong>, jika ada pertanyaan <a href="#" className="text-blue-600 underline">kami siap membantu</a>.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4">
          Upgrade Paket Langganan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[6.5fr_1.5fr] gap-4 mb-6">
        <Card className="bg-[rgb(30,64,175)] text-white p-10 flex flex-col lg:flex-row items-center gap-10 h-full min-h-[280px]">
          <img src="/public/schedule.svg" alt="Ilustrasi Meeting" className="w-36 h-auto" />
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <h2 className="text-2xl font-semibold">Halo Meida 👋</h2>
            <p className="text-base leading-relaxed">
              Agendakan jadwal meeting dan konsultasi gratis melalui Zoom Meeting selama 45 menit untuk mendapatkan penjelasan fitur dan harga terbaik.
            </p>
            <div>
              <Button className="bg-white hover:bg-gray-100 text-blue-700 font-semibold text-sm">
                JADWALKAN SEKARANG
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white p-4 shadow-sm flex flex-col justify-between h-fit w-full max-w-sm mx-auto lg:mx-0">
          {/* <ReactCalendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md [&_.rdp]:text-[16px] [&_.rdp-day]:text-base [&_.rdp-head_cell]:text-sm [&_.rdp-caption_label]:text-lg [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:border-blue-500 [&_.rdp-day[data-weekend='true']]:text-red-500"
            style={{ width: "100%", padding: "8px" }}
            dayNamesShort={["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"]}
            weekendDays={[6, 0]}
            showNeighboringMonth={false}
            showOutsideDays={false}
            modifiers={allModifiers}
            modifiersClassNames={modifiersClassNames}
          /> */}
        </Card>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">Agenda pada {selectedAgenda.date}</DialogTitle>
          </DialogHeader>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
            {selectedAgenda.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center gap-4 mb-6">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="--Divisi--" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua</SelectItem>
            <SelectItem value="hrd">HRD</SelectItem>
            <SelectItem value="it">IT</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{today}</span>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 text-center gap-4">
          {topStats.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap">{item.label}</p>
              <p className="text-lg font-bold text-indigo-700">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((item) => (
          <Card key={item.title} className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center text-xs text-gray-500 border-t pt-4">
        © 2025 Proven Force Indonesia, All Rights Reserved.
      </footer>
    </main>
  );
}
