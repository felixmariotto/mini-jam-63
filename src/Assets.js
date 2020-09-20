
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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

const globalScene = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/global-scene-processed.glb' );

const dangerous = loadItem( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/models/dangerous-processed.glb' );

//

export { dangerous }
export { globalScene }

export default {
	globalScene,
	dangerous
}