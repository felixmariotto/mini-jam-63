
import * as THREE from 'three';

//

const MOVE_CAMERA = true;

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
	top: createScene( 'top', domTopCanvas, "#28237b" ),
	right: createScene( 'right', domRightCanvas, "#30c5ad" ),
	bottom: createScene( 'bottom', domBottomCanvas, "#17191b" )
};

const camera = new THREE.PerspectiveCamera( 30, 1, 0.1, 100 );
camera.position.z = 70;
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

	return scene

}

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

		camera.position.x = body.position.x;
		camera.position.y = body.position.y;

	}

}

//

function add( sceneName, mesh ) {

	scenes[ sceneName ].add( mesh );

}

// helper function that create and add a box quickly
function addBoxTo( sceneName, position, dimension, rotationZ ) {

	const mesh = new THREE.Mesh(
		new THREE.BoxBufferGeometry( dimension.x, dimension.y, dimension.z ),
		new THREE.MeshBasicMaterial()
	);

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