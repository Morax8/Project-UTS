// Locations and Activities
const locations = {
  kost: {
    name: 'Kost/Rumah',
    icon: '🏠',
    bgColor: '#8d6e63',
    backgroundImage: 'assets/images/locations/kost.jpeg',
    activities: [
      {
        name: 'Tidur',
        icon: '🛌',
        energyChange: 30,
        hungerChange: -10,
        timeRequired: 480,
        cost: 0,
        description: 'Pulihkan energi dengan tidur nyenyak',
      },
      {
        name: 'Mandi',
        icon: '🚿',
        hygieneChange: 30,
        timeRequired: 30,
        cost: 0,
        description: 'Bersihkan diri untuk pulihkan hygiene',
      },
      {
        name: 'Nonton TV',
        icon: '📺',
        happinessChange: 5,
        energyChange: -5,
        timeRequired: 60,
        cost: 5000,
        description: 'Hibur diri dengan acara TV favoritmu',
      },
      {
        name: 'Cuci tangan',
        icon: '🧼',
        hygieneChange: 5,
        timeRequired: 5,
        cost: 0,
        description: 'Bersihkan tangan dengan cepat',
      },
    ],
  },
  kampus: {
    name: 'Kampus',
    icon: '🏛️',
    bgColor: '#1976d2',
    backgroundImage: 'assets/images/locations/kampus.jpg',
    activities: [
      {
        name: 'Belajar',
        icon: '📚',
        knowledgeChange: 10,
        energyChange: -10,
        timeRequired: 60,
        cost: 0,
        description: 'Tingkatkan pengetahuan akademismu',
      },
      {
        name: 'Ngumpul sama teman',
        icon: '👥',
        happinessChange: 5,
        energyChange: -5,
        timeRequired: 60,
        cost: 0,
        description: 'Sosialisasi dengan teman-teman kampus',
      },
    ],
  },
  kantin: {
    name: 'Kantin',
    icon: '🍛',
    bgColor: '#ff9800',
    backgroundImage: 'assets/images/locations/kantin.jpg',
    activities: [
      {
        name: 'Makan',
        icon: '🍽️',
        hungerChange: 20,
        timeRequired: 30,
        cost: 15000,
        description: 'Nikmati makanan kantin yang mengenyangkan',
      },
    ],
  },
  minimarket: {
    name: 'Minimarket',
    icon: '🛒',
    bgColor: '#4caf50',
    backgroundImage: 'assets/images/locations/minimarket.jpg',
    activities: [
      {
        name: 'Beli makanan',
        icon: '🍙',
        hungerChange: 20,
        timeRequired: 15,
        cost: 10000,
        description: 'Beli makanan cepat saji',
      },
    ],
  },
  cafe: {
    name: 'Café',
    icon: '☕',
    bgColor: '#795548',
    backgroundImage: 'assets/images/locations/cafe.jpg',
    activities: [
      {
        name: 'Nongkrong',
        icon: '🪑',
        happinessChange: 5,
        timeRequired: 120,
        cost: 25000,
        description: 'Santai dan nikmati suasana cafe',
      },
    ],
  },
  kerja: {
    name: 'Tempat Kerja Part-time',
    icon: '💼',
    bgColor: '#607d8b',
    backgroundImage: 'assets/images/locations/kerja.jpg',
    activities: [
      {
        name: 'Kerja',
        icon: '💰',
        moneyChange: 100000,
        energyChange: -20,
        timeRequired: 240,
        cost: 0,
        description: 'Dapatkan uang dengan bekerja part-time',
      },
    ],
  },
  ibadah: {
    name: 'Tempat Ibadah',
    icon: '⛪',
    bgColor: '#9c27b0',
    backgroundImage: 'assets/images/locations/ibadah.jpg',
    activities: [
      {
        name: 'Beribadah',
        icon: '🙏',
        happinessChange: 10,
        hygieneChange: 5,
        timeRequired: 30,
        cost: 0,
        description: 'Ketenangan batin melalui ibadah',
      },
    ],
  },
  pantai: {
    name: 'Pantai',
    icon: '🏖️',
    bgColor: '#00bcd4',
    backgroundImage: 'assets/images/locations/pantai.jpg',
    activities: [
      {
        name: 'Bermain air',
        icon: '🌊',
        happinessChange: 15,
        energyChange: -10,
        hygieneChange: -5,
        timeRequired: 120,
        cost: 0,
        description: 'Bersenang-senang di air pantai',
      },
      {
        name: 'Makan seafood',
        icon: '🦞',
        hungerChange: 20,
        timeRequired: 60,
        cost: 30000,
        description: 'Nikmati hidangan laut segar',
      },
    ],
  },
  gunung: {
    name: 'Gunung',
    icon: '⛰️',
    bgColor: '#8bc34a',
    backgroundImage: 'assets/images/locations/gunung.jpg',
    activities: [
      {
        name: 'Hiking',
        icon: '🥾',
        happinessChange: 10,
        energyChange: -20,
        hungerChange: -10,
        timeRequired: 180,
        cost: 0,
        description: 'Petualangan mendaki dengan pemandangan indah',
      },
      {
        name: 'Camping',
        icon: '⛺',
        happinessChange: 5,
        timeRequired: 480,
        cost: 50000,
        description: 'Bermalam di alam terbuka',
      },
    ],
  },
  danau: {
    name: 'Danau',
    icon: '🏞️',
    bgColor: '#03a9f4',
    backgroundImage: 'assets/images/locations/danau.jpg',
    activities: [
      {
        name: 'Bersantai',
        icon: '🧘',
        happinessChange: 10,
        energyChange: -5,
        timeRequired: 120,
        cost: 0,
        description: 'Rileks menikmati ketenangan alam',
      },
      {
        name: 'Mancing',
        icon: '🎣',
        hungerChange: 10,
        energyChange: -10,
        timeRequired: 180,
        cost: 0,
        description: 'Hobi memancing sekaligus dapat makanan',
      },
    ],
  },
};

