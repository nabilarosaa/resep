function KosongResep({ pesan, teksTombol, onKlik, kotak = false }) {
  return (
    <div
      className={
        'flex flex-col items-center gap-5 text-center ' +
        (kotak ? 'rounded-2xl bg-primary/10 px-4 py-10' : 'mt-12')
      }
    >
      <h3 className="px-4 text-lg font-bold">{pesan}</h3>
      <button
        type="button"
        onClick={onKlik}
        className="rounded-full bg-primary px-8 py-3 font-semibold text-white hover:opacity-90"
      >
        {teksTombol}
      </button>
    </div>
  );
}

export default KosongResep;
