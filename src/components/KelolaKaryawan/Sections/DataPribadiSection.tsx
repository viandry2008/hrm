import React from "react";

const DataPribadiSection = ({ formData, updateForm }: any) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">

      {/* Foto */}
      <div>
        <label className="font-semibold">Foto Karyawan</label>
        <input 
          type="file"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("foto", e.target.files?.[0])}
        />
      </div>

      {/* Nama */}
      <div>
        <label className="font-semibold">Nama Karyawan *</label>
        <input
          type="text"
          placeholder="Nama Karyawan"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("nama", e.target.value)}
        />
      </div>

      {/* Nomor Telepon */}
      <div>
        <label className="font-semibold">Nomor Telepon *</label>
        <input
          type="text"
          placeholder="08xxx"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("telepon", e.target.value)}
        />
      </div>

      {/* Tempat Lahir */}
      <div>
        <label className="font-semibold">Tempat Lahir *</label>
        <input
          type="text"
          placeholder="Tempat Lahir"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tempatLahir", e.target.value)}
        />
      </div>

      {/* Tanggal Lahir */}
      <div>
        <label className="font-semibold">Tanggal Lahir *</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("tanggalLahir", e.target.value)}
        />
      </div>

      {/* Jenis Kelamin */}
      <div>
        <label className="font-semibold">Jenis Kelamin *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("jenisKelamin", e.target.value)}
        >
          <option>-- Pilih Jenis Kelamin --</option>
          <option>Laki-Laki</option>
          <option>Perempuan</option>
        </select>
      </div>

         {/* Alamat KTP */}
      <div>
        <label className="font-semibold">Alamat KTP *</label>
        <textarea
          placeholder=""
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("alamatKTP", e.target.value)}
        />
        <p className="text-xs italic">
          *) Isi alamat sesuai KTP
        </p>
      </div>

       {/* Alamat Domisili */}
      <div>
        <label className="font-semibold">Alamat Domisili *</label>
        <textarea
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("alamatDomisili", e.target.value)}
        />
        <p className="text-xs italic">
          *) Jika mengisi domisili harap input nama kota
        </p>
      </div>

      {/* Pendidikan */}
      <div>
        <label className="font-semibold">Pendidikan *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("pendidikan", e.target.value)}
        >
          <option>-- Pilih Pendidikan --</option>
          <option>SD</option>
          <option>SMP</option>
          <option>SMA/SMK</option>
          <option>D1</option>
          <option>D2</option>
          <option>D3</option>
          <option>S1</option>
          <option>S2</option>
          <option>S3</option>
        </select>
      </div>

      {/* Agama */}
      <div>
        <label className="font-semibold">Agama *</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("agama", e.target.value)}
        >
          <option>-- Pilih Agama --</option>
          <option>Islam</option>
          <option>Kristen</option>
          <option>Katolik</option>
          <option>Hindu</option>
          <option>Buddha</option>
          <option>Konghucu</option>
          <option>Atheis</option>
        </select>
      </div>

      {/* Nama Suami/Istri */}
      <div>
        <label className="font-semibold">Nama Suami/Istri</label>
        <input
          type="text"
          placeholder="contoh: nama1, nama2, dst"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("namaSuamiIstri", e.target.value)}
        />
      </div>

      {/* Nama Anak */}
      <div>
        <label className="font-semibold">Nama Anak</label>
        <input
          type="text"
          placeholder="Contoh: Nama1, Nama2, dst"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("namaAnak", e.target.value)}
        />
      </div>

      {/* Jumlah Anak */}
      <div>
        <label className="font-semibold">Jumlah Anak</label>
        <input
          type="number"
          placeholder="Total jumlah anak"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("jumlahAnak", e.target.value)}
        />
      </div>

      {/* Nama Bapak */}
      <div>
        <label className="font-semibold">Nama Bapak</label>
        <input
          type="text"
          placeholder="Nama Bapak"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("namaBapak", e.target.value)}
        />
      </div>

      {/* Nama Ibu */}
      <div>
        <label className="font-semibold">Nama Ibu</label>
        <input
          type="text"
          placeholder="Nama Ibu"
          className="border p-2 w-full rounded"
          onChange={(e) => updateForm("namaIbu", e.target.value)}
        />
      </div>

    </div>
  );
};

export default DataPribadiSection;
