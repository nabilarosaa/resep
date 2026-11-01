import { useState, useEffect } from 'react';
import { cariResepOnline, ambilDetailResep } from '../api/api.js';

const KATA_AWAL = ''; 

function InspirasiResep({ onSimpan, sudahAda }) {
  const [kataInput, setKataInput] = useState(KATA_AWAL);
  const [kataCari, setKataCari] = useState(KATA_AWAL);
  const [status, setStatus] = useState('loading');
  const [hasil, setHasil] = useState([]);
  const [pesanError, setPesanError] = useState('');
  const [percobaan, setPercobaan] = useState(0); 
  const [menyimpanId, setMenyimpanId] = useState(null); 
  const [errorSimpan, setErrorSimpan] = useState('');

  useEffect(() => {
    const kontrol = new AbortController();
    setStatus('loading');

    cariResepOnline(kataCari, kontrol.signal)
      .then((data) => {
        setHasil(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; 
        setPesanError(err.message || 'Terjadi kesalahan tak dikenal.');
        setStatus('error');
      });

    return () => kontrol.abort();
  }, [kataCari, percobaan]);

  async function simpan(r) {
    setMenyimpanId(r.idApi);
    setErrorSimpan('');
    try {
      const lengkap = await ambilDetailResep(r.idApi);
      onSimpan(lengkap);
    } catch (err) {
      setErrorSimpan(`Gagal menyimpan "${r.judul}": ${err.message}`);
    }
    setMenyimpanId(null);
  }

  function cari(e) {
    e.preventDefault();
    setKataCari(kataInput.trim());
  }

  return (
    <section className="mt-12" aria-labelledby="judul-inspirasi">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="judul-inspirasi" className="text-xl font-bold md:text-2xl">Inspirasi resep</h2>
          <p className="text-sm text-ink/70">Simpan yang kamu suka ke ResepKu</p>
        </div>
        <form onSubmit={cari} className="flex w-full gap-3 md:w-auto">
          <input
            type="text"
            value={kataInput}
            onChange={(e) => setKataInput(e.target.value)}
            placeholder="Cari resep (mis. ayam)"
            aria-label="Cari inspirasi resep"
            className="w-full rounded-full border border-primary/30 bg-white px-5 py-2.5 outline-none focus:border-primary md:w-64"
          />
          <button type="submit"
            className="whitespace-nowrap rounded-full border border-primary px-5 py-2.5 font-semibold text-primary hover:bg-primary/10">
            Cari
          </button>
        </form>
      </div>

      <div className="mt-4">
        {status === 'loading' && (
          <div role="status" aria-live="polite">
            <p className="mb-3 flex items-center gap-2 text-primary">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
              Memuat inspirasi resep...
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse overflow-hidden rounded-2xl border border-primary/15 bg-white">
                  <div className="h-40 bg-primary/10"></div>
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/3 rounded bg-primary/10"></div>
                    <div className="h-5 w-3/4 rounded bg-primary/10"></div>
                    <div className="h-4 w-1/2 rounded bg-primary/10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'error' && (
          <div role="alert" className="flex flex-col items-center gap-4 rounded-2xl border border-red-300 bg-red-50 px-4 py-10 text-center">
            <h3 className="text-lg font-bold text-red-700">Gagal memuat inspirasi resep</h3>
            <p className="text-sm text-red-700">{pesanError}</p>
            <p className="text-sm">Periksa koneksi internetmu, lalu coba lagi.</p>
            <button type="button" onClick={() => setPercobaan(percobaan + 1)}
              className="rounded-full bg-primary px-8 py-3 font-semibold text-white hover:opacity-90">
              Coba Lagi
            </button>
          </div>
        )}

        {status === 'success' && hasil.length === 0 && (
          <p className="rounded-2xl bg-primary/10 px-4 py-10 text-center">
            Tidak ada inspirasi untuk "{kataCari}". Coba kata kunci lain, misalnya "ayam".
          </p>
        )}

        {errorSimpan && (
          <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorSimpan} Silakan coba lagi.</p>
        )}

        {status === 'success' && hasil.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.map((r) => {
              const tersimpan = sudahAda(r.judul);
              return (
                <article key={r.idApi} className="overflow-hidden rounded-2xl border border-primary/15 bg-white">
                  {r.foto ? (
                    <img src={r.foto} alt={'Foto hidangan ' + r.judul} loading="lazy" className="h-40 w-full object-cover" />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-primary/10 text-sm text-primary">Foto resep</div>
                  )}
                  <div className="p-5">
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-sm text-primary">
                      {r.asal}
                    </span>
                    <h3 className="mt-3 text-lg font-bold">{r.judul}</h3>
                    <p className="mt-1 text-sm text-ink/70">{r.waktu} menit &middot; {r.porsi} porsi</p>
                    <button
                      type="button"
                      disabled={tersimpan || menyimpanId !== null}
                      onClick={() => simpan(r)}
                      className="mt-4 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {tersimpan ? 'Sudah tersimpan' : menyimpanId === r.idApi ? 'Menyimpan...' : 'Simpan ke ResepKu'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default InspirasiResep;
