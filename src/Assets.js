
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

	///////////////////////////
	// FIRT SECTION : LOWLAND
	///////////////////////////

	// STATIC

	// big wall start
	createBox( direction, Vec( -50, 0 ), Vec( 50, 50, 200 ), true, 0.5 );

	// ground
	createBox( direction, Vec( 200, -40 ), Vec( 500, 70, 200 ), true );

	// hill before riverbed
	createBox( direction, Vec( 35, -14 ), Vec( 50, 20, 200 ), true, 0.1 );
	createBox( direction, Vec( 58, -5 ), Vec( 5, 5, 200 ), true, -1 );

	// hill after riverbed
	createBox( direction, Vec( 72, -5 ), Vec( 5, 10, 200 ), true, -0.8 );
	createBox( direction, Vec( 100, -7.2 ), Vec( 50, 20, 200 ), true, 0.1 );

	// more slented hill going out of water
	createBox( direction, Vec( 135, -2 ), Vec( 65, 20, 200 ), true, 0.17 );

	// slope after cliff in water
	createBox( direction, Vec( 170, -5 ), Vec( 30, 10, 200 ), true, -0.5 );

	// rock stop after cliff
	createBox( direction, Vec( 217, -8 ), Vec( 20, 20, 200 ), true, -0.85 );
	createBox( direction, Vec( 223, 3.5 ), Vec( 10, 5, 200 ), true );
	createBox( direction, Vec( 257, -2.5 ), Vec( 60, 5, 200 ), true, -0.2 );

	// gentle hill
	createBox( direction, Vec( 350, -8 ), Vec( 100, 10, 200 ), true, 0.1 );
	createBox( direction, Vec( 418.2, -6.8 ), Vec( 40, 10, 200 ), true, -0.18 );

	/////////////////////////////
	// SECOND SECTION : THE PIT
	/////////////////////////////

	// ground after pit
	createBox( direction, Vec( 490, -12 ), Vec( 60, 20, 200 ), true, 0.1 );

	// wall building ( player must go back )
	createBox( direction, Vec( 510, 20 ), Vec( 5, 60, 200 ), true );
	createBox( direction, Vec( 508, 0 ), Vec( 5, 5, 200 ), true, 0.9 );

	// pit right wall
	createBox( direction, Vec( 500, -40 ), Vec( 85, 70, 200 ), true );

	// floor after fall
	createBox( direction, Vec( 510, -100 ), Vec( 140, 5, 200 ), true );

	// walls of room after fall
	createBox( direction, Vec( 440, -90 ), Vec( 5, 40, 200 ), true );
	createBox( direction, Vec( 495, -91 ), Vec( 35, 20, 200 ), true );

	// wall second room
	createBox( direction, Vec( 598, -80 ), Vec( 44, 40, 200 ), true );

	// second pit right wall
	// top
	createBox( direction, Vec( 560.5, -16 ), Vec( 20, 30, 200 ), true );
	// bottom
	createBox( direction, Vec( 560.5, -58 ), Vec( 20, 35, 200 ), true );

	// roof second pit
	createBox( direction, Vec( 548, -3 ), Vec( 15, 5, 200 ), true );

	// cap
	createBox( direction, Vec( 572, -67 ), Vec( 30, 19, 200 ), true, -0.45 );

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