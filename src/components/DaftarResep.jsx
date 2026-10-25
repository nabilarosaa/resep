import KartuResep from './KartuResep.jsx';

// Satu bagian berjudul berisi grid kartu (render list dengan .map + key unik)
function DaftarResep({ judul, daftar, onToggleFavorit, onHapus, aksi, className = 'mt-10' }) {
  return (
    <section className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold md:text-2xl">{judul}</h2>
        {aksi}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {daftar.map((r) => (
          <KartuResep key={r.id} resep={r} onToggleFavorit={onToggleFavorit} onHapus={onHapus} />
        ))}
      </div>
    </section>
  );
}

export default DaftarResep;
