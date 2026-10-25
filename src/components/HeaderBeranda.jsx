function HeaderBeranda({ jumlah, kata, onUbahKata, onTambah }) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Halo, User!</h1>
        <p className="mt-1">Mau masak apa hari ini?</p>
        <p className="mt-1 text-sm text-ink/70">Total {jumlah} resep tersimpan</p>
      </div>
      <div className="flex w-full gap-3 md:w-auto">
        {jumlah > 0 && (
          <input
            type="text"
            value={kata}
            onChange={(e) => onUbahKata(e.target.value)}
            placeholder="Cari resep"
            aria-label="Cari resep"
            className="w-full rounded-full border border-primary/30 bg-white px-5 py-3 outline-none focus:border-primary md:w-72"
          />
        )}
        <button
          type="button"
          onClick={onTambah}
          className="whitespace-nowrap rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Tambah Resep
        </button>
      </div>
    </section>
  );
}

export default HeaderBeranda;
