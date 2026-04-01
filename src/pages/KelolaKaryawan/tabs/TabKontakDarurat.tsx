import { Card, CardContent } from '@/components/ui/card';

const TabKontakDarurat = () => {
  return (
    <Card>
      <CardContent className="p-6 grid grid-cols-2 gap-4">
        <Field label="Nama" value="Ibu Andi" />
        <Field label="Hubungan" value="Orang Tua" />
        <Field label="No HP" value="08123456789" />
      </CardContent>
    </Card>
  );
};

export default TabKontakDarurat;

const Field = ({ label, value }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);