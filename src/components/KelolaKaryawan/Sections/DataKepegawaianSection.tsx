import React from "react";

const DataKepegawaianSection = ({ updateForm }: any) => {
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
          <option>IT</option>
          <option>Finance & Accounting</option>
          <option>HR & GA</option>
          <option>Warehouse</option>
          <option>Produksi</option>
          <option>Operasional</option>
          <option>Logistik</option>
        </select>
      </div>

      {/* Jabatan */}
      <div>
        <label className="font-semibold">Jabatan*</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("jabatan", e.target.value)}
        >
          <option>-- Pilih Jabatan --</option>
          <option>Staff</option>
          <option>Leader</option>
          <option>Supervisor</option>
          <option>Manager</option>
          <option>Senior Manager</option>
          <option>General Manager</option>
          <option>Head</option>
          <option>Asisten Direktur</option>
          <option>Direktur</option>
        </select>
      </div>

      {/* Bagian */}
      <div>
        <label className="font-semibold">Bagian*</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("bagian", e.target.value)}
        >
          <option>-- Pilih Bagian ---</option>
          <option>IT Support</option>
          <option>IT Helpdesk</option>
          <option>IT Management</option>
          <option>System Analyst</option>
          <option>Infrastructure & Network</option>
          <option>Database Administrator</option>
          <option>Back End Developer</option>
          <option>Front End Developer</option>
          <option>Full Stack Developer</option>
          <option>Mobile Developer</option>
          <option>AI Engineer</option>
          <option>Product Owner</option>
        </select>
      </div>

      {/*Kategori Karyawan */}
      <div>
        <label className="font-semibold">Lokasi Kerja*</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("lokasi", e.target.value)}
        >
          <option>-- Pilih Lokasi Kerja --</option>
          <option>PT Proven Force Indonesia</option>
        </select>
      </div>

      {/* Tanggal Bergabung */}
      <div>
        <label className="font-semibold">Tanggal Bergabung*</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tanggalBergabung", e.target.value)}
        />
      </div>

      {/* Tanggal Kontrak */}
      <div>
        <label className="font-semibold">Tanggal Kontrak*</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tanggalKontrak", e.target.value)}
        />
      </div>

      {/* Selesai Kontrak */}
      <div>
        <label className="font-semibold">Selesai Kontrak*</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("selesaiKontrak", e.target.value)}
        />
      </div>


      {/* Grup */}
      <div>
        <label className="font-semibold">Grup</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("grup", e.target.value)}
        >
          <option>-- Pilih Grup ---</option>
          <option>A</option>
          <option>B</option>
        </select>
      </div>

      {/*Kategori Karyawan */}
      <div>
        <label className="font-semibold">Kategori Karyawan*</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("kategori", e.target.value)}
        >
          <option>-- Pilih Kategori Karyawan --</option>
          <option>Magang</option>
          <option>PKWT</option>
          <option>PKWTT</option>
          <option>KHL</option>
        </select>
      </div>

      {/* Status Marital */}
      <div>
        <label className="font-semibold">Status Marital*</label>
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

export default DataKepegawaianSection;
