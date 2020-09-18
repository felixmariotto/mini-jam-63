
import UI from './UI.js';

import World from './physics/World.js'
import ThreeWorld from './graphics/ThreeWorld.js';

//

let startTime, lastTime, nowTime, deltaTime;

//

function startGame() {

	startTime = lastTime = Date.now();

	loop()

}

//

function loop() {

	requestAnimationFrame( loop );

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
	startGame
}