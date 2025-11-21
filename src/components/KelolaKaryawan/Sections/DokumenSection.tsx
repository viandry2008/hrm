import React from "react";

const DokumenSection = ({ updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <label>Upload KTP</label>
        <input type="file" className="border p-2 w-full rounded" onChange={(e) => updateForm("ktp", e.target.files?.[0])} />
      </div>
    </div>
  );
};

export default DokumenSection;