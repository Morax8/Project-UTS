// activityData.js

function clampStat(value) {
  return Math.max(0, Math.min(value, 100));
}

export const activityEffects = {
  masuk: {
    location: 'rumah',
    effect: (player, changeLocation, updateUI) => {
      changeLocation('dlmrumah', player, updateUI);
    },
  },
  tidur: {
    location: 'dlmrumah',
    condition: (player) => player.energy < 100,
    effect: (player) => {
      player.energy = clampStat(player.energy + 40);
      player.time.hour += 6;
      player.hunger = clampStat(player.hunger - 10);
      player.hygiene = clampStat(player.hygiene - 5);
      player.happiness = clampStat(player.happiness + 5);
    },
    failMessage: {
      title: 'Energi Penuh',
      text: 'Energi kamu sudah penuh!',
    },
  },
  makan: {
    location: 'dlmrumah',
    condition: (player) => player.money >= 20000,
    effect: (player) => {
      player.hunger = clampStat(player.hunger + 40);
      player.money -= 20000;
      player.hygiene = clampStat(player.hygiene - 2);
      player.happiness = clampStat(player.happiness + 2);
      player.time.hour += 1;
    },
    failMessage: {
      title: 'Uang Tidak Cukup',
      text: 'Uangmu gak cukup buat makan!',
    },
  },
  mandi: {
    location: 'dlmrumah',
    condition: (player) => player.hygiene < 100 && player.energy >= 15,
    effect: (player) => {
      player.hygiene = clampStat(player.hygiene + 50);
      player.energy = clampStat(player.energy - 5);
      player.time.hour += 1;
    },
    failMessage: {
      title: 'Mandi Gak Bisa',
      text: 'Kamu udah bersih/energi kamu kurang!',
    },
  },
  mainGame: {
    location: 'dlmrumah',
    condition: (player) => player.energy >= 10 && player.hunger >= 10,
    effect: (player) => {
      player.happiness = clampStat(player.happiness + 30);
      player.energy = clampStat(player.energy - 10);
      player.hunger = clampStat(player.hunger - 10);
      player.time.hour += 2;
    },
    failMessage: {
      title: 'Gak Kuat Main',
      text: 'Kamu terlalu capek/lapar buat main game!',
    },
  },
  belajar: {
    location: 'dlmrumah',
    condition: (player) => player.energy >= 20 && player.hunger >= 20,
    effect: (player) => {
      player.knowledge = clampStat(player.knowledge + 20);
      player.energy = clampStat(player.energy - 15);
      player.hunger = clampStat(player.hunger - 10);
      player.happiness = clampStat(player.happiness - 5);
      player.time.hour += 2;
    },
    failMessage: {
      title: 'Belajar Ditunda',
      text: 'Kamu butuh makan/istirahat sebelum belajar!',
    },
  },
  keluar: {
    location: 'dlmrumah',
    effect: (player, changeLocation, updateUI) => {
      changeLocation('rumah', player, updateUI);
    },
  },
  pergi: {
    location: 'rumah',
    effect: (_, __, ___, playGifTransition, changeLocation) => {
      Swal.fire({
        title: 'Mau ke mana nih?',
        text: 'Pilih lokasi tujuan:',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Pantai',
        cancelButtonText: 'Batal',
        showDenyButton: true,
        denyButtonText: 'Mall',
      }).then((result) => {
        if (result.isConfirmed) {
          playGifTransition(() => {
            changeLocation('pantai');
          });
        } else if (result.isDenied) {
          playGifTransition(() => {
            changeLocation('mall');
          });
        } else {
          Swal.fire('Batal jalan-jalan 😅', '', 'info');
        }
      });
    },
  },
};
