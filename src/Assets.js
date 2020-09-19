
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

[ 'left', 'top', 'right', 'bottom' ].forEach( (direction, i) => {

	World.addRectangleHelper( direction, -13, 0, 10, 40 );
	World.addRectangleHelper( direction, 0, -13, 40, 10 );
	World.addRectangleHelper( direction, 13, 0, 10, 40 );
	World.addRectangleHelper( direction, 0, 13, 40, 10 );

	World.addRectangleHelper( direction, 1, 1, 3, 3, true );

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