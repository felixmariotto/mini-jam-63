
import * as THREE from 'three';

import World from './physics/World.js';
import ThreeWorld from './graphics/ThreeWorld.js';

//

const USE_HELPERS = true;

const fileLoader = new THREE.FileLoader();

function Vec( x, y, z ) {
	return { x, y, z }
}

//

/*
// load a JSON containing a path
fileLoader.load( url, (file) => {

	const path = JSON.parse( file );

})
*/

/////////////////////////////////
// COMMON VOLUMES IN ALL WORLDS
/////////////////////////////////

[ 'left', 'top', 'right', 'bottom' ].forEach( (direction, i) => {

	// STATIC

	createBox( direction, Vec( -8, 0 ), Vec( 1, 16, 5 ), true );

})

// create hero box :

const heroMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshNormalMaterial()
);

World.createHeroBody( heroMesh );

ThreeWorld.registerHeroMesh( heroMesh );

// volume creator functions

function createBox( world, position, dimension, isStatic, rotationZ ) {

	let mesh;

	rotationZ = rotationZ || 0;

	if ( USE_HELPERS ) mesh = ThreeWorld.addBoxTo( world, position, dimension, rotationZ );

	World.createBox( world, position, dimension, isStatic, rotationZ, mesh );

};

//

export default {}