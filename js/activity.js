// activity.js
import { changeLocation } from './location.js';
import { playGifTransition } from './game.js';
import { activityEffects } from './activityData.js';

export function doActivity(type, player, updateUI) {
  const activity = activityEffects[type];
  const currentLocation = player.currentLocation;

  if (!activity) {
    console.warn('Aktivitas tidak dikenal:', type);
    return;
  }

  if (activity.location && activity.location !== currentLocation) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Aktivitas ini cuma bisa dilakukan di ' + activity.location,
    });
    return;
  }

  if (activity.condition && !activity.condition(player)) {
    Swal.fire({
      icon: 'warning',
      title: activity.failMessage?.title || 'Gagal',
      text: activity.failMessage?.text || 'Kondisi tidak terpenuhi!',
    });
    return;
  }

  activity.effect(player, changeLocation, updateUI, playGifTransition);
  updateUI(); // ini update UI setelah efek dijalankan
}
