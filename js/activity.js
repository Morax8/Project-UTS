// activity.js
import { changeLocation } from './location.js';
import { playGifTransition } from './game.js';

export function doActivity(type, player, updateUI, currentLocation = 'rumah') {
  if (currentLocation !== 'rumah') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Kamu harus di rumah untuk melakukan aktivitas ini!',
    });
    return;
  }

  switch (type) {
    case 'tidur':
      if (player.energy >= 100) {
        Swal.fire({
          icon: 'info',
          title: 'Energi Penuh',
          text: 'Energi kamu sudah penuh!',
        });
        return;
      }
      player.energy = Math.min(player.energy + 40, 100);
      player.time.hour += 6;
      player.hunger -= 10;
      player.hygiene -= 5;
      player.happiness += 5;
      break;

    case 'makan':
      if (player.money < 20000) {
        Swal.fire({
          icon: 'error',
          title: 'Uang Tidak Cukup',
          text: 'Uangmu gak cukup buat makan!',
        });
        return;
      }
      player.hunger = Math.min(player.hunger + 40, 100);
      player.money -= 20000;
      player.hygiene -= 2;
      player.happiness += 2;
      player.time.hour += 1;
      break;

    case 'mandi':
      player.hygiene = Math.min(player.hygiene + 50, 100);
      player.energy -= 5;
      player.time.hour += 1;
      break;

    case 'mainGame':
      if (player.energy < 10 || player.hunger < 10) {
        Swal.fire({
          icon: 'warning',
          title: 'Gak Kuat Main',
          text: 'Kamu terlalu capek/lapar buat main game!',
        });
        return;
      }
      player.happiness = Math.min(player.happiness + 30, 100);
      player.energy -= 10;
      player.hunger -= 10;
      player.time.hour += 2;
      break;

    case 'belajar':
      if (player.energy < 20 || player.hunger < 20) {
        Swal.fire({
          icon: 'warning',
          title: 'Belajar Ditunda',
          text: 'Kamu butuh makan/istirahat sebelum belajar!',
        });
        return;
      }
      player.knowledge = Math.min(player.knowledge + 20, 100);
      player.energy -= 15;
      player.hunger -= 10;
      player.happiness -= 5;
      player.time.hour += 2;
      break;

    case 'keluar':
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
      break;

    default:
      console.warn('Aktivitas tidak dikenal:', type);
  }

  updateUI();
}
