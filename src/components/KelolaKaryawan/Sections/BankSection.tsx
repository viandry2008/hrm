import React from "react";

const BankSection = ({ updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <label>Nama Bank</label>
        <input type="text" className="border p-2 w-full rounded" onChange={(e) => updateForm("bank", e.target.value)} />
      </div>
    </div>
  );
};

export default BankSection;