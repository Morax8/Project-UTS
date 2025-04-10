import { doActivity } from './activity.js';

let currentLocation = 'rumah'; // default saat awal game

// === PLAYER STATE ===
const player = {
  health: 100,
  energy: 100,
  hunger: 100,
  hygiene: 100,
  happiness: 100,
  knowledge: 0,
  money: 500000,
  time: { day: 1, hour: 8, minute: 0 },
  currentLocation: 'rumah',
  characterWidth: 48,
  characterHeight: 48,
};

// === INIT PLAYER NAME ===
const playerName = localStorage.getItem('playerName') || 'Player';
document.getElementById('playerNameDisplay').textContent = `Hello, ${playerName}!`;

// === TIME FUNCTIONS ===
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

// === GAME LOOP ===
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

function startGameLoop() {
  setInterval(() => {
    updateTime();
    updateStats();
  }, 5000);
}

// === UI UPDATE ===
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

// === GAME OVER ===
function gameOver(reason) {
  document.getElementById('game-over-screen').classList.remove('hidden');
  document.getElementById('game-over-reason').innerText = reason;
  document.getElementById('days-survived').innerText = player.time.day;
  document.getElementById('final-knowledge').innerText = player.knowledge;
}

document.getElementById('restart-game-btn').addEventListener('click', () => {
  location.reload();
});

// === CANVAS & CHARACTER ===
export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

const backgroundImage = new Image();
const characterImage = new Image();
const selectedCharacter = localStorage.getItem('selectedCharacter') || 'boy';
characterImage.src = `assets/images/avatar/${selectedCharacter}.png`;

backgroundImage.src = 'assets/images/locations/rumah.jpg';

const characterWidth = player.characterWidth;
const characterHeight = player.characterHeight;

let playerX = 300;
let playerY = 270;
let facingLeft = false;

// ⬇️ DRAW FUNCTION
export function drawCharacter(player) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  const x = playerX;
  const y = playerY;

  const width = player.characterWidth;
  const height = player.characterHeight;

  if (facingLeft) {
    ctx.save();
    ctx.translate(x + width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(characterImage, 0, 0, characterImage.width, characterImage.height, 0, 0, width, height);
    ctx.restore();
  } else {
    ctx.drawImage(characterImage, x, y, width, height);
  }
}

// ⬇️ SET BACKGROUND LANGSUNG TANPA FADE
export function setBackground(src) {
  backgroundImage.src = src;
  backgroundImage.onload = () => {
    drawCharacter(player);
  };
}

function renderGame() {
  drawCharacter(player);
}

// === KEYBOARD CONTROLS ===
window.addEventListener('keydown', function (e) {
  const keysToDisable = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
  if (keysToDisable.includes(e.key)) e.preventDefault();

  const moveAmount = 10;
  switch (e.key) {
    case 'ArrowUp':
      if (playerY - moveAmount >= 0) playerY -= moveAmount;
      break;
    case 'ArrowDown':
      if (playerY + moveAmount + characterHeight <= canvas.height) playerY += moveAmount;
      break;
    case 'ArrowLeft':
      if (playerX - moveAmount >= 0) {
        playerX -= moveAmount;
        facingLeft = true;
      }
      break;
    case 'ArrowRight':
      if (playerX + moveAmount + characterWidth <= canvas.width) {
        playerX += moveAmount;
        facingLeft = false;
      }
      break;
  }

  renderGame();
});

// === STARTUP ===
Promise.all([new Promise((resolve) => (backgroundImage.onload = resolve)), new Promise((resolve) => (characterImage.onload = resolve))]).then(() => {
  renderGame();
  updateUI(); // Tambahin ini bro!
  setInterval(() => {
    updateTime();
    updateStats();
    renderGame();
  }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-masuk').addEventListener('click', () => doActivity('masuk', player, updateUI));
  document.getElementById('btn-tidur').addEventListener('click', () => doActivity('tidur', player, updateUI));
  document.getElementById('btn-makan').addEventListener('click', () => doActivity('makan', player, updateUI));
  document.getElementById('btn-belajar').addEventListener('click', () => doActivity('belajar', player, updateUI));
  document.getElementById('btn-mandi').addEventListener('click', () => doActivity('mandi', player, updateUI));
  document.getElementById('btn-main').addEventListener('click', () => doActivity('mainGame', player, updateUI));
  document.getElementById('btn-keluar').addEventListener('click', () => doActivity('keluar', player, updateUI));
  document.getElementById('btn-pergi').addEventListener('click', () => doActivity('pergi', player, updateUI));
  document.getElementById('btn-bermain').addEventListener('click', () => doActivity('bermain', player, updateUI));
  document.getElementById('btn-mancing').addEventListener('click', () => doActivity('mancing', player, updateUI));
  document.getElementById('btn-camping').addEventListener('click', () => doActivity('camping', player, updateUI));
  document.getElementById('btn-kerja').addEventListener('click', () => doActivity('kerja', player, updateUI));
});

export function playGifTransition(callback) {
  const gif = document.getElementById('transitionGif');

  // Reset GIF source biar selalu dari awal
  gif.style.display = 'block';
  gif.style.opacity = '0';
  gif.src = gif.src;

  // Fade in
  requestAnimationFrame(() => {
    gif.style.opacity = '1';
  });

  // Setelah durasi gif selesai, fade out
  setTimeout(() => {
    gif.style.opacity = '0';

    // Tunggu efek fade out selesai, baru hide
    setTimeout(() => {
      gif.style.display = 'none';
      if (callback) callback();
    }, 500); // durasi fade out harus sama kayak transition (0.5s)
  }, 2000); // durasi GIF sebelum mulai fade out
}
