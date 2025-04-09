// File: pathfinding.js

// Ukuran tile (disesuaikan dengan map PNG kamu)
const tileSize = 32;
const mapWidth = 768 / tileSize;
const mapHeight = 768 / tileSize;

// Manual grid untuk testing awal (0 = bisa jalan, 1 = objek/nabrak)
// Silakan diupdate sesuai kebutuhan
const grid = Array.from({ length: mapHeight }, () => Array(mapWidth).fill(0));

// Contoh area yang diblokir (misal rumah di pojok kiri atas)
for (let y = 4; y < 12; y++) {
  for (let x = 3; x < 10; x++) {
    grid[y][x] = 1;
  }
}

// Init EasyStar
const easystar = new EasyStar.js();
easystar.setGrid(grid);
easystar.setAcceptableTiles([0]);

// Fungsi cari path dari A ke B (koordinat dalam tile, bukan pixel)
function findPath(fromX, fromY, toX, toY, callback) {
  easystar.findPath(fromX, fromY, toX, toY, function (path) {
    if (path === null) {
      console.log('Gak nemu jalan bro!');
      callback(null);
    } else {
      console.log('Path ketemu:', path);
      callback(path);
    }
  });
  easystar.calculate();
}

// Export biar bisa dipanggil dari file utama
export { findPath, tileSize, grid };
