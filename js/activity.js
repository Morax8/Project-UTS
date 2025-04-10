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

  // Cek lokasi yang valid
  if (activity.location) {
    const allowed = Array.isArray(activity.location) ? activity.location.includes(currentLocation) : activity.location === currentLocation;

    if (!allowed) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Aktivitas ini cuma bisa dilakukan di ' + (Array.isArray(activity.location) ? activity.location.join(', ') : activity.location),
      });
      return;
    }
  }

  // Cek kondisi khusus
  if (activity.condition && !activity.condition(player)) {
    Swal.fire({
      icon: 'warning',
      title: activity.failMessage?.title || 'Gagal',
      text: activity.failMessage?.text || 'Kondisi tidak terpenuhi!',
    });
    return;
  }

  // // Play animation if available
  // if (activity.animationId) {
  //   playGifAnimation(activity.animationId, activity.animationDuration, () => {
  //     activity.effect(player);
  //     updateUI();
  //   });
  // } else {
  //   activity.effect(player);
  //   updateUI();
  // }

  // Eksekusi aktivitas
  console.log(`▶️ Melakukan aktivitas: ${type} di lokasi ${currentLocation}`);
  Promise.resolve(activity.effect(player, changeLocation, updateUI, playGifTransition)).then(() => {
    updateUI();
  });
}
