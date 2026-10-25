import { useState } from 'react';
import logo from '../../assets/resepku.svg';

const MENU = [
  { label: 'Beranda', href: 'index.html', aktif: true },
  { label: 'Resep Saya', href: 'resep_saya.html' },
  { label: 'Favorit', href: '#' },
  { label: 'Profil', href: '#' },
];

function Navbar({ onKlikBeranda }) {
  const [terbuka, setTerbuka] = useState(false);

  function klikBeranda(e) {
    e.preventDefault();
    setTerbuka(false);
    onKlikBeranda();
  }

  return (
    <header className="relative mx-4 mt-5">
      <nav className="mx-auto flex h-14 w-[90vw] items-center justify-between rounded-full bg-primary/10 px-6 font-semibold md:h-16 md:w-[85vw] lg:w-[57vw] lg:justify-around lg:px-0">
        <a href="index.html" onClick={klikBeranda}>
          <img src={logo} alt="Logo ResepKu" className="max-w-[110px] md:max-w-[150px]" />
        </a>

        <div className="hidden items-center gap-8 text-primary md:flex">
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              onClick={m.aktif ? klikBeranda : undefined}
              className={'border-b-2 ' + (m.aktif ? 'border-primary' : 'border-transparent hover:border-primary')}
            >
              {m.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={terbuka}
          onClick={() => setTerbuka(!terbuka)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span className="block h-[3px] w-6 rounded bg-primary"></span>
          <span className="block h-[3px] w-6 rounded bg-primary"></span>
          <span className="block h-[3px] w-6 rounded bg-primary"></span>
        </button>
      </nav>

      {terbuka && (
        <div className="absolute left-1/2 top-16 z-50 flex w-[90vw] max-w-xs -translate-x-1/2 flex-col items-center gap-5 rounded-3xl bg-cream py-8 font-semibold text-primary shadow-xl md:hidden">
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              onClick={m.aktif ? klikBeranda : undefined}
              className={m.aktif ? 'border-b-2 border-primary' : ''}
            >
              {m.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
