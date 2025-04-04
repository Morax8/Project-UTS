// Random Events
const randomEvents = [
  {
    name: 'Tugas mendadak!',
    message: 'Tugas mendadak! Butuh belajar ekstra.',
    effect: () => {
      updateStat('energy', -20);
      updateStat('knowledge', 10);
    },
    probability: 0.2,
  },
  {
    name: 'Diskon di minimarket!',
    message: 'Diskon di minimarket! Harga makanan lebih murah.',
    effect: () => {
      // Temporarily reduce minimarket food cost
      const minimarketActivities = locations.minimarket.activities;
      for (let activity of minimarketActivities) {
        if (activity.name === 'Beli makanan') {
          activity.cost = Math.floor(activity.cost * 0.5);
          // Reset price after 10 minutes (game time)
          setTimeout(() => {
            activity.cost = 10000;
            if (player.currentLocation === 'minimarket') {
              updateActivities();
            }
          }, (10 * 60 * 1000) / 60); // Convert game minutes to real seconds
        }
      }
    },
    probability: 0.2,
  },
  {
    name: 'Sakit karena kurang tidur!',
    message: 'Sakit karena kurang tidur! Harus istirahat.',
    effect: () => {
      updateStat('health', -20);
    },
    probability: 0.15,
  },
  {
    name: 'Dompet jatuh di kampus!',
    message: 'Dompet jatuh di kampus!',
    effect: () => {
      updateStat('money', -50000);
    },
    probability: 0.15,
  },
  {
    name: 'Ketemu crazy rich baik hati!',
    message: 'Ketemu crazy rich baik hati!',
    effect: () => {
      updateStat('money', 250000);
    },
    probability: 0.05,
  },
  {
    name: 'Ikut giveaway',
    message: 'Kamu memenangkan giveaway!',
    effect: () => {
      updateStat('money', 200000);
    },
    probability: 0.1,
  },
  {
    name: 'Dapat makan gratis abis jumatan',
    message: 'Dapat makan gratis abis jumatan',
    effect: () => {
      updateStat('hunger', 30);
      updateStat('happiness', 10);
    },
    probability: 0.15,
  },
];

// Trigger a random event
function triggerRandomEvent() {
  // Select events based on probability
  const eligibleEvents = [];

  for (const event of randomEvents) {
    if (Math.random() < event.probability) {
      eligibleEvents.push(event);
    }
  }

  // If there are eligible events, pick one randomly
  if (eligibleEvents.length > 0) {
    const randomEvent = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];

    // Show notification
    showNotification(randomEvent.message);

    // Apply event effect
    randomEvent.effect();
  }
}
