export function updateActivityButtons(currentLocation) {
  const dalamRumah = ['tidur', 'makan', 'mandi', 'main', 'belajar', 'keluar'];
  const diPantai = ['bermain', 'mancing', 'pergi'];
  const diKampus = ['belajar', 'pergi']; // misalnya belanja di kampus
  const diKantor = ['kerja', 'pergi']; // misalnya kerja di kantor
  const diGunung = ['camping', 'pergi']; // misalnya mancing di gunung

  // Sembunyiin semua tombol activity dulu
  document.querySelectorAll('button[data-activity]').forEach((btn) => {
    btn.style.display = 'none';
  });

  let aktif = [];

  switch (currentLocation) {
    case 'dlmrumah':
      aktif = dalamRumah;
      break;
    case 'pantai':
      aktif = diPantai;
      break;
    case 'kampus':
      aktif = diKampus;
      break;
    case 'rumah':
      aktif = ['masuk', 'pergi'];
      break;
    case 'gunung':
      aktif = diGunung;
      break;
    case 'kantor':
      aktif = diKantor;
      break;
    default:
      aktif = [];
  }

  // Tampilkan tombol yang sesuai dengan lokasi
  aktif.forEach((activity) => {
    const btn = document.getElementById(`btn-${activity}`);
    if (btn) {
      btn.style.display = 'inline-block';
    }
  });
}
