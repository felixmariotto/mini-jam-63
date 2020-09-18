
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

//

function loop() {

	if ( gameIsPaused ) return

	window.requestAnimationFrame( loop );

	// TIME

	nowTime = Date.now();

	deltaTime = lastTime - nowTime;

	lastTime = nowTime;

	// UPDATES

	World.animate( deltaTime );
	ThreeWorld.animate( deltaTime );

}

//

export default {
	startGame,
	pauseGame
}