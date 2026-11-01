import { KATEGORI } from '../data/resep.js';

const pecah = (teks) => (teks || '').split('\n').map((t) => t.trim()).filter(Boolean);

function DetailResep({ resep, onKembali }) {
  if (!resep) {
    return (
      <div className="mt-12 flex flex-col items-center gap-5 text-center">
        <h1 className="text-xl font-bold">Resep tidak ditemukan</h1>
        <button type="button" onClick={onKembali}
          className="rounded-full bg-primary px-8 py-3 font-semibold text-white hover:opacity-90">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const k = KATEGORI[resep.kategori] || KATEGORI.sarapan;
  const bahan = pecah(resep.bahan);
  const langkah = pecah(resep.langkah);

  return (
    <article>
      <button type="button" onClick={onKembali} className="font-semibold text-primary hover:underline">
        &larr; Kembali
      </button>

      {resep.foto ? (
        <img src={resep.foto} alt={'Foto hidangan ' + resep.judul}
          className="mt-4 h-64 w-full rounded-2xl object-cover md:h-80" />
      ) : (
        <div className="mt-4 flex h-64 items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-80">
          Foto resep
        </div>
      )}

      <span className="mt-6 inline-block rounded-full border px-3 py-0.5 text-sm"
        style={{ color: k.warna, background: k.latar, borderColor: k.warna }}>
        {k.label}
      </span>
      <h1 className="mt-3 text-2xl font-bold md:text-3xl">{resep.judul}</h1>
      <p className="mt-2">{resep.deskripsi}</p>
      <p className="mt-2 text-ink/70">{resep.waktu} menit &middot; {resep.porsi} porsi</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Bahan-bahan</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          {bahan.map((b, i) => <li key={i + b}>{b}</li>)}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Langkah Memasak</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          {langkah.map((l, i) => <li key={i + l}>{l}</li>)}
        </ol>
      </section>
    </article>
  );
}

export default DetailResep;
