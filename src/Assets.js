
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

	World.addBodyTo( direction, null, 'rectangle', [ -8, 0, 1, 10 ], { isStatic: true } );
	World.addBodyTo( direction, null, 'rectangle', [ 0, -8, 10, 1 ], { isStatic: true } );
	World.addBodyTo( direction, null, 'rectangle', [ 8, 0, 1, 10 ], { isStatic: true } );
	World.addBodyTo( direction, null, 'rectangle', [ 0, 8, 10, 1 ], { isStatic: true } );

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