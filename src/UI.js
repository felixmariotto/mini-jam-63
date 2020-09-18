
import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartBtn = document.querySelector('#start-btn');
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

window.addEventListener('mousemove', (e) => {

	const pos = {
		x: e.x / window.innerWidth,
		y: e.y / window.innerHeight
	};

	domScenes.style.transform = `translate( ${ (1 - pos.x) * -100 }vw, ${ (1 - pos.y) * -100 }vh )`

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