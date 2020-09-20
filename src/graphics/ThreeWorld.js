
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import Assets from '../Assets.js';

//

const LINE_THRESHOLD_ANGLE_TERRAIN = 5;

const USE_DEFAULT_COLOR = false;

// textures

const textureLoader = new THREE.TextureLoader();

const TEXTURES = {
	left: textureLoader.load( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/textures/dry-palette.png' ),
	top: textureLoader.load( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/textures/water-palette.png' ),
	right: textureLoader.load( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/textures/forest-palette.png' ),
	bottom: textureLoader.load( 'https://mini-jam-63.s3.eu-west-3.amazonaws.com/textures/night_palette.png' )
}

// create download button to download the scene created in three.js

function createDLButton() {

	const dlBtn = document.createElement('download-btn');
	dlBtn.style.position = 'fixed';
	dlBtn.style.fontSize = '2em';
	dlBtn.style.top = '0';
	dlBtn.style.right = '0';
	dlBtn.innerHTML = 'DOWNLOAD';
	document.body.append( dlBtn )


	dlBtn.onclick = () => {

		// Instantiate a exporter
		var exporter = new GLTFExporter();

		// Parse the input and generate the glTF output
		exporter.parse( scenes.top, function ( result ) {
			
			if ( result instanceof ArrayBuffer ) {

				saveArrayBuffer( result, 'scene.glb' );

			} else {

				var output = JSON.stringify( result, null, 2 );
				console.log( output );
				saveString( output, 'scene.gltf' );

			}

		} );

	}

	function saveArrayBuffer( buffer, filename ) {

		save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

	}

	function saveString( text, filename ) {

		save( new Blob( [ text ], { type: 'text/plain' } ), filename );

	}

	var link = document.createElement( 'a' );
	link.style.display = 'none';
	document.body.appendChild( link ); // Firefox workaround, see #6594

	function save( blob, filename ) {

		link.href = URL.createObjectURL( blob );
		link.download = filename;
		link.click();

		// URL.revokeObjectURL( url ); breaks Firefox...

	}

}

//

const MOVE_CAMERA = true;
const BOX_COLORS = {
	top: "#2f7e83",
	left: "#f06c00",
	right: '#238531',
	bottom: '#2a3747'
}

const HEIGHT_WATER = 10;
const CAMERA_BASE_POSITION = new THREE.Vector3( 0, 0, 70 );

let heroMesh;
let lastDimension;

//

const domLeftCanvas = document.querySelector('.scene-mask.left canvas');
const domTopCanvas = document.querySelector('.scene-mask.top canvas');
const domRightCanvas = document.querySelector('.scene-mask.right canvas');
const domBottomCanvas = document.querySelector('.scene-mask.bottom canvas');

//

const scenes = {
	left: createScene( 'left', domLeftCanvas, "#ffc438" ),
	top: createScene( 'top', domTopCanvas, "#96a5ab" ),
	right: createScene( 'right', domRightCanvas, "#30c5ad" ),
	bottom: createScene( 'bottom', domBottomCanvas, "#17191b" )
};

const camera = new THREE.PerspectiveCamera( 40, 1, 0.1, 500 );
camera.position.copy( CAMERA_BASE_POSITION );
camera.lookAt( 0, 0, 0 );

function createScene( name, canvas, backgroundColor ) {

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( backgroundColor );
	scene.name = name;

	const renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize( canvas.scrollWidth, canvas.scrollHeight );
	scene.renderer = renderer;

	window.addEventListener( 'resize', ()=> {

		const size = Math.min( window.innerWidth, window.innerHeight );

		canvas.style.height = size + 'px';
		canvas.style.width = size + 'px';

		renderer.setSize( canvas.scrollWidth, canvas.scrollHeight );

	});

	// Add assets

	Assets.globalScene.then( (model) => {

		model.traverse( (child) => {

			if ( child.material ) {

				if ( USE_DEFAULT_COLOR ) {

					child.material = new THREE.MeshBasicMaterial({ color: BOX_COLORS[ name ] })

				} else {

					const map = child.material.map;

					child.material = new THREE.MeshBasicMaterial({
						map: TEXTURES[ name ],
						color: 0xffffff
					})

				}

				const edges = new THREE.EdgesGeometry( child.geometry, LINE_THRESHOLD_ANGLE_TERRAIN );
				const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xf1f0ee } ) );
				
				line.rotation.x = Math.PI / 2;

				scene.add( line );

			}

		})

		scene.add( model.clone() );

	})

	// TEMPORARY

	const ambLight = new THREE.AmbientLight( 0xffffff, 0.2 );

	const directionalLight = new THREE.DirectionalLight( 0xded4ff, 0.6 );
	directionalLight.position.z = 5;

	const directionalLight2 = new THREE.DirectionalLight( 0xfff8cf, 0.4 );
	directionalLight2.position.z = 3;
	directionalLight2.position.x = 2;
	directionalLight2.position.y = -1;

	scene.add( ambLight, directionalLight, directionalLight2 );

	//

	return scene

}

// create water in top scene

const waterMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 10000, 1000, 500 ),
	new THREE.MeshBasicMaterial({ color: 0x28237b, side: THREE.DoubleSide })
)

waterMesh.position.y = -500 + HEIGHT_WATER;

scenes.top.add( waterMesh );

//

function animate( deltaTime, dimension ) {

	// update hero's scene if needed

	if ( dimension !== lastDimension ) {

		scenes[ dimension ].add( heroMesh );

		lastDimension = dimension;

	};

	// render scenes

	for ( let sceneName of Object.keys( scenes ) ) {

		const scene = scenes[ sceneName ];

		scene.renderer.render( scene, camera );

	};

};

//

function updateBody( engine, body ) {

	if ( !body.mesh ) return

	body.mesh.position.x = body.position.x;
	body.mesh.position.y = body.position.y;

	body.mesh.rotation.z = body.angle;

	// update camera position according to hero position

	if ( body.isHero && MOVE_CAMERA ) {

		camera.position.copy( CAMERA_BASE_POSITION );

		camera.position.x += body.position.x;
		camera.position.y += body.position.y;

	}

}

//

function add( sceneName, mesh ) {

	scenes[ sceneName ].add( mesh );

}

// helper function that create and add a box quickly
function addBoxTo( sceneName, position, dimension, rotationZ, isHarmful ) {

	const mesh = new THREE.Mesh(
		new THREE.BoxBufferGeometry( dimension.x, dimension.y, dimension.z ),
		new THREE.MeshLambertMaterial({ color: BOX_COLORS[ sceneName ] })
	);

	if ( isHarmful ) mesh.material.color.set( 0xff0000 );

	mesh.position.x = position.x;
	mesh.position.y = position.y;

	mesh.rotation.z = rotationZ;

	scenes[ sceneName ].add( mesh );

	return mesh

}

//

function registerHeroMesh( mesh ) { heroMesh = mesh }

//

export default {
	animate,
	add,
	updateBody,
	registerHeroMesh,
	addBoxTo
}