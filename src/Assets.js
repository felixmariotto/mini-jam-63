
import * as THREE from 'three';

import World from './physics/World.js';
import ThreeWorld from './graphics/ThreeWorld.js';

//

const fileLoader = new THREE.FileLoader();

//

/*
// load a JSON containing a path
fileLoader.load( url, (file) => {

	const path = JSON.parse( file );

})
*/

// add walls

[ 'left', 'top', 'right', 'bottom' ].forEach( (direction) => {

	World.addRectangleHelper( direction, -8, 0, 1, 16 );
	World.addRectangleHelper( direction, 0, -8, 16, 1 );
	World.addRectangleHelper( direction, 8, 0, 1, 16 );
	World.addRectangleHelper( direction, 0, 8, 16, 1 );

})

// create hero box :

const heroMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshNormalMaterial()
);

World.createHeroBody( heroMesh );

ThreeWorld.registerHeroMesh( heroMesh );

//

export default {}