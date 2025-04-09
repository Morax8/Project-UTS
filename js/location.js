import { setBackground, drawCharacter } from './game.js';
import { updateActivityButtons } from './updateActivityButtons.js';

export function changeLocation(location, player, updateUI) {
  player.currentLocation = location;

  switch (location) {
    case 'dlmrumah':
      setBackground('assets/images/locations/dlmrumah.png');
      player.characterWidth = 70;
      player.characterHeight = 70;
      console.log(player.currentLocation);
      break;
    case 'pantai':
      setBackground('assets/images/locations/pantai.gif');
      player.characterWidth = 70;
      player.characterHeight = 70;
      break;
    case 'mall':
      setBackground('assets/images/locations/mall.jpg');
      break;
    default:
      setBackground('assets/images/locations/rumah.jpg');
      player.characterWidth = 48;
      player.characterHeight = 48;
      break;
  }

  updateUI();
  updateActivityButtons(location);
}
