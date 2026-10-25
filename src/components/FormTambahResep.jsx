import { useState } from 'react';

const FORM_KOSONG = {
  judul: '',
  kategori: 'sarapan',
  waktu: '',
  porsi: '',
  deskripsi: '',
  bahan: '',
  langkah: '',
};

const input = 'w-full rounded-xl border px-4 py-3 outline-none focus:border-primary ';

function Pesan({ teks }) {
  return teks ? <p className="mt-1 text-sm text-red-600">{teks}</p> : null;
}

function FormTambahResep({ onTambah, onBatal, judulSudahAda }) {
  const [form, setForm] = useState(FORM_KOSONG);
  const [error, setError] = useState({});

  function ubah(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error[name]) setError({ ...error, [name]: '' });
  }

  function validasi() {
    const e = {};
    if (form.judul.trim().length < 3) e.judul = 'Judul hidangan minimal 3 karakter.';
    else if (judulSudahAda(form.judul)) e.judul = 'Resep dengan judul ini sudah ada.';
    if (Number(form.waktu) < 1) e.waktu = 'Waktu masak minimal 1 menit.';
    if (Number(form.porsi) < 1) e.porsi = 'Jumlah porsi minimal 1.';
    if (form.deskripsi.trim() === '') e.deskripsi = 'Deskripsi singkat tidak boleh kosong.';
    if (form.bahan.trim() === '') e.bahan = 'Daftar bahan tidak boleh kosong.';
    if (form.langkah.trim() === '') e.langkah = 'Langkah memasak tidak boleh kosong.';
    return e;
  }

  function kirim(e) {
    e.preventDefault();
    const hasil = validasi();
    setError(hasil);
    if (Object.keys(hasil).length > 0) return;

    onTambah({
      id: Date.now(),
      judul: form.judul.trim(),
      kategori: form.kategori,
      waktu: Number(form.waktu),
      porsi: Number(form.porsi),
      deskripsi: form.deskripsi.trim(),
      bahan: form.bahan.trim(),
      langkah: form.langkah.trim(),
      foto: null,
      halaman: '#',
      favorit: false,
    });
    setForm(FORM_KOSONG);
  }

  const warna = (nama) => (error[nama] ? 'border-red-600' : 'border-primary/30');

  return (
    <>
      <h1 className="text-2xl font-bold md:text-3xl">Tambah Resep</h1>
      <p className="mt-1">Isi detail resepmu, lalu simpan.</p>

      <form
        onSubmit={kirim}
        noValidate
        className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-primary/15 bg-white p-6 md:grid-cols-2 md:p-8"
      >
        <div className="md:col-span-2">
          <label htmlFor="judul" className="mb-2 block font-semibold">Judul</label>
          <input type="text" id="judul" name="judul" value={form.judul} onChange={ubah}
            placeholder="Judul hidangan" className={input + warna('judul')} />
          <Pesan teks={error.judul} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="kategori" className="mb-2 block font-semibold">Kategori</label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}
            className={input + 'bg-white border-primary/30'}>
            <option value="sarapan">Sarapan</option>
            <option value="makan_siang">Makan Siang</option>
            <option value="pasta">Pasta</option>
            <option value="dessert">Dessert</option>
            <option value="minuman">Minuman</option>
          </select>
        </div>

        <div>
          <label htmlFor="waktu" className="mb-2 block font-semibold">Waktu Masak (menit)</label>
          <input type="number" id="waktu" name="waktu" min="1" value={form.waktu} onChange={ubah}
            placeholder="Contoh: 20" className={input + warna('waktu')} />
          <Pesan teks={error.waktu} />
        </div>

        <div>
          <label htmlFor="porsi" className="mb-2 block font-semibold">Porsi</label>
          <input type="number" id="porsi" name="porsi" min="1" value={form.porsi} onChange={ubah}
            placeholder="Masukkan jumlah porsi" className={input + warna('porsi')} />
          <Pesan teks={error.porsi} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="deskripsi" className="mb-2 block font-semibold">Deskripsi Singkat</label>
          <textarea id="deskripsi" name="deskripsi" rows="3" value={form.deskripsi} onChange={ubah}
            placeholder="Masukkan deskripsi singkat" className={input + warna('deskripsi')} />
          <Pesan teks={error.deskripsi} />
        </div>

        <div>
          <label htmlFor="bahan" className="mb-2 block font-semibold">Daftar Bahan</label>
          <textarea id="bahan" name="bahan" rows="7" value={form.bahan} onChange={ubah}
            placeholder="Masukkan daftar bahan" className={input + warna('bahan')} />
          <Pesan teks={error.bahan} />
        </div>

        <div>
          <label htmlFor="langkah" className="mb-2 block font-semibold">Langkah Memasak</label>
          <textarea id="langkah" name="langkah" rows="7" value={form.langkah} onChange={ubah}
            placeholder="Masukkan langkah memasak" className={input + warna('langkah')} />
          <Pesan teks={error.langkah} />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end md:col-span-2">
          <button type="button" onClick={onBatal}
            className="rounded-full border border-primary px-8 py-3 text-center font-semibold text-primary hover:bg-primary/10">
            Batal
          </button>
          <button type="submit"
            className="rounded-full bg-primary px-8 py-3 font-semibold text-white hover:opacity-90">
            Tambah
          </button>
        </div>
      </form>
    </>
  );
}

export default FormTambahResep;
