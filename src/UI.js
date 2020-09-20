
import * as THREE from 'three';

import GameManager from './GameManager.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartBtn = document.querySelector('#start-btn');

const domSquareContainer = document.querySelector('#game-square-container');
const domScenes = document.querySelector('#scenes');

let isGameOn = false;

const mousePos = new THREE.Vector2();

// event listeners

domStartBtn.addEventListener('click', (e) => {

	domStartBtn.innerHTML = 'resume';

	GameManager.startGame();

	hideHomescreen();

	isGameOn = !isGameOn;

	setTimeout( () => {
		positionMasks( e );
	}, 0 );

});

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

	console.log('can start')

}

//

function hideHomescreen() {

	domHomescreen.style.display = 'none';

}

function showHomescreen() {

	domHomescreen.style.display = 'flex';

}

function showGameOver() {

	domStartBtn.innerHTML = 'retry';

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