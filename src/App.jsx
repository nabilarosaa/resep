import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import HeaderBeranda from './components/HeaderBeranda.jsx';
import DaftarResep from './components/DaftarResep.jsx';
import KosongResep from './components/KosongResep.jsx';
import FormTambahResep from './components/FormTambahResep.jsx';
import Notifikasi from './components/Notifikasi.jsx';
import DetailResep from './components/DetailResep.jsx';
import InspirasiResep from './components/InspirasiResep.jsx';
import {
  KUNCI_DATA, BATAS_BERANDA, dataAwal, filterResep, urutkanTerbaru,
} from './data/resep.js';

function muatData() {
  try {
    const tersimpan = localStorage.getItem(KUNCI_DATA);
    if (tersimpan) {
      return JSON.parse(tersimpan).map((r) => {
        const awal = dataAwal.find((d) => d.id === r.id);
        return awal && r.foto !== null ? { ...r, foto: awal.foto } : r;
      });
    }
  } catch (e) {
    
  }
  return dataAwal;
}

function halamanDariHash() {
  const hash = window.location.hash;
  if (hash === '#tambah') return 'tambah';
  if (hash.startsWith('#resep/')) return 'detail';
  return 'beranda';
}

function App() {
  const [daftarResep, setDaftarResep] = useState(muatData);
  const [halaman, setHalaman] = useState(halamanDariHash);
  const [kata, setKata] = useState('');
  const [notif, setNotif] = useState('');
  const timer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_DATA, JSON.stringify(daftarResep));
    } catch (e) {
      // abaikan
    }
  }, [daftarResep]);

  useEffect(() => {
    const ikutiHash = () => setHalaman(halamanDariHash());
    window.addEventListener('hashchange', ikutiHash);
    return () => window.removeEventListener('hashchange', ikutiHash);
  }, []);

  function tampilNotifikasi(teks) {
    setNotif(teks);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotif(''), 1500);
  }

  function bukaHalaman(nama) {
    window.location.hash = nama === 'tambah' ? 'tambah' : '';
    history.replaceState(null, '', nama === 'tambah' ? '#tambah' : window.location.pathname);
    setHalaman(nama);
  }

  function tambahResep(resepBaru) {
    setDaftarResep([...daftarResep, resepBaru]);
    bukaHalaman('beranda');
    tampilNotifikasi('Resep berhasil disimpan!');
  }

  function toggleFavorit(id) {
    const target = daftarResep.find((r) => r.id === id);
    setDaftarResep(daftarResep.map((r) => (r.id === id ? { ...r, favorit: !r.favorit } : r)));
    tampilNotifikasi(target.favorit ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit');
  }

  function hapusResep(id) {
    const target = daftarResep.find((r) => r.id === id);
    if (!confirm('Hapus resep "' + target.judul + '"?')) return;
    setDaftarResep(daftarResep.filter((r) => r.id !== id));
    tampilNotifikasi('Resep dihapus');
  }

  function judulSudahAda(judul) {
    const kunci = judul.trim().toLowerCase();
    return daftarResep.some((r) => r.judul.toLowerCase() === kunci);
  }

  // Menyimpan resep dari API (data lengkap: bahan, langkah, durasi, porsi) ke koleksi pribadi.
  function simpanDariApi(r) {
    if (judulSudahAda(r.judul)) return;
    setDaftarResep([...daftarResep, {
      id: Date.now(),
      judul: r.judul,
      kategori: r.kategori,
      waktu: r.waktu,
      porsi: r.porsi,
      deskripsi: r.deskripsi,
      bahan: r.bahan,
      langkah: r.langkah,
      foto: r.foto,
      halaman: '#',
      favorit: false,
    }]);
    tampilNotifikasi('Resep disimpan ke ResepKu!');
  }

  const kataCari = kata.trim();
  const hasilCari = urutkanTerbaru(filterResep(daftarResep, kata));
  const terbaru = urutkanTerbaru(daftarResep).slice(0, BATAS_BERANDA);
  const favorit = urutkanTerbaru(daftarResep.filter((r) => r.favorit)).slice(0, BATAS_BERANDA);

  return (
    <>
      <Navbar onKlikBeranda={() => bukaHalaman('beranda')} />

      {halaman === 'detail' ? (
        <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
          <DetailResep
            resep={daftarResep.find((r) => String(r.id) === window.location.hash.slice('#resep/'.length))}
            onKembali={() => bukaHalaman('beranda')}
          />
        </main>
      ) : halaman === 'tambah' ? (
        <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
          <FormTambahResep
            onTambah={tambahResep}
            onBatal={() => bukaHalaman('beranda')}
            judulSudahAda={judulSudahAda}
          />
        </main>
      ) : (
        <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
          <HeaderBeranda
            jumlah={daftarResep.length}
            kata={kata}
            onUbahKata={setKata}
            onTambah={() => bukaHalaman('tambah')}
          />

          {daftarResep.length === 0 ? (
            <KosongResep
              pesan="Belum ada data resep. Yuk, tambahkan resep pertamamu!"
              teksTombol="Tambah Resep"
              onKlik={() => bukaHalaman('tambah')}
            />
          ) : kataCari !== '' ? (
            hasilCari.length > 0 ? (
              <DaftarResep
                judul="Hasil pencarian"
                daftar={hasilCari}
                onToggleFavorit={toggleFavorit}
                onHapus={hapusResep}
              />
            ) : (
              <p className="mt-12 text-center">Tidak ada resep yang cocok. Coba kata kunci lain.</p>
            )
          ) : (
            <>
              <DaftarResep
                judul="Resep terbaru"
                daftar={terbaru}
                onToggleFavorit={toggleFavorit}
                onHapus={hapusResep}
                aksi={
                  <a href="resep_saya.html"
                    className="rounded-full border border-primary px-5 py-2 font-semibold text-primary hover:bg-primary/10">
                    Lihat semua resep
                  </a>
                }
              />

              {favorit.length > 0 ? (
                <DaftarResep
                  judul="Resep favorit"
                  daftar={favorit}
                  onToggleFavorit={toggleFavorit}
                  onHapus={hapusResep}
                  className="mt-12"
                />
              ) : (
                <section className="mt-12">
                  <h2 className="text-xl font-bold md:text-2xl">Resep favorit</h2>
                  <div className="mt-4">
                    <KosongResep
                      kotak
                      pesan="Belum ada resep favorit di sini. Pilih resep favoritmu!"
                      teksTombol="Lihat Resep Saya"
                      onKlik={() => { window.location.href = 'resep_saya.html'; }}
                    />
                  </div>
                </section>
              )}
            </>
          )}

          <InspirasiResep onSimpan={simpanDariApi} sudahAda={judulSudahAda} />
        </main>
      )}

      <Notifikasi teks={notif} />
    </>
  );
}

export default App;
