export function updateActivityButtons(currentLocation) {
  const dalamRumah = ['tidur', 'makan', 'mandi', 'main', 'belajar', 'keluar'];
  const masukButton = document.getElementById('btn-masuk');
  const pergiButton = document.getElementById('btn-pergi');

  // Tampilkan tombol aktivitas hanya di dalam rumah
  dalamRumah.forEach((activity) => {
    const btn = document.getElementById(`btn-${activity}`);
    if (btn) {
      btn.style.display = currentLocation === 'dlmrumah' ? 'inline-block' : 'none';
    }
  });

  // Tampilkan tombol masuk hanya saat di rumah
  if (masukButton) {
    masukButton.style.display = currentLocation === 'rumah' ? 'inline-block' : 'none';
  }
  if (pergiButton) {
    pergiButton.style.display = currentLocation === 'rumah' ? 'inline-block' : 'none';
  }
}
