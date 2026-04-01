import { Card, CardContent } from '@/components/ui/card';

const TabIdentitasKendaraan = () => {
  return (
    <Card>
      <CardContent className="p-6 grid grid-cols-2 gap-4">
        <Field label="Nomor SIM" value="B1234567" />
        <Field label="Nomor STNK" value="D1234ABC" />
      </CardContent>
    </Card>
  );
};

export default TabIdentitasKendaraan;

const Field = ({ label, value }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);