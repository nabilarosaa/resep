function Notifikasi({ teks }) {
  if (!teks) return null;
  return (
    <div
      role="status"
      className="fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-xl"
    >
      {teks}
    </div>
  );
}

export default Notifikasi;
