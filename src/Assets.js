
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import UI from './UI.js';

//

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );

function loadItem( url ) {

	return new Promise( (resolve) => {

		loader.load( url, (glb) => {

			resolve( glb.scene );

		});

	})

};

//

THREE.DefaultLoadingManager.onLoad = function ( ) {

	UI.allowStart();

};

//

const globalScene = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/global-scene-processed.glb' );

const dangerous = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/dangerous-processed.glb' );

const assetBottom = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/asset-night-processed.glb' );

const assetLeft = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/asset-dry-processed.glb' );

const assetTop = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/asset-water-processed.glb' );

const assetRight = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/asset-forest-processed.glb' );

//

export { dangerous }
export { globalScene }
export { assetBottom }
export { assetLeft }
export { assetTop }
export { assetRight }

export default {
	globalScene,
	dangerous,
	assetBottom,
	assetLeft,
	assetTop,
	assetRight
}