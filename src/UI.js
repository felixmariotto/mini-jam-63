
import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');

// event listeners

domHomescreen.addEventListener('click', () => {

	GameManager.startGame();

});

//

export default {}