const player = {
  name: 'Ucup',
  avatar: '👨‍🎓',
  stats: {
    health: 100,
    energy: 100,
    hunger: 100,
    hygiene: 100,
    happiness: 100,
    knowledge: 0,
    money: 500000,
  },
  currentLocation: 'kost',
  isBusy: false,
  busyUntil: 0, // Game minute when player will finish current activity
};

function updateStat(stat, change) {
  if (stat in player.stats) {
    player.stats[stat] += change;

    // Cap stats between 0 and 100 (except money and knowledge)
    if (stat !== 'money' && stat !== 'knowledge') {
      player.stats[stat] = Math.max(0, Math.min(100, player.stats[stat]));
    }

    // Cap knowledge at 100 (no minimum)
    if (stat === 'knowledge') {
      player.stats[stat] = Math.min(100, player.stats[stat]);
    }

    // Update UI
    updateStatsDisplay();

    // Check for game over conditions
    checkGameOver();
  }
}

function checkGameOver() {
  // Game over if health reaches 0
  if (player.stats.health <= 0) {
    gameOver('Kamu terlalu lelah dan sakit. Game over!');
  }

  // Game over if out of money and hunger is critical
  if (player.stats.money <= 0 && player.stats.hunger <= 10) {
    gameOver('Kamu kelaparan dan tidak punya uang. Game over!');
  }

  // Game over if knowledge reaches 100 (win condition)
  if (player.stats.knowledge >= 100) {
    gameOver('Selamat! Kamu berhasil lulus kuliah!', true);
  }
}

// Game over function
function gameOver(message, isWin = false) {
  // Set game over state
  gameState.isGameOver = true;

  // Show game over screen
  gameoverScreen.style.display = 'flex';
  document.getElementById('gameover-message').textContent = message;

  // Apply win/lose styling
  if (isWin) {
    gameoverScreen.classList.add('win');
    document.getElementById('gameover-title').textContent = 'KAMU MENANG!';
  } else {
    gameoverScreen.classList.add('lose');
    document.getElementById('gameover-title').textContent = 'GAME OVER';
  }

  // Setup restart button
  document.getElementById('restart-button').addEventListener('click', () => {
    location.reload();
  });
}
