import React from "react";

const KendaraanSection = ({ updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <label>Plat Nomor</label>
        <input type="text" className="border p-2 w-full rounded" onChange={(e) => updateForm("plat", e.target.value)} />
      </div>
    </div>
  );
};

export default KendaraanSection;
