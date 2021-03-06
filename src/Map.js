
import * as THREE from 'three';

import World from './physics/World.js';
import ThreeWorld from './graphics/ThreeWorld.js';

//

const USE_HELPERS = false;

const fileLoader = new THREE.FileLoader();

function Vec( x, y, z ) {
	return { x, y, z }
}

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

	// steep slope on the left after last pit
	createBox( direction, Vec( 560.7, 13 ), Vec( 10, 35, 200 ), true, 0.3 );

	// left wall big pit
	createBox( direction, Vec( 620, -67 ), Vec( 30, 19, 200 ), true, 0.45 );
	createBox( direction, Vec( 638, -32 ), Vec( 20, 85, 200 ), true );

	/////////////////////////////
	// THIRD SECTION : THE LAB
	/////////////////////////////

	// floor
	createBox( direction, Vec( 700, -79 ), Vec( 120, 10, 200 ), true );

	// building
	createBox( direction, Vec( 680, -35 ), Vec( 35, 85, 200 ), true );

	// entry building
	createBox( direction, Vec( 761, -15 ), Vec( 77, 45, 200 ), true );
	createBox( direction, Vec( 724, -69 ), Vec( 3, 45, 200 ), true );
	// obstacle roof
	createBox( direction, Vec( 745, 0 ), Vec( 20, 45, 200 ), true );
	// little building bellow entry
	createBox( direction, Vec( 719, -75 ), Vec( 7, 45, 200 ), true );

	// floor first room
	createBox( direction, Vec( 745, -65 ), Vec( 40, 10, 200 ), true );

	// wall between first and second rooms
	createBox( direction, Vec( 750, -37 ), Vec( 3, 20, 200 ), true );

	// dangerous material
	createBox( direction, Vec( 774, -65 ), Vec( 20, 5, 200 ), true, 0, { x: 734.5, y: -58.5 } );

	// floor after first jump in second room
	createBox( direction, Vec( 800, -65 ), Vec( 40, 10, 200 ), true );

	// wall between second and third rooms
	createBox( direction, Vec( 800, -7 ), Vec( 3, 80, 200 ), true );

	// third room
	// wall end
	createBox( direction, Vec( 830, -43 ), Vec( 3, 30, 200 ), true );
	// box end
	createBox( direction, Vec( 827, -52 ), Vec( 20, 20, 200 ), true );
	// roof
	createBox( direction, Vec( 835, -30 ), Vec( 50, 10, 200 ), true );

	// roof channel
	createBox( direction, Vec( 805, 6.5 ), Vec( 20, 5, 200 ), true );

	// fourth room ( float up while dodging )
	// left wall
	createBox( direction, Vec( 820, -3.5 ), Vec( 20, 25, 200 ), true );
	// right wall
	createBox( direction, Vec( 880, -153.5 ), Vec( 40, 325, 200 ), true );
	// left wall up
	createBox( direction, Vec( 834, 1.5 ), Vec( 15, 15, 200 ), true );
	// right wall up
	createBox( direction, Vec( 856, 1.5 ), Vec( 15, 15, 200 ), true );
	// left wall harmful
	createBox( direction, Vec( 833, -5 ), Vec( 15, 5, 200 ), true, null, { x: 806.5, y: -58.5 } );
	// right wall harmful
	createBox( direction, Vec( 857, -5 ), Vec( 15, 5, 200 ), true, null, { x: 806.5, y: -58.5 } );

	// roof before big jump
	createBox( direction, Vec( 895, 0 ), Vec( 10, 25, 200 ), true );
	// ramp
	createBox( direction, Vec( 887, 8 ), Vec( 10, 5, 200 ), true, 0.5 );

	//////////////////////////////
	// FOURTH SECTION : THE CORE
	//////////////////////////////

	// big pit
	// right wall
	createBox( direction, Vec( 955, -143.5 ), Vec( 60, 345, 200 ), true );
	// floor
	createBox( direction, Vec( 917, -820 ), Vec( 30, 10, 200 ), true, 0, null, true );
	// first obstacle
	createBox( direction, Vec( 900, -24 ), Vec( 20, 20, 200 ), true, 0, { x: 872, y: 10.4 } );
	// second obstacle
	createBox( direction, Vec( 922, -73 ), Vec( 25, 40, 200 ), true, 0, { x: 872, y: 10.4 } );
	// third obstacle ( double )
	createBox( direction, Vec( 932, -160 ), Vec( 25, 70, 200 ), true, 0, { x: 908, y: -112.5 } );
	createBox( direction, Vec( 900, -185 ), Vec( 20, 80, 200 ), true, 0, { x: 908, y: -112.5 } );
	// fourth obstacle ( trap & narrow passage )
	createBox( direction, Vec( 915, -270 ), Vec( 10, 40, 200 ), true, 0, { x: 908, y: -112.5 } );
	createBox( direction, Vec( 900, -275 ), Vec( 20, 30, 200 ), true, 0, { x: 908, y: -112.5 } );

	// pyramid pit

	// FIRT LEVEL
	// left wall
	createBox( direction, Vec( 840, -370 ), Vec( 40, 150, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 980, -370 ), Vec( 30, 150, 200 ), true, 0, { x: 938.5, y: -332.5 } );

	// SECOND LEVEL
	// left wall
	createBox( direction, Vec( 855, -450 ), Vec( 40, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 965, -450 ), Vec( 30, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );

	// THIRD LEVEL
	// left wall
	createBox( direction, Vec( 870, -520 ), Vec( 40, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 950, -520 ), Vec( 30, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );

	// FOURTH LEVEL
	// left wall
	createBox( direction, Vec( 880, -590 ), Vec( 40, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 940, -590 ), Vec( 30, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );

	// FIFTH LEVEL
	// left wall
	createBox( direction, Vec( 885, -660 ), Vec( 40, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 935, -660 ), Vec( 30, 70, 200 ), true, 0, { x: 938.5, y: -332.5 } );

	// SIXTH LEVEL
	// left wall
	createBox( direction, Vec( 888, -755 ), Vec( 40, 120, 200 ), true, 0, { x: 938.5, y: -332.5 } );
	// right wall
	createBox( direction, Vec( 932, -755 ), Vec( 30, 120, 200 ), true, 0, { x: 938.5, y: -332.5 } );

})

// create hero box :

const heroMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshBasicMaterial({ color: 0xf1f0ee })
);

World.createHeroBody( heroMesh );

ThreeWorld.registerHeroMesh( heroMesh );

// volume creator functions

function createBox( world, position, dimension, isStatic, rotationZ, savePoint, isEnd ) {

	let mesh;

	rotationZ = rotationZ || 0;

	if ( USE_HELPERS ) mesh = ThreeWorld.addBoxTo( world, position, dimension, rotationZ, savePoint );

	World.createBox( world, position, dimension, isStatic, rotationZ, mesh, savePoint, isEnd );

};