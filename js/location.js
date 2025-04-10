import { setBackground, drawCharacter } from './game.js';
import { updateActivityButtons } from './updateActivityButtons.js';

export function changeLocation(location, player, updateUI) {
  player.currentLocation = location;

  switch (location) {
    case 'dlmrumah':
      setBackground('assets/images/locations/dlmrumah.png');
      player.characterWidth = 120;
      player.characterHeight = 120;
      break;
    case 'pantai':
      setBackground('assets/images/locations/pantai.gif');
      player.characterWidth = 70;
      player.characterHeight = 70;
      break;
    case 'kampus':
      setBackground('assets/images/locations/kampus.png');
      player.characterHeight = 100;
      player.characterWidth = 100;
      break;
    case 'gunung':
      setBackground('assets/images/locations/gunung.png');
      player.characterWidth = 100;
      player.characterHeight = 100;
      break;
    case 'kantor':
      setBackground('assets/images/locations/kantor.jpg');
      player.characterWidth = 100;
      player.characterHeight = 100;
      break;
    default:
      setBackground('assets/images/locations/rumah.jpg');
      player.characterWidth = 48;
      player.characterHeight = 48;
      break;
  }

  drawCharacter(player);
  updateUI();
  updateActivityButtons(location);
}
