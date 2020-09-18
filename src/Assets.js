
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

// do like gltf was loaded, then :
const box = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshNormalMaterial()
);

World.addBodyTo( 'left', box, 'rectangle', [ 0, 0, 3, 3 ] );
// World.addBodyTo( 'left', box, 'rectangle', [ 450, 50, 80, 80 ] );
// World.addBodyTo( 'left', box, 'rectangle', [ 400, 610, 810, 60 ], { isStatic: true } );

ThreeWorld.add( 'left', box );

//

export default {}