import React from "react";

const KontakSection = ({ updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <label>No. HP</label>
        <input type="text" className="border p-2 w-full rounded" onChange={(e) => updateForm("hp", e.target.value)} />
      </div>
    </div>
  );
};

export default KontakSection;