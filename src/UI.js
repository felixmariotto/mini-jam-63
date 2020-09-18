
import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartBtn = document.querySelector('#start-btn');

let isGameOn = false;

// event listeners

domStartBtn.addEventListener('click', () => {

	domStartBtn.innerHTML = 'resume';

	GameManager.startGame();

	hideHomescreen();

	isGameOn = !isGameOn;

});

window.addEventListener('keydown', (e) => {

	if ( e.code === "Escape" ) {

		showHomescreen();

		GameManager.pauseGame();

	}

})

//

function hideHomescreen() {

	domHomescreen.style.display = 'none';

}

function showHomescreen() {

	domHomescreen.style.display = 'flex';

}

//

export default {}