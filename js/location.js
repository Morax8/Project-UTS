import { setBackground, drawCharacter } from './game.js';

export function changeLocation(location, player, updateUI) {
  player.currentLocation = location;

  switch (location) {
    case 'pantai':
      setBackground('assets/images/locations/pantai.gif');
      break;
    case 'mall':
      setBackground('assets/images/locations/mall.jpg');
      break;
    default:
      setBackground('assets/images/locations/rumah.jpg');
      break;
  }

  updateUI();
}
