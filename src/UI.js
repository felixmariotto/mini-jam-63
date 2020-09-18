
import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartBtn = document.querySelector('#start-btn');

const domSquareContainer = document.querySelector('#game-square-container');
const domScenes = document.querySelector('#scenes');

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

domSquareContainer.addEventListener('mousemove', (e) => {

	const rect = domSquareContainer.getBoundingClientRect();

	const pos = {
		x: ( e.x - rect.left ) / rect.width,
		y: ( e.y - rect.top ) / rect.height
	};

	domScenes.style.left = ( (1 - pos.x) * -100 ) + '%';
	domScenes.style.top = ( (1 - pos.y) * -100 ) + '%';

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