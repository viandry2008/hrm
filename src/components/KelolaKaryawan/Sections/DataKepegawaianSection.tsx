import React from "react";

const KepegawaianSection = ({ updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">

      {/* ID Karyawan */}
      <div>
        <label className="font-semibold">ID Karyawan *</label>
        <input
          type="text"
          placeholder="ID otomatis"
          className="border p-2 w-full rounded bg-gray-100"
          readOnly
        />
      </div>

      {/* Divisi */}
      <div>
        <label className="font-semibold">Divisi *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("divisi", e.target.value)}
        >
          <option>-- Pilih Divisi --</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>Finance</option>
          <option>HR</option>
        </select>
      </div>

      {/* Jabatan */}
      <div>
        <label className="font-semibold">Jabatan *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("jabatan", e.target.value)}
        >
          <option>-- Pilih Jabatan --</option>
          <option>Supervisor</option>
          <option>Staff</option>
          <option>Manager</option>
        </select>
      </div>

      {/* Lokasi Kerja */}
      <div>
        <label className="font-semibold">Lokasi Kerja *</label>
        <input
          type="text"
          value="PT Godrej Consumer Products Inc"
          className="border p-2 w-full rounded bg-gray-100"
          readOnly
        />
      </div>

      {/* Tanggal Bergabung */}
      <div>
        <label className="font-semibold">Tanggal Bergabung *</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tanggalBergabung", e.target.value)}
        />
      </div>

      {/* Tanggal Kontrak */}
      <div>
        <label className="font-semibold">Tanggal Kontrak *</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tanggalKontrak", e.target.value)}
        />
      </div>

      {/* Selesai Kontrak */}
      <div>
        <label className="font-semibold">Selesai Kontrak *</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("selesaiKontrak", e.target.value)}
        />
      </div>

      {/* Grup */}
      <div>
        <label className="font-semibold">Grup *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("grup", e.target.value)}
        >
          <option>-- Pilih Grup ---</option>
          <option>A</option>
          <option>B</option>
        </select>
      </div>

      {/* Bagian */}
      <div>
        <label className="font-semibold">Bagian *</label>
        <input
          type="text"
          placeholder="Isi Bagian Karyawan"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("bagian", e.target.value)}
        />
      </div>

      {/* Golongan Karyawan */}
      <div>
        <label className="font-semibold">Golongan Karyawan *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("golongan", e.target.value)}
        >
          <option>-- Pilih Golongan Karyawan --</option>
          <option>I</option>
          <option>II</option>
          <option>III</option>
        </select>
      </div>

      {/* Status Marital */}
      <div>
        <label className="font-semibold">Status Marital *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("marital", e.target.value)}
        >
          <option>-- Pilih Status Marital --</option>
          <option>TK/0</option>
          <option>K/1</option>
          <option>K/2</option>
          <option>K/3</option>
          <option>K/3</option>
        </select>
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold">Email *</label>
        <input
          type="email"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("email", e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <label className="font-semibold">Password *</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("password", e.target.value)}
        />
      </div>

      {/* Referensi */}
      <div>
        <label className="font-semibold">Referensi</label>
        <input
          type="text"
          placeholder="Referensi"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("referensi", e.target.value)}
        />
      </div>

      {/* No SIO */}
      <div>
        <label className="font-semibold">No SIO</label>
        <input
          type="text"
          placeholder="32xxxxxx"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("noSio", e.target.value)}
        />
      </div>

    </div>
  );
};

export default KepegawaianSection;
