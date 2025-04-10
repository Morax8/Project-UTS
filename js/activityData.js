// activityData.js

import { playGifAnimation } from './animation.js';

function clampStat(value) {
  return Math.max(0, Math.min(value, 100));
}

export const activityEffects = {
  //luar rumah
  masuk: {
    location: 'rumah',
    effect: (player, changeLocation, updateUI) => {
      changeLocation('dlmrumah', player, updateUI);
    },
  },

  // dalem rumah
  tidur: {
    location: 'dlmrumah',
    condition: (player) => player.energy < 100,
    effect: (player) => {
      playGifAnimation('tidurGif', 2500, () => {
        player.energy = clampStat(player.energy + 40);
        player.time.hour += 6;
        player.hunger = clampStat(player.hunger - 10);
        player.hygiene = clampStat(player.hygiene - 5);
        player.happiness = clampStat(player.happiness + 5);
      });
    },
    failMessage: {
      title: 'Energi Penuh',
      text: 'Energi kamu sudah penuh!',
    },
  },
  makan: {
    location: 'dlmrumah',
    animationId: 'makanGif', // <-- Tambahin ini
    animationDuration: 2500, // <-- Tambahin durasi
    condition: (player) => player.money >= 20000,
    effect: (player) => {
      playGifAnimation('makanGif', 2500, () => {
        player.hunger = clampStat(player.hunger + 40);
        player.money -= 20000;
        player.hygiene = clampStat(player.hygiene - 2);
        player.happiness = clampStat(player.happiness + 2);
        player.time.hour += 1;

        updateUI();
      });
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
      playGifAnimation('mandiGif', 2500, () => {
        player.hygiene = clampStat(player.hygiene + 50);
        player.energy = clampStat(player.energy - 5);
        player.time.hour += 1;
      });
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
      playGifAnimation('mainGif', 2500, () => {
        player.happiness = clampStat(player.happiness + 30);
        player.energy = clampStat(player.energy - 10);
        player.hunger = clampStat(player.hunger - 10);
        player.time.hour += 2;

        updateUI();
      });
    },
    failMessage: {
      title: 'Gak Kuat Main',
      text: 'Kamu terlalu capek/lapar buat main game!',
    },
  },
  belajar: {
    location: ['dlmrumah', 'kampus'],
    condition: (player) => player.energy >= 20 && player.hunger >= 20,
    effect: (player) => {
      playGifAnimation('belajarGif', 2500, () => {
        player.knowledge = clampStat(player.knowledge + 20);
        player.energy = clampStat(player.energy - 15);
        player.hunger = clampStat(player.hunger - 10);
        player.happiness = clampStat(player.happiness - 5);
        player.time.hour += 2;
      });
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

  //universal
  pergi: {
    location: ['rumah', 'pantai', 'kampus', 'gunung', 'kantor', 'kantin'], // bisa diakses dari banyak lokasi
    effect: (player, changeLocation, updateUI, playGifTransition) => {
      const lokasi = player.currentLocation.toLowerCase(); // FIXED: bikin lowercase

      const destinations = {
        rumah: ['Pantai', 'Kampus'],
        pantai: ['Rumah', 'Gunung'],
        kampus: ['Rumah', 'Kantor'],
        gunung: ['Rumah', 'Pantai'],
        kantor: ['Rumah', 'Kampus'],
      };

      const tujuanList = destinations[lokasi] || [];

      Swal.fire({
        title: 'Mau ke mana nih?',
        text: 'Pilih lokasi tujuan:',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: tujuanList[0] || 'Tujuan 1',
        cancelButtonText: 'Batal',
        showDenyButton: true,
        denyButtonText: tujuanList[1] || 'Tujuan 2',
      }).then((result) => {
        if (result.isConfirmed && tujuanList[0]) {
          playGifTransition(() => {
            changeLocation(tujuanList[0].toLowerCase(), player, updateUI);
          });
        } else if (result.isDenied && tujuanList[1]) {
          playGifTransition(() => {
            changeLocation(tujuanList[1].toLowerCase(), player, updateUI);
          });
        } else {
          Swal.fire('Batal jalan-jalan 😅', '', 'info');
        }
      });
    },
  },

  // di pantai
  berenang: {
    location: 'pantai',
    condition: (player) => player.energy >= 30 && player.hunger >= 20,
    effect: (player) => {
      playGifAnimation('berenangGif', 2500, () => {
        player.energy = clampStat(player.energy - 25);
        player.hunger = clampStat(player.hunger - 15);
        player.happiness = clampStat(player.happiness + 25);
        player.hygiene = clampStat(player.hygiene - 10);
        player.time.hour += 1;
      });
    },
    failMessage: {
      title: 'berenang gak bisa',
      text: 'Kamu lapar/energi kamu kurang',
    },
  },

  mancing: {
    location: 'pantai',
    condition: (player) => player.energy >= 20 && player.hunger >= 20,
    effect: (player) => {
      playGifAnimation('mancingGif', 2500, () => {
        player.energy = clampStat(player.energy - 20);
        player.hunger = clampStat(player.hunger - 30);
        player.happiness = clampStat(player.happiness + 30);
        player.hygiene = clampStat(player.hygiene - 10);
        player.time.hour += 3;
      });
    },
    failMessage: {
      title: 'Mancing Gak Bisa',
      text: 'Kamu lapar/energi kamu kurang',
    },
  },

  //di kantor
  kerja: {
    location: 'kantor',
    condition: (player) => player.energy >= 20 && player.hunger >= 20,
    effect: (player) => {
      playGifAnimation('kerjaGif', 2500, () => {
        player.money += 100000;
        player.energy = clampStat(player.energy - 20);
        player.hunger = clampStat(player.hunger - 10);
        player.happiness = clampStat(player.happiness - 20);
        player.time.hour += 3;
      });
    },
    failMessage: {
      title: 'Kerja Gak Bisa',
      text: 'Kamu lapar/energi kamu kurang',
    },
  },

  //diGunung
  camping: {
    location: 'gunung',
    condition: (player) => player.energy >= 30 && player.hunger >= 20,
    effect: (player) => {
      playGifAnimation('campingGif', 2500, () => {
        player.happiness = clampStat(player.happiness + 50);
        player.energy = clampStat(player.energy - 25);
        player.hunger = clampStat(player.hunger - 15);
        player.time.hour += 3;
      });
    },
    failMessage: {
      title: 'Camping Gak Bisa',
      text: 'Kamu lapar/energi kamu kurang',
    },
  },
};
