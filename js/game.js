const player = {
  health: 100,
  energy: 100,
  hunger: 100,
  hygiene: 100,
  happiness: 100,
  knowledge: 0,
  money: 500000,
  time: { day: 1, hour: 8, minute: 0 },
};

const playerName = localStorage.getItem('playerName') || 'Player';
document.getElementById('playerNameDisplay').textContent = `Hello, ${playerName}!`;

function updateStats() {
  player.hunger -= 1;
  player.energy -= 1;
  player.hygiene -= 0.5;
  player.happiness -= 0.5;

  if (player.hunger <= 0 || player.energy <= 0) {
    player.health -= 2;
  }

  updateUI();

  if (player.health <= 0) {
    gameOver('Kesehatan habis!');
  }
}

function updateTime() {
  player.time.minute += 1;

  if (player.time.minute >= 60) {
    player.time.minute = 0;
    player.time.hour += 1;
  }

  if (player.time.hour >= 24) {
    player.time.hour = 0;
    player.time.day += 1;
  }

  document.getElementById('time-display').innerText = `Hari ${player.time.day}, ${String(player.time.hour).padStart(2, '0')}:${String(player.time.minute).padStart(2, '0')}`;
}

// Call updateTime every 1 second
setInterval(updateTime, 1000);

function updateUI() {
  document.getElementById('health-value').innerText = `${player.health}%`;
  document.getElementById('health-fill').style.width = `${player.health}%`;
  document.getElementById('energy-value').innerText = `${player.energy}%`;
  document.getElementById('energy-fill').style.width = `${player.energy}%`;
  document.getElementById('hunger-value').innerText = `${player.hunger}%`;
  document.getElementById('hunger-fill').style.width = `${player.hunger}%`;
  document.getElementById('hygiene-value').innerText = `${player.hygiene}%`;
  document.getElementById('hygiene-fill').style.width = `${player.hygiene}%`;
  document.getElementById('happiness-value').innerText = `${player.happiness}%`;
  document.getElementById('happiness-fill').style.width = `${player.happiness}%`;
  document.getElementById('knowledge-value').innerText = `${player.knowledge}%`;
  document.getElementById('knowledge-fill').style.width = `${player.knowledge}%`;
  document.getElementById('money-display').innerText = `Rp ${player.money.toLocaleString()}`;
}

function gameOver(reason) {
  document.getElementById('game-over-screen').classList.remove('hidden');
  document.getElementById('game-over-reason').innerText = reason;
  document.getElementById('days-survived').innerText = player.time.day;
  document.getElementById('final-knowledge').innerText = player.knowledge;
}

function startGameLoop() {
  setInterval(() => {
    updateTime();
    updateStats();
  }, 5000); // Updates every 5 seconds
}

document.getElementById('restart-game-btn').addEventListener('click', () => {
  location.reload();
});

startGameLoop();

const gameMap = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
]; // Expanded map with more tiles
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;
const TILE_COUNT = 15; // Total number of tile images

const tileImages = {}; // Object to store preloaded images

// Function to format numbers with leading zeros (e.g., 1 -> "01", 9 -> "09")
// Function to format numbers with leading zeros, starting from 1
function formatTileIndex(index) {
  return (index + 1).toString().padStart(2, '0');
}

// Preload images
function preloadTiles(callback) {
  let loaded = 0;
  for (let i = 0; i < TILE_COUNT; i++) {
    let formattedIndex = formatTileIndex(i); // Now starts from "01"
    let img = new Image();
    img.src = `assets/images/tiles/Map_tile_${formattedIndex}.png`;
    img.onload = () => {
      loaded++;
      if (loaded === TILE_COUNT) {
        callback();
      }
    };
    tileImages[i] = img;
  }
}

// Function to draw individual tiles
function drawTile(destX, destY, tileIndex) {
  let formattedIndex = (tileIndex + 1).toString().padStart(2, '0');
  let img = new Image();
  img.src = `assets/images/tiles/Map_tile_${formattedIndex}.png`;
  img.onload = () => {
    ctx.drawImage(img, destX, destY, TILE_SIZE, TILE_SIZE);
  };
}

// Function to draw the entire map
function drawMap() {
  for (let row = 0; row < gameMap.length; row++) {
    for (let col = 0; col < gameMap[row].length; col++) {
      let tileIndex = gameMap[row][col];
      drawTile(col * TILE_SIZE, row * TILE_SIZE, tileIndex);
    }
  }
}

// Start rendering
drawMap();
