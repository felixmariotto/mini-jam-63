
import planck from 'planck-js';

//

const world = planck.World();

//

function animate( deltaTime ) {

	world.step( deltaTime / 1000 );

}

//

export default {
	animate
}
