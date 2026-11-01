import { useState } from 'react';
import { KATEGORI } from '../data/resep.js';

function KartuResep({ resep, onToggleFavorit, onHapus }) {
  const [tampilDeskripsi, setTampilDeskripsi] = useState(false);
  const k = KATEGORI[resep.kategori] || KATEGORI.sarapan;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-primary/15 bg-white">
      {resep.foto ? (
        <img src={resep.foto} alt={'Foto hidangan ' + resep.judul} className="h-40 w-full object-cover" />
      ) : (
        <div className="flex h-40 items-center justify-center bg-primary/10 text-sm text-primary">Foto resep</div>
      )}

      <button
        type="button"
        onClick={() => onToggleFavorit(resep.id)}
        aria-pressed={resep.favorit}
        aria-label={resep.favorit ? 'Hapus dari favorit' : 'Jadikan favorit'}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow"
        style={{ color: resep.favorit ? '#ee6123' : '#999999' }}
      >
        {resep.favorit ? '♥' : '♡'}
      </button>

      <div className="p-5">
        <span
          className="rounded-full border px-3 py-0.5 text-sm"
          style={{ color: k.warna, background: k.latar, borderColor: k.warna }}
        >
          {k.label}
        </span>
        <h3 className="mt-3 text-lg font-bold">{resep.judul}</h3>
        <p className="mt-1 text-sm text-ink/70">{resep.waktu} menit &middot; {resep.porsi} porsi</p>

        {tampilDeskripsi && <p className="mt-3 text-sm">{resep.deskripsi}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a href={resep.halaman && resep.halaman !== '#' ? resep.halaman : '#resep/' + resep.id} className="font-semibold text-primary hover:underline">Lihat resep</a>
          <button
            type="button"
            onClick={() => setTampilDeskripsi(!tampilDeskripsi)}
            className="text-sm text-ink/70 hover:text-primary"
          >
            Deskripsi
          </button>
          <button
            type="button"
            onClick={() => onHapus(resep.id)}
            className="ml-auto text-sm text-[#C2487A] hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

export default KartuResep;
