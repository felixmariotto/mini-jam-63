
import UI from './UI.js';

import World from './physics/World.js'
import ThreeWorld from './graphics/ThreeWorld.js';

//

let lastTime, nowTime, deltaTime, gameIsPaused;

//

function startGame() {

	lastTime = Date.now();

	gameIsPaused = false;

	loop()

}

function pauseGame() {

	gameIsPaused = true;

}

function die() {

	UI.showGameOver();

	gameIsPaused = true;

}

function win() {

	UI.showWinScreen();

	gameIsPaused = true;

}

//

function loop() {

	if ( gameIsPaused ) return

	window.requestAnimationFrame( loop );

	// TIME

	nowTime = Date.now();

	deltaTime = nowTime - lastTime;

	lastTime = nowTime;

	// CHECK IN WHAT DIMENSION THE HERO IS

	const dimension = UI.checkDimension();

	// UPDATES

	World.animate( deltaTime, dimension );
	ThreeWorld.animate( deltaTime, dimension );

}

//

export default {
	startGame,
	pauseGame,
	die,
	win
}