function startActivity(activity) {
  // Check if player has enough money
  if (activity.cost > player.stats.money) {
    showNotification('Uang tidak cukup!');
    return;
  }

  // Check if it's too late (past midnight)
  const activityEndTime = gameState.minute + activity.timeRequired;
  if (activityEndTime > 24 * 60) {
    showNotification('Sudah terlalu malam untuk aktivitas ini!');
    return;
  }

  // Set player as busy
  player.isBusy = true;
  player.busyUntil = gameState.minute + activity.timeRequired;

  // Deduct cost
  if (activity.cost > 0) {
    updateStat('money', -activity.cost);
  }

  // Show current activity
  currentActivityElem.textContent = `${activity.icon} ${activity.name}`;
  currentActivityElem.style.display = 'block';
  progressBarElem.style.display = 'block';
  progressTextElem.style.display = 'block';

  // Show notification
  showNotification(`Memulai aktivitas: ${activity.name}`);

  // Apply activity effects when completed
  setTimeout(() => {
    completeActivity(activity);
  }, activity.timeRequired * (TICK_RATE / 60)); // Convert from game minutes to real milliseconds
}

// Complete an activity and apply its effects
function completeActivity(activity) {
  // Only complete if game is not over
  if (gameState.isGameOver) return;

  // Apply activity effects
  for (const [stat, change] of Object.entries(activity)) {
    if (stat.endsWith('Change') && change !== 0) {
      const statName = stat.replace('Change', '');
      updateStat(statName, change);
    }
  }

  // Reset busy status
  player.isBusy = false;

  // Hide activity progress
  currentActivityElem.style.display = 'none';
  progressBarElem.style.display = 'none';
  progressTextElem.style.display = 'none';

  // Show notification
  showNotification(`Selesai: ${activity.name}`);
}
