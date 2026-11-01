import fotoPasta from '../../assets/shrimp-chicken-pasta-foto-resep-utama.webp';

export const KUNCI_DATA = 'resepku_data';
export const BATAS_BERANDA = 5;

export const KATEGORI = {
  sarapan:     { label: 'Sarapan',     warna: '#B8860B', latar: '#fff7e3' },
  makan_siang: { label: 'Makan Siang', warna: '#2F6DB5', latar: '#E6F0FB' },
  pasta:       { label: 'Pasta',       warna: '#7A4AB8', latar: '#EFE6FA' },
  dessert:     { label: 'Dessert',     warna: '#4A7A3C', latar: '#E3F2E1' },
  minuman:     { label: 'Minuman',     warna: '#C2487A', latar: '#FCE4E4' },
};

export const dataAwal = [
  {
    id: 1,
    judul: 'Shrimp Chicken Pasta',
    kategori: 'pasta',
    waktu: 40,
    porsi: 2,
    deskripsi: 'Pasta creamy dengan perpaduan udang dan ayam yang gurih',
    bahan: '1 bungkus pasta spaghetti\n150 gram udang\n100 gram ayam fillet\n300 ml susu full cream\n50 gram keju parut',
    langkah: 'Rebus pasta sampai matang\nMasak udang dan ayam\nBuat saus susu, campur semua bahan',
    foto: fotoPasta,
    halaman: 'detail_resep.html',
    favorit: true,
  },
  {
    id: 2,
    judul: 'Nasi Goreng Kampung',
    kategori: 'sarapan',
    waktu: 20,
    porsi: 2,
    deskripsi: 'Nasi goreng sederhana dengan bumbu bawang dan telur, cocok untuk sarapan.',
    bahan: '2 piring nasi putih\n2 butir telur\n3 siung bawang putih\nKecap manis',
    langkah: 'Tumis bawang putih\nMasukkan telur lalu nasi\nTambahkan kecap dan aduk rata',
    foto: null,
    halaman: '#',
    favorit: false,
  },
  {
    id: 3,
    judul: 'Ayam Lada Hitam',
    kategori: 'makan_siang',
    waktu: 30,
    porsi: 3,
    deskripsi: 'Ayam tumis saus lada hitam yang pedas gurih, enak dengan nasi hangat.',
    bahan: '300 gram ayam fillet\n1 bawang bombay\n2 sdm saus tiram\nLada hitam',
    langkah: 'Potong ayam dan tumis sampai matang\nTambahkan bawang bombay\nBumbui dengan saus tiram dan lada hitam',
    foto: null,
    halaman: '#',
    favorit: false,
  },
  {
    id: 4,
    judul: 'Pudding Cokelat',
    kategori: 'dessert',
    waktu: 45,
    porsi: 6,
    deskripsi: 'Pudding lembut rasa cokelat yang disajikan dingin.',
    bahan: '1 bungkus agar-agar\n500 ml susu\n3 sdm cokelat bubuk\nGula secukupnya',
    langkah: 'Campur semua bahan dan masak sampai mendidih\nTuang ke cetakan\nDinginkan di kulkas',
    foto: null,
    halaman: '#',
    favorit: false,
  },
  {
    id: 5,
    judul: 'Es Teh Lemon',
    kategori: 'minuman',
    waktu: 10,
    porsi: 4,
    deskripsi: 'Teh dingin segar dengan perasan lemon.',
    bahan: '4 kantong teh\n2 buah lemon\nGula dan es batu',
    langkah: 'Seduh teh lalu dinginkan\nTambahkan perasan lemon dan gula\nSajikan dengan es batu',
    foto: null,
    halaman: '#',
    favorit: false,
  },
];

export function filterResep(daftar, kata) {
  const kunci = kata.trim().toLowerCase();
  return daftar.filter((r) => r.judul.toLowerCase().includes(kunci));
}

export function urutkanTerbaru(daftar) {
  return daftar.slice().sort((a, b) => b.id - a.id);
}
