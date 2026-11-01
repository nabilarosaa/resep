// Repo: https://github.com/Aldikurniawan19/api-resep-masakan
const BASE_URL = 'https://api-resep-masakan.vercel.app/api/v1';

async function ambilJson(alamat, signal) {
  let res;
  try {
    res = await fetch(alamat, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('Tidak bisa terhubung ke server.'); 
  }
  if (!res.ok) throw new Error(`Server membalas dengan status ${res.status}`);
  const json = await res.json();
  return json.data ?? json;
}

export async function cariResepOnline(kata, signal) {
  const alamat = `${BASE_URL}/recipes?limit=6` + (kata ? `&search=${encodeURIComponent(kata)}` : '');
  const data = await ambilJson(alamat, signal);
  return (Array.isArray(data) ? data : []).map(ubahRingkasan);
}

export async function ambilDetailResep(id) {
  const d = await ambilJson(`${BASE_URL}/recipes/${encodeURIComponent(id)}`);
  return ubahDetail(d);
}

const KESULITAN = { EASY: 'Mudah', MEDIUM: 'Sedang', HARD: 'Sulit' };

function tentukanKategori(r) {
  const nama = ((r.category && r.category.name) || '').toLowerCase();
  if (nama.includes('sarapan')) return 'sarapan';
  if (nama.includes('pasta') || nama.includes('mie')) return 'pasta';
  if (nama.includes('dessert') || nama.includes('kue') || nama.includes('manis') || nama.includes('camilan')) return 'dessert';
  if (nama.includes('minuman') || nama.includes('es ')) return 'minuman';
  return 'makan_siang';
}

function ubahRingkasan(r) {
  return {
    idApi: r.id,
    judul: r.title || r.name,
    asal: r.origin || (r.cuisineType && r.cuisineType.name) || 'Nusantara',
    foto: r.imageUrl,
    waktu: (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0), // persiapan + memasak
    porsi: r.servings,
  };
}

// Ubah detail API jadi bentuk resep
function ubahDetail(d) {
  const bahan = (d.ingredientGroups || [])
    .flatMap((g) => g.ingredients || [])
    .map((i) => i.rawText || [i.amount, i.unit, i.name].filter(Boolean).join(' '));
  const langkah = (d.steps || [])
    .slice()
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map((s) => s.instruction || s.rawText);

  // API tidak punya deskripsi resep
  const bagian = [`Masakan ${d.origin || (d.cuisineType && d.cuisineType.name) || 'Nusantara'}`];
  if (KESULITAN[d.difficulty]) bagian.push(`tingkat kesulitan ${KESULITAN[d.difficulty]}`);
  if (d.nutrition && d.nutrition.calories) bagian.push(`sekitar ${d.nutrition.calories} kkal per porsi`);

  return {
    judul: d.title || d.name,
    kategori: tentukanKategori(d),
    waktu: (d.prepTimeMinutes || 0) + (d.cookTimeMinutes || 0),
    porsi: d.servings,
    deskripsi: bagian.join(', ') + '.',
    bahan: bahan.join('\n'),
    langkah: langkah.join('\n'),
    foto: d.imageUrl || null,
  };
}

// POST ke mock API (JSONPlaceholder)
// server hanya membalas 201 + id palsu.
export async function kirimResepKeServer(resep) {
  let res;
  try {
    res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: resep.judul, body: resep.deskripsi }),
    });
  } catch (err) {
    throw new Error('Tidak bisa terhubung ke server.');
  }
  if (!res.ok) throw new Error(`Server membalas dengan status ${res.status}`);
  return res.json();
}
