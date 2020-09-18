
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
const leftBox = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshNormalMaterial()
);

World.addBodyTo( 'left', leftBox, 'rectangle', [ 0, 0, 3, 3 ] );
World.addBodyTo( 'left', null, 'rectangle', [ -8, 0, 1, 10 ], { isStatic: true } );

ThreeWorld.add( 'left', leftBox );

// create bottom box
const bottomBox = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 3, 3, 3 ),
	new THREE.MeshNormalMaterial()
);

World.addBodyTo( 'bottom', bottomBox, 'rectangle', [ 0, 0, 3, 3 ] );
World.addBodyTo( 'bottom', null, 'rectangle', [ 0, -8, 10, 1 ], { isStatic: true } );

ThreeWorld.add( 'bottom', bottomBox );

// create hero box :



//

export default {}