
import * as THREE from 'three';

import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartBtn = document.querySelector('#start-btn');

const domSquareContainer = document.querySelector('#game-square-container');
const domScenes = document.querySelector('#scenes');

const domHow = document.querySelector('#how-to');
const domInfo = document.querySelector("#info-menu");
const domGameOver = document.querySelector('#game-over');

let isGameOn = false;

const mousePos = new THREE.Vector2();

// event listeners

window.addEventListener('keydown', (e) => {

	if ( e.code === "Escape" ) {

		showHomescreen();

		GameManager.pauseGame();

	}

})

domSquareContainer.addEventListener('mousemove', (e) => {

	positionMasks( e );

})

//

function positionMasks( e ) {

	const rect = domSquareContainer.getBoundingClientRect();

	mousePos.x = ( e.x - rect.left ) / rect.width;
	mousePos.y = ( e.y - rect.top ) / rect.height;

	domScenes.style.left = ( (1 - mousePos.x) * -100 ) + '%';
	domScenes.style.top = ( (1 - mousePos.y) * -100 ) + '%';

};

//

function allowStart() {

	domStartBtn.innerHTML = 'start';

	domStartBtn.addEventListener('click', (e) => {

		domStartBtn.innerHTML = 'resume';
		domGameOver.style.display = 'none';
		domHow.style.display = 'inherit';
		domInfo.style.display = 'inherit';

		GameManager.startGame();

		hideHomescreen();

		isGameOn = !isGameOn;

		setTimeout( () => {
			positionMasks( e );
		}, 0 );

	});

}

//

function hideHomescreen() {

	domHomescreen.style.display = 'none';

}

function showHomescreen() {

	domHomescreen.style.display = 'flex';

}

function showGameOver() {

	domHow.style.display = 'none';
	domInfo.style.display = 'none';
	domGameOver.style.display = 'inherit';

	domStartBtn.innerHTML = 'Continue to last checkpoint';

	domHomescreen.style.display = 'flex';

}

function showWinScreen() {

	domStartBtn.innerHTML = 'replay';

	domHomescreen.style.display = 'flex';

}

//

function checkDimension() {

	mousePos.subScalar( 0.5 );

	const angle = mousePos.angle();

	mousePos.addScalar( 0.5 );

	if (
		angle > Math.PI / 4 &&
		angle < Math.PI - ( Math.PI / 4 )
	) {

		return 'top'

	} else if (
		angle > Math.PI - ( Math.PI / 4 ) &&
		angle < Math.PI + ( Math.PI / 4 )
	) {

		return 'right'

	} else if (
		angle > Math.PI + ( Math.PI / 4 ) &&
		angle < ( Math.PI * 2 ) - ( Math.PI / 4 )
	) {

		return 'bottom'

	} else {

		return 'left'

	}

}

//

export default {
	checkDimension,
	showGameOver,
	showWinScreen,
	allowStart
